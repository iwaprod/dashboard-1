import fs from "node:fs";
import path from "node:path";

/** Répertoires jamais parcourus / modifiables. */
const EXCLUDED_DIRS = new Set(["node_modules", ".git", "dist", ".openlovable"]);

/** Résout un chemin relatif au projet en refusant toute évasion (.., liens, absolus). */
export function resolveSafe(projectDir: string, relPath: string): string {
  const cleaned = relPath.replace(/^\/+/, "");
  const abs = path.resolve(projectDir, cleaned);
  const root = path.resolve(projectDir);
  if (abs !== root && !abs.startsWith(root + path.sep)) {
    throw new Error(`Path escapes the project: ${relPath}`);
  }
  const top = path.relative(root, abs).split(path.sep)[0];
  if (EXCLUDED_DIRS.has(top)) {
    throw new Error(`Path is not editable: ${relPath}`);
  }
  return abs;
}

export function writeFile(projectDir: string, relPath: string, content: string): string {
  const abs = resolveSafe(projectDir, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const existed = fs.existsSync(abs);
  fs.writeFileSync(abs, content, "utf8");
  return existed ? `Overwrote ${relPath}` : `Created ${relPath}`;
}

/**
 * Remplacement chirurgical : `search` doit correspondre exactement et une seule fois.
 * Une ligne contenant uniquement "..." dans `search` matche paresseusement le milieu.
 */
export function lineReplace(projectDir: string, relPath: string, search: string, replace: string): string {
  const abs = resolveSafe(projectDir, relPath);
  if (!fs.existsSync(abs)) throw new Error(`File not found: ${relPath}`);
  const original = fs.readFileSync(abs, "utf8");

  const parts = search.split(/\r?\n\.\.\.\r?\n/);
  if (parts.length > 2) throw new Error("At most one '...' ellipsis line is supported in `search`.");

  let updated: string;
  if (parts.length === 2) {
    const [head, tail] = parts;
    const escaped = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped(head) + "[\\s\\S]*?" + escaped(tail));
    const matches = original.match(new RegExp(re.source, "g"));
    if (!matches || matches.length === 0) {
      throw new Error(`Search block not found in ${relPath}. Read the file to get its exact current content.`);
    }
    if (matches.length > 1) {
      throw new Error(`Search block matches ${matches.length} times in ${relPath}; make it more specific.`);
    }
    updated = original.replace(re, replace);
  } else {
    const first = original.indexOf(search);
    if (first === -1) {
      throw new Error(`Search text not found in ${relPath}. Read the file to get its exact current content.`);
    }
    if (original.indexOf(search, first + 1) !== -1) {
      throw new Error(`Search text is not unique in ${relPath}; include more surrounding lines.`);
    }
    updated = original.slice(0, first) + replace + original.slice(first + search.length);
  }

  fs.writeFileSync(abs, updated, "utf8");
  return `Edited ${relPath}`;
}

export function renameFile(projectDir: string, from: string, to: string): string {
  const absFrom = resolveSafe(projectDir, from);
  const absTo = resolveSafe(projectDir, to);
  if (!fs.existsSync(absFrom)) throw new Error(`File not found: ${from}`);
  fs.mkdirSync(path.dirname(absTo), { recursive: true });
  fs.renameSync(absFrom, absTo);
  return `Renamed ${from} -> ${to}`;
}

export function deleteFile(projectDir: string, relPath: string): string {
  const abs = resolveSafe(projectDir, relPath);
  if (!fs.existsSync(abs)) throw new Error(`File not found: ${relPath}`);
  fs.rmSync(abs);
  return `Deleted ${relPath}`;
}

export function readFile(projectDir: string, relPath: string): string {
  const abs = resolveSafe(projectDir, relPath);
  if (!fs.existsSync(abs)) throw new Error(`File not found: ${relPath}`);
  return fs.readFileSync(abs, "utf8");
}

/** Liste récursive des fichiers du projet (chemins relatifs, répertoires système exclus). */
export function listFiles(projectDir: string): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") && entry.name !== ".gitignore") continue;
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(abs);
      else out.push(path.relative(projectDir, abs).split(path.sep).join("/"));
    }
  };
  walk(projectDir);
  return out.sort();
}

export function searchFiles(projectDir: string, pattern: string, glob?: string): string {
  const re = new RegExp(pattern);
  const results: string[] = [];
  for (const rel of listFiles(projectDir)) {
    if (glob && !rel.includes(glob)) continue;
    const content = fs.readFileSync(path.join(projectDir, rel), "utf8");
    content.split("\n").forEach((line, i) => {
      if (re.test(line) && results.length < 200) {
        results.push(`${rel}:${i + 1}: ${line.trim().slice(0, 200)}`);
      }
    });
  }
  return results.length ? results.join("\n") : "No matches.";
}
