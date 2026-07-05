import { spawn, type ChildProcess } from "node:child_process";
import { config } from "../config.js";

interface RunningServer {
  process: ChildProcess;
  port: number;
  logs: string[];
}

/**
 * Serveurs de preview : un `vite dev` par projet, logs capturés en mémoire
 * (consultables par l'agent via read_console_logs).
 */
export class DevServerManager {
  private servers = new Map<string, RunningServer>();
  private nextPort = config.previewPortStart;

  async start(projectId: string, projectDir: string): Promise<{ port: number; url: string }> {
    const existing = this.servers.get(projectId);
    if (existing && existing.process.exitCode === null) {
      return { port: existing.port, url: `http://localhost:${existing.port}` };
    }

    const port = this.nextPort++;
    const child = spawn("npx", ["vite", "--port", String(port), "--strictPort", "--host"], {
      cwd: projectDir,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, FORCE_COLOR: "0" },
    });

    const logs: string[] = [];
    const capture = (chunk: Buffer) => {
      for (const line of chunk.toString("utf8").split("\n")) {
        if (line.trim()) logs.push(line);
      }
      if (logs.length > 2000) logs.splice(0, logs.length - 2000);
    };
    child.stdout?.on("data", capture);
    child.stderr?.on("data", capture);
    child.on("exit", (code) => logs.push(`[dev server exited with code ${code}]`));

    this.servers.set(projectId, { process: child, port, logs });

    // Attendre que Vite annonce son démarrage (ou échoue).
    await new Promise<void>((resolve, reject) => {
      const deadline = setTimeout(() => resolve(), 15_000);
      const check = setInterval(() => {
        if (logs.some((l) => l.includes("Local:") || l.includes("ready in"))) {
          clearTimeout(deadline);
          clearInterval(check);
          resolve();
        }
        if (child.exitCode !== null) {
          clearTimeout(deadline);
          clearInterval(check);
          reject(new Error(`Dev server failed to start:\n${logs.slice(-20).join("\n")}`));
        }
      }, 200);
    });

    return { port, url: `http://localhost:${port}` };
  }

  stop(projectId: string): boolean {
    const server = this.servers.get(projectId);
    if (!server) return false;
    server.process.kill("SIGTERM");
    this.servers.delete(projectId);
    return true;
  }

  getLogs(projectId: string, lines = 80): string {
    const server = this.servers.get(projectId);
    if (!server) return "No dev server is running for this project.";
    return server.logs.slice(-lines).join("\n") || "(no output yet)";
  }

  status(projectId: string): { running: boolean; port?: number } {
    const server = this.servers.get(projectId);
    if (!server || server.process.exitCode !== null) return { running: false };
    return { running: true, port: server.port };
  }

  stopAll(): void {
    for (const id of [...this.servers.keys()]) this.stop(id);
  }
}
