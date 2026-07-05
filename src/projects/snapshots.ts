import { execFileSync } from "node:child_process";
import type { Snapshot } from "../types.js";

/**
 * Versioning des projets : un dépôt git par projet, un commit par tour d'agent.
 * Permet l'historique et la restauration ("revert to this version" de Lovable).
 */

function git(projectDir: string, args: string[]): string {
  return execFileSync("git", args, { cwd: projectDir, stdio: "pipe", timeout: 60_000 })
    .toString("utf8")
    .trim();
}

export function initRepo(projectDir: string): void {
  git(projectDir, ["init", "-q", "-b", "main"]);
  git(projectDir, ["config", "user.name", "OpenLovable"]);
  git(projectDir, ["config", "user.email", "agent@openlovable.local"]);
  commit(projectDir, "Initial project from template");
}

/** Commit de l'état courant ; renvoie le hash (ou celui de HEAD si rien à committer). */
export function commit(projectDir: string, message: string): string {
  git(projectDir, ["add", "-A"]);
  try {
    git(projectDir, ["commit", "-q", "-m", message]);
  } catch {
    // Rien à committer : renvoyer HEAD.
  }
  return git(projectDir, ["rev-parse", "HEAD"]);
}

export function listSnapshots(projectDir: string): Snapshot[] {
  const raw = git(projectDir, ["log", "--pretty=format:%H%x1f%s%x1f%cI"]);
  if (!raw) return [];
  return raw.split("\n").map((line) => {
    const [commitHash, message, date] = line.split("\x1f");
    return { commit: commitHash, message, date };
  });
}

/** Restaure l'arbre de travail à un commit donné (l'historique est conservé, nouveau commit de restauration). */
export function restoreSnapshot(projectDir: string, commitHash: string): string {
  if (!/^[0-9a-f]{7,40}$/i.test(commitHash)) throw new Error(`Invalid commit: ${commitHash}`);
  git(projectDir, ["checkout", "-q", commitHash, "--", "."]);
  // checkout -- . ne supprime pas les fichiers créés depuis ; on nettoie via status.
  const status = git(projectDir, ["status", "--porcelain"]);
  for (const line of status.split("\n")) {
    if (line.startsWith("??")) {
      const file = line.slice(3).trim();
      if (file && !file.startsWith(".openlovable")) {
        git(projectDir, ["clean", "-fq", "--", file]);
      }
    }
  }
  return commit(projectDir, `Restore snapshot ${commitHash.slice(0, 8)}`);
}
