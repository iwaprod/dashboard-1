/** Événements émis par l'agent pendant un tour — diffusés au client via SSE. */
export type AgentEvent =
  | { type: "turn_start"; projectId: string }
  | { type: "assistant_text_delta"; text: string }
  | { type: "assistant_message"; text: string }
  | { type: "thinking_start" }
  | { type: "tool_call"; id: string; name: string; input: unknown }
  | { type: "tool_result"; id: string; name: string; result: string; isError: boolean }
  | { type: "build_check"; ok: boolean; errors?: string }
  | { type: "fix_attempt"; attempt: number; maxAttempts: number }
  | { type: "snapshot"; commit: string }
  | { type: "turn_end"; stopReason: string; usage: TokenUsage }
  | { type: "error"; message: string };

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadInputTokens: number;
  cacheCreationInputTokens: number;
}

/** Message persisté dans l'historique d'un projet. */
export interface ChatMessage {
  role: "user" | "assistant";
  /** Contenu API brut (blocs) — rejoué tel quel dans les requêtes suivantes. */
  content: unknown;
  /** Rendu texte pour l'affichage. */
  displayText?: string;
  timestamp: string;
  /** Commit de snapshot associé (messages assistant uniquement). */
  snapshotCommit?: string;
}

/** Métadonnées d'un projet. */
export interface ProjectMeta {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  /** Modèle de départ (galerie), le cas échéant. */
  templateId?: string;
  /** Épinglé dans "Starred". */
  starred?: boolean;
  /** Dernière ouverture (onglet "Recently viewed" / "Recents"). */
  lastOpenedAt?: string;
}

export interface Snapshot {
  commit: string;
  message: string;
  date: string;
}

/** Résultat d'exécution d'un outil. */
export interface ToolExecutionResult {
  content: string;
  isError: boolean;
}
