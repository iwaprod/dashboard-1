import { config } from "../config.js";
import type { AgentEvent, ChatMessage } from "../types.js";
import type { ContentBlock, LLMClient, ToolUseBlock } from "../llm/client.js";
import { toolDefinitions } from "../tools/definitions.js";
import { executeTool, type ToolContext } from "../tools/executor.js";
import { computeProjectContext } from "../projects/context.js";
import { ProjectStore } from "../projects/store.js";
import { commit } from "../projects/snapshots.js";
import { runBuildCheck } from "../preview/buildCheck.js";

export interface RunTurnOptions {
  projectId: string;
  projectDir: string;
  userMessage: string;
  llm: LLMClient;
  getConsoleLogs: (lines: number) => string;
  /** Émission des événements vers le client (SSE). */
  emit: (event: AgentEvent) => void;
  /** Désactive la vérification de build (tests, projets sans tsc). */
  skipBuildCheck?: boolean;
}

/**
 * Exécute un tour complet de l'agent :
 *   message utilisateur -> boucle LLM/outils -> vérification de build
 *   -> auto-correction (N tentatives) -> snapshot git -> persistance historique.
 */
export async function runAgentTurn(options: RunTurnOptions): Promise<void> {
  const { projectId, projectDir, llm, emit } = options;
  const store = new ProjectStore(projectDir);
  const toolCtx: ToolContext = { projectDir, getConsoleLogs: options.getConsoleLogs };

  emit({ type: "turn_start", projectId });

  // Historique API : on rejoue les blocs bruts persistés.
  const history = store.readMessages();
  const apiMessages: { role: "user" | "assistant"; content: unknown }[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const persistUser = (content: unknown, display?: string) => {
    store.appendMessage({
      role: "user",
      content,
      displayText: display,
      timestamp: new Date().toISOString(),
    });
  };

  apiMessages.push({ role: "user", content: options.userMessage });
  persistUser(options.userMessage, options.userMessage);

  let anyEdits = false;
  let fixAttempts = 0;
  let iterations = 0;
  let lastAssistantText = "";

  outer: while (true) {
    // --- Boucle LLM <-> outils ---
    while (iterations < config.maxAgentIterations) {
      iterations++;
      const response = await llm.streamTurn({
        projectContext: computeProjectContext(projectDir),
        messages: apiMessages,
        tools: toolDefinitions,
        onText: (delta) => emit({ type: "assistant_text_delta", text: delta }),
        onThinkingStart: () => emit({ type: "thinking_start" }),
      });

      const textBlocks = response.content.filter((b): b is { type: "text"; text: string } => b.type === "text");
      if (textBlocks.length) {
        lastAssistantText = textBlocks.map((b) => b.text).join("\n");
        emit({ type: "assistant_message", text: lastAssistantText });
      }

      apiMessages.push({ role: "assistant", content: response.content });

      const toolUses = response.content.filter((b): b is ToolUseBlock => b.type === "tool_use");

      if (response.stopReason !== "tool_use" || toolUses.length === 0) {
        // Fin naturelle du tour (end_turn, max_tokens, refusal...).
        store.appendMessage({
          role: "assistant",
          content: response.content,
          displayText: lastAssistantText,
          timestamp: new Date().toISOString(),
        });
        emit({ type: "turn_end", stopReason: response.stopReason, usage: response.usage });
        break;
      }

      // Persister le message assistant intermédiaire (avec tool_use) pour rejouabilité.
      store.appendMessage({
        role: "assistant",
        content: response.content,
        displayText: lastAssistantText,
        timestamp: new Date().toISOString(),
      });

      // Exécuter tous les appels d'outils, résultats regroupés dans UN message user.
      const toolResults: unknown[] = [];
      for (const tool of toolUses) {
        emit({ type: "tool_call", id: tool.id, name: tool.name, input: tool.input });
        const result = await executeTool(toolCtx, tool.name, tool.input);
        if (!result.isError && tool.name !== "read_file" && tool.name !== "search_files" && tool.name !== "read_console_logs") {
          anyEdits = true;
        }
        emit({
          type: "tool_result",
          id: tool.id,
          name: tool.name,
          result: result.content.slice(0, 2000),
          isError: result.isError,
        });
        toolResults.push({
          type: "tool_result",
          tool_use_id: tool.id,
          content: result.content,
          ...(result.isError ? { is_error: true } : {}),
        });
      }
      apiMessages.push({ role: "user", content: toolResults });
      persistUser(toolResults);
    }

    // --- Vérification de build + auto-correction ---
    if (!anyEdits || options.skipBuildCheck) break;

    const check = await runBuildCheck(projectDir);
    emit({ type: "build_check", ok: check.ok, errors: check.errors });
    if (check.ok) break;
    if (fixAttempts >= config.maxFixAttempts) break;

    fixAttempts++;
    emit({ type: "fix_attempt", attempt: fixAttempts, maxAttempts: config.maxFixAttempts });
    const fixPrompt =
      `The build check failed with the following TypeScript errors. Fix them now using the editing tools. ` +
      `Fix the root cause; do not disable type checking.\n\n\`\`\`\n${check.errors}\n\`\`\``;
    apiMessages.push({ role: "user", content: fixPrompt });
    persistUser(fixPrompt, "[auto] correction des erreurs de build");
    // On repart dans la boucle LLM avec le budget d'itérations restant.
    if (iterations >= config.maxAgentIterations) break outer;
  }

  // --- Snapshot git du résultat du tour ---
  if (anyEdits) {
    const label = options.userMessage.split("\n")[0].slice(0, 72) || "Agent edit";
    const commitHash = commit(projectDir, label);
    emit({ type: "snapshot", commit: commitHash });
    const all = store.readMessages();
    for (let i = all.length - 1; i >= 0; i--) {
      if (all[i].role === "assistant") {
        all[i].snapshotCommit = commitHash;
        break;
      }
    }
    store.writeMessages(all);
  }

  store.touch();
}
