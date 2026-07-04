import fs from "node:fs";
import path from "node:path";
import { listFiles } from "../tools/fileTools.js";
import { buildProjectContext } from "../prompts/system.js";

/** Extensions dont le contenu est injecté dans le contexte de l'agent. */
const TEXT_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".css", ".html", ".json", ".md", ".svg", ".txt",
]);
/** Taille max d'un fichier injecté intégralement. */
const MAX_FILE_BYTES = 24_000;
/** Budget global approximatif du bloc de contenus. */
const MAX_TOTAL_BYTES = 300_000;

/** Construit le bloc de contexte (arborescence + contenus) envoyé au modèle à chaque tour. */
export function computeProjectContext(projectDir: string): string {
  const files = listFiles(projectDir);
  const tree = files.map((f) => `- ${f}`).join("\n");

  let total = 0;
  const chunks: string[] = [];
  for (const rel of files) {
    const ext = path.extname(rel).toLowerCase();
    if (!TEXT_EXTENSIONS.has(ext)) continue;
    if (rel === "package-lock.json") continue;
    const abs = path.join(projectDir, rel);
    const size = fs.statSync(abs).size;
    if (size > MAX_FILE_BYTES) {
      chunks.push(`### ${rel}\n(too large — ${size} bytes; use read_file to inspect)`);
      continue;
    }
    if (total + size > MAX_TOTAL_BYTES) {
      chunks.push(`### ${rel}\n(omitted for context budget; use read_file)`);
      continue;
    }
    total += size;
    const content = fs.readFileSync(abs, "utf8");
    chunks.push(`### ${rel}\n\`\`\`\n${content}\n\`\`\``);
  }

  return buildProjectContext(tree, chunks.join("\n\n"));
}
