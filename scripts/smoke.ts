/**
 * Test de fumée de bout en bout, sans clé API (client LLM simulé) ni npm install
 * (le tour d'agent est lancé avec skipBuildCheck).
 *
 *   OPENLOVABLE_MOCK=1 npm run smoke
 */
process.env.OPENLOVABLE_MOCK = "1";

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.OPENLOVABLE_WORKSPACE = fs.mkdtempSync(path.join(os.tmpdir(), "openlovable-smoke-"));

const { ProjectManager } = await import("../src/projects/manager.js");
const { ProjectStore } = await import("../src/projects/store.js");
const { runAgentTurn } = await import("../src/agent/orchestrator.js");
const { createLLMClient } = await import("../src/llm/client.js");
const { listSnapshots, restoreSnapshot } = await import("../src/projects/snapshots.js");
const { listFiles, readFile } = await import("../src/tools/fileTools.js");
const { lineReplace, writeFile } = await import("../src/tools/fileTools.js");

let failures = 0;
function check(label: string, cond: boolean) {
  console.log(`${cond ? "✓" : "✗"} ${label}`);
  if (!cond) failures++;
}

// 1. Création de projet depuis le template (sans npm install pour la vitesse).
const projects = new ProjectManager();
const meta = await projects.create("Site vitrine", { installDeps: false });
const dir = projects.projectDir(meta.id);
check("projet créé depuis le template", fs.existsSync(path.join(dir, "src/App.tsx")));
check("dépôt git initialisé", fs.existsSync(path.join(dir, ".git")));

// 2. Tour d'agent complet en mode mock.
const events: string[] = [];
await runAgentTurn({
  projectId: meta.id,
  projectDir: dir,
  userMessage: "Crée une landing page pour un studio de design nommé Studio Nova",
  llm: createLLMClient(),
  emit: (e) => events.push(e.type),
  getConsoleLogs: () => "(no dev server)",
  skipBuildCheck: true,
});
check("événement tool_call émis", events.includes("tool_call"));
check("événement tool_result émis", events.includes("tool_result"));
check("événement turn_end émis", events.includes("turn_end"));
check("snapshot créé", events.includes("snapshot"));
check("App.tsx réécrit par l'agent", readFile(dir, "src/App.tsx").includes("Studio Nova"));

// 3. Historique persisté et rejouable.
const store = new ProjectStore(dir);
const messages = store.readMessages();
check("historique persisté (>= 4 messages)", messages.length >= 4);
check("dernier message assistant a un snapshot", messages.some((m) => m.snapshotCommit));

// 4. Snapshots + restauration.
const snapsBefore = listSnapshots(dir);
check("au moins 2 snapshots (init + tour)", snapsBefore.length >= 2);
const initial = snapsBefore[snapsBefore.length - 1].commit;
restoreSnapshot(dir, initial);
check("restauration au template initial", readFile(dir, "src/App.tsx").includes("Projet vierge"));

// 5. Outils d'édition : line_replace avec ellipse + sécurité des chemins.
writeFile(dir, "src/demo.ts", "function a() {\n  const x = 1;\n  const y = 2;\n  return x + y;\n}\n");
lineReplace(dir, "src/demo.ts", "function a() {\n...\n}", "function a() {\n  return 3;\n}");
check("line_replace avec ellipse", readFile(dir, "src/demo.ts").includes("return 3;"));
let blocked = false;
try {
  writeFile(dir, "../evasion.txt", "nope");
} catch {
  blocked = true;
}
check("évasion de chemin bloquée", blocked);

// Nettoyage.
fs.rmSync(process.env.OPENLOVABLE_WORKSPACE!, { recursive: true, force: true });

if (failures > 0) {
  console.error(`\n${failures} échec(s)`);
  process.exit(1);
}
console.log("\nTous les tests de fumée passent.");
