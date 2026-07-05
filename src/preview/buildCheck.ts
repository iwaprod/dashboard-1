import { execFile } from "node:child_process";

export interface BuildCheckResult {
  ok: boolean;
  errors?: string;
}

/**
 * Vérification post-édition : compile le projet avec tsc (rapide, sans émission).
 * Les erreurs sont renvoyées à l'agent pour auto-correction.
 */
export function runBuildCheck(projectDir: string): Promise<BuildCheckResult> {
  return new Promise((resolve) => {
    execFile(
      "npx",
      ["tsc", "--noEmit", "--pretty", "false"],
      { cwd: projectDir, timeout: 120_000, maxBuffer: 4 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (!error) {
          resolve({ ok: true });
          return;
        }
        const output = [stdout, stderr].filter(Boolean).join("\n").trim();
        // Limiter la taille renvoyée au modèle.
        const errors = output.split("\n").slice(0, 60).join("\n") || String(error);
        resolve({ ok: false, errors });
      },
    );
  });
}
