import fs from "node:fs";
import path from "node:path";
import { config } from "../config.js";

/** Métadonnées d'un modèle de la galerie ("Lovable templates"). */
export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  category: string;
  /** Collection : "lovable" (défaut) ou "iwa" (Modèles IWA). */
  group?: "lovable" | "iwa";
  /** Couleurs de la vignette générée côté UI. */
  thumb: { from: string; to: string; text?: string; style: "gradient" | "editorial" | "dark" | "grid" };
}

const catalogDir = () => path.join(config.rootDir, "catalog");

/** Liste les modèles disponibles (catalog/index.json). */
export function listTemplates(): TemplateMeta[] {
  const indexPath = path.join(catalogDir(), "index.json");
  if (!fs.existsSync(indexPath)) return [];
  return JSON.parse(fs.readFileSync(indexPath, "utf8"));
}

export function getTemplate(id: string): TemplateMeta {
  const found = listTemplates().find((t) => t.id === id);
  if (!found) throw new Error(`Unknown template: ${id}`);
  return found;
}

/** Applique l'overlay d'un modèle (fichiers de catalog/<id>/) sur un projet fraîchement copié. */
export function applyTemplate(projectDir: string, templateId: string): void {
  getTemplate(templateId);
  const dir = path.join(catalogDir(), templateId);
  if (!fs.existsSync(dir)) throw new Error(`Template files missing: ${templateId}`);
  fs.cpSync(dir, projectDir, { recursive: true });
}
