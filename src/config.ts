import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  /** Racine du dépôt. */
  rootDir: path.resolve(here, ".."),
  /** Répertoire où vivent les projets générés. */
  workspaceDir: process.env.OPENLOVABLE_WORKSPACE ?? path.resolve(here, "..", "workspace"),
  /** Template de base copié à la création d'un projet. */
  templateDir: path.resolve(here, "..", "template"),
  /** Port de l'API. */
  port: Number(process.env.PORT ?? 3080),
  /** Modèle utilisé par l'agent. */
  model: process.env.OPENLOVABLE_MODEL ?? "claude-opus-4-8",
  /** Nombre max d'itérations de la boucle agentique par message utilisateur. */
  maxAgentIterations: Number(process.env.OPENLOVABLE_MAX_ITERATIONS ?? 40),
  /** Nombre max de tentatives de correction automatique après erreurs de build. */
  maxFixAttempts: Number(process.env.OPENLOVABLE_MAX_FIX_ATTEMPTS ?? 2),
  /** Budget de sortie par requête modèle. */
  maxTokens: Number(process.env.OPENLOVABLE_MAX_TOKENS ?? 64000),
  /** true => utilise le client LLM simulé (tests sans clé API). */
  mockLLM: process.env.OPENLOVABLE_MOCK === "1",
  /** Plage de ports pour les serveurs de preview. */
  previewPortStart: Number(process.env.OPENLOVABLE_PREVIEW_PORT_START ?? 4300),
};
