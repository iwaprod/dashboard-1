import type { ToolExecutionResult } from "../types.js";
import * as f from "./fileTools.js";
import * as d from "./depTools.js";

export interface ToolContext {
  projectDir: string;
  /** Journaux du serveur de preview (si actif). */
  getConsoleLogs: (lines: number) => string;
}

type Input = Record<string, unknown>;
const str = (input: Input, key: string): string => {
  const v = input[key];
  if (typeof v !== "string" || v.length === 0) throw new Error(`Missing string parameter '${key}'`);
  return v;
};

/** Exécute un appel d'outil de l'agent. Toute erreur devient un tool_result is_error. */
export async function executeTool(ctx: ToolContext, name: string, rawInput: unknown): Promise<ToolExecutionResult> {
  const input = (rawInput ?? {}) as Input;
  try {
    switch (name) {
      case "write_file":
        return ok(f.writeFile(ctx.projectDir, str(input, "path"), String(input.content ?? "")));
      case "line_replace":
        return ok(f.lineReplace(ctx.projectDir, str(input, "path"), str(input, "search"), String(input.replace ?? "")));
      case "rename_file":
        return ok(f.renameFile(ctx.projectDir, str(input, "from"), str(input, "to")));
      case "delete_file":
        return ok(f.deleteFile(ctx.projectDir, str(input, "path")));
      case "read_file":
        return ok(f.readFile(ctx.projectDir, str(input, "path")));
      case "search_files":
        return ok(f.searchFiles(ctx.projectDir, str(input, "pattern"), input.glob as string | undefined));
      case "add_dependency":
        return ok(d.addDependency(ctx.projectDir, str(input, "package")));
      case "remove_dependency":
        return ok(d.removeDependency(ctx.projectDir, str(input, "package")));
      case "read_console_logs":
        return ok(ctx.getConsoleLogs(Number(input.lines ?? 80)));
      default:
        return { content: `Unknown tool: ${name}`, isError: true };
    }
  } catch (err) {
    return { content: err instanceof Error ? err.message : String(err), isError: true };
  }
}

const ok = (content: string): ToolExecutionResult => ({ content, isError: false });
