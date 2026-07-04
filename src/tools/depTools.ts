import { execFileSync } from "node:child_process";

/** Valide un spécificateur npm ("react-router-dom", "@scope/pkg@1.2.3", "zod@^3"). */
function parseSpec(spec: string): string {
  const ok = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(@[a-zA-Z0-9-._^~><=* ]+)?$/.test(spec);
  if (!ok) throw new Error(`Invalid package specifier: ${spec}`);
  return spec;
}

export function addDependency(projectDir: string, spec: string): string {
  parseSpec(spec);
  execFileSync("npm", ["install", spec, "--no-audit", "--no-fund"], {
    cwd: projectDir,
    stdio: "pipe",
    timeout: 180_000,
  });
  return `Installed ${spec}`;
}

export function removeDependency(projectDir: string, spec: string): string {
  const name = parseSpec(spec).split("@").slice(0, spec.startsWith("@") ? 2 : 1).join("@");
  execFileSync("npm", ["uninstall", name, "--no-audit", "--no-fund"], {
    cwd: projectDir,
    stdio: "pipe",
    timeout: 180_000,
  });
  return `Removed ${name}`;
}
