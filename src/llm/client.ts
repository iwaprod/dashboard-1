import Anthropic from "@anthropic-ai/sdk";
import { config } from "../config.js";
import type { TokenUsage } from "../types.js";
import { STATIC_SYSTEM_PROMPT } from "../prompts/system.js";

/** Blocs de contenu manipulés par l'orchestrateur (sous-ensemble utile de l'API). */
export interface ToolUseBlock {
  type: "tool_use";
  id: string;
  name: string;
  input: unknown;
}
export interface TextBlock {
  type: "text";
  text: string;
}
export type ContentBlock = TextBlock | ToolUseBlock | { type: string; [k: string]: unknown };

export interface LLMResponse {
  content: ContentBlock[];
  stopReason: string;
  usage: TokenUsage;
}

export interface StreamTurnParams {
  /** Contexte projet volatile (arborescence + contenus) ajouté après le prompt statique caché. */
  projectContext: string;
  /** Historique complet au format API. */
  messages: { role: "user" | "assistant"; content: unknown }[];
  tools: { name: string; description: string; input_schema: Record<string, unknown> }[];
  onText?: (delta: string) => void;
  onThinkingStart?: () => void;
}

export interface LLMClient {
  streamTurn(params: StreamTurnParams): Promise<LLMResponse>;
}

/** Client réel — API Claude, streaming, thinking adaptatif, cache sur le prompt statique. */
export class AnthropicClient implements LLMClient {
  private client = new Anthropic();

  async streamTurn(params: StreamTurnParams): Promise<LLMResponse> {
    const stream = this.client.messages.stream({
      model: config.model,
      max_tokens: config.maxTokens,
      thinking: { type: "adaptive" },
      system: [
        // Bloc statique : point de cache — tout octet identique entre requêtes.
        { type: "text", text: STATIC_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        // Bloc volatile : état du projet, jamais caché.
        { type: "text", text: params.projectContext },
      ],
      tools: params.tools as Anthropic.Tool[],
      messages: params.messages as Anthropic.MessageParam[],
    });

    let thinkingSignaled = false;
    stream.on("streamEvent", (event) => {
      if (
        event.type === "content_block_start" &&
        event.content_block.type === "thinking" &&
        !thinkingSignaled
      ) {
        thinkingSignaled = true;
        params.onThinkingStart?.();
      }
    });
    stream.on("text", (delta) => params.onText?.(delta));

    const message = await stream.finalMessage();
    return {
      content: message.content as ContentBlock[],
      stopReason: message.stop_reason ?? "end_turn",
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
        cacheReadInputTokens: message.usage.cache_read_input_tokens ?? 0,
        cacheCreationInputTokens: message.usage.cache_creation_input_tokens ?? 0,
      },
    };
  }
}

/**
 * Client simulé pour tests de bout en bout sans clé API (OPENLOVABLE_MOCK=1).
 * Scénario : 1er appel => écrit une landing page via write_file ; 2e appel => texte final.
 */
export class MockLLMClient implements LLMClient {
  private call = 0;

  async streamTurn(params: StreamTurnParams): Promise<LLMResponse> {
    this.call++;
    const usage: TokenUsage = {
      inputTokens: 100,
      outputTokens: 50,
      cacheReadInputTokens: 0,
      cacheCreationInputTokens: 0,
    };
    const lastMessage = params.messages[params.messages.length - 1];
    const isToolResultTurn =
      Array.isArray(lastMessage?.content) &&
      (lastMessage.content as { type?: string }[]).some((b) => b.type === "tool_result");

    if (!isToolResultTurn) {
      return {
        content: [
          { type: "text", text: "Je crée votre landing page." },
          {
            type: "tool_use",
            id: `mock_tool_${this.call}`,
            name: "write_file",
            input: {
              path: "src/App.tsx",
              content: MOCK_APP,
            },
          },
        ],
        stopReason: "tool_use",
        usage,
      };
    }
    const text = "J'ai créé une landing page moderne avec un hero, trois cartes d'atouts et un pied de page.";
    params.onText?.(text);
    return { content: [{ type: "text", text }], stopReason: "end_turn", usage };
  }
}

const MOCK_APP = `export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Studio Nova</h1>
        <p className="mt-6 text-lg text-slate-400">
          Des sites web générés par IA, prêts en quelques secondes.
        </p>
      </section>
    </main>
  );
}
`;

export function createLLMClient(): LLMClient {
  return config.mockLLM ? new MockLLMClient() : new AnthropicClient();
}
