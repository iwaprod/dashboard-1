import express, { type Request, type Response } from "express";
import path from "node:path";
import fs from "node:fs";
import { config } from "../config.js";
import { ProjectManager } from "../projects/manager.js";
import { ProjectStore } from "../projects/store.js";
import { listSnapshots, restoreSnapshot } from "../projects/snapshots.js";
import { DevServerManager } from "../preview/devServer.js";
import { runBuildCheck } from "../preview/buildCheck.js";
import { runAgentTurn } from "../agent/orchestrator.js";
import { createLLMClient } from "../llm/client.js";
import { listFiles, readFile } from "../tools/fileTools.js";
import { listTemplates } from "../projects/templates.js";
import type { AgentEvent } from "../types.js";

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "2mb" }));
  // Interface web (SPA statique, zéro build).
  app.use(express.static(path.join(config.rootDir, "public")));

  const projects = new ProjectManager();
  const devServers = new DevServerManager();
  const llm = createLLMClient();
  /** Verrou par projet : un seul tour d'agent à la fois. */
  const busy = new Set<string>();

  const asyncHandler =
    (fn: (req: Request, res: Response) => Promise<void>) => (req: Request, res: Response) => {
      fn(req, res).catch((err) => {
        if (!res.headersSent) res.status(500).json({ error: String(err?.message ?? err) });
      });
    };

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, model: config.model, mock: config.mockLLM });
  });

  // --- Modèles (galerie "Lovable templates") ---
  app.get("/api/templates", (_req, res) => res.json(listTemplates()));

  // --- Projets ---
  app.get("/api/projects", (_req, res) => res.json(projects.list()));

  app.post(
    "/api/projects",
    asyncHandler(async (req, res) => {
      const name = String(req.body?.name ?? "").trim();
      if (!name) {
        res.status(400).json({ error: "'name' is required" });
        return;
      }
      const meta = await projects.create(name, {
        installDeps: req.body?.installDeps !== false,
        templateId: req.body?.templateId ? String(req.body.templateId) : undefined,
      });
      res.status(201).json(meta);
    }),
  );

  app.get("/api/projects/:id", (req, res) => res.json(projects.get(req.params.id)));

  // Marquage favori + suivi d'ouverture (onglets Starred / Recently viewed).
  app.patch("/api/projects/:id", (req, res) => {
    const store = new ProjectStore(projects.projectDir(req.params.id));
    const meta = store.readMeta();
    if (typeof req.body?.starred === "boolean") meta.starred = req.body.starred;
    if (req.body?.opened === true) meta.lastOpenedAt = new Date().toISOString();
    store.writeMeta(meta);
    res.json(meta);
  });

  app.delete("/api/projects/:id", (req, res) => {
    devServers.stop(req.params.id);
    projects.delete(req.params.id);
    res.status(204).end();
  });

  // --- Chat (SSE) : le cœur du système ---
  app.post(
    "/api/projects/:id/chat",
    asyncHandler(async (req, res) => {
      const id = req.params.id;
      const message = String(req.body?.message ?? "").trim();
      if (!message) {
        res.status(400).json({ error: "'message' is required" });
        return;
      }
      const projectDir = projects.projectDir(id);
      if (busy.has(id)) {
        res.status(409).json({ error: "An agent turn is already running for this project" });
        return;
      }
      busy.add(id);

      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });
      const emit = (event: AgentEvent) => {
        res.write(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`);
      };

      try {
        await runAgentTurn({
          projectId: id,
          projectDir,
          userMessage: message,
          llm,
          emit,
          getConsoleLogs: (lines) => devServers.getLogs(id, lines),
          skipBuildCheck: req.body?.skipBuildCheck === true,
        });
      } catch (err) {
        emit({ type: "error", message: String(err instanceof Error ? err.message : err) });
      } finally {
        busy.delete(id);
        res.write("event: done\ndata: {}\n\n");
        res.end();
      }
    }),
  );

  app.get("/api/projects/:id/messages", (req, res) => {
    const store = new ProjectStore(projects.projectDir(req.params.id));
    res.json(store.readMessages());
  });

  // --- Fichiers ---
  app.get("/api/projects/:id/files", (req, res) => {
    res.json(listFiles(projects.projectDir(req.params.id)));
  });

  app.get("/api/projects/:id/files/*", (req, res) => {
    const rel = (req.params as Record<string, string>)[0];
    try {
      res.type("text/plain").send(readFile(projects.projectDir(req.params.id), rel));
    } catch (err) {
      res.status(404).json({ error: String(err instanceof Error ? err.message : err) });
    }
  });

  // --- Snapshots (historique de versions) ---
  app.get("/api/projects/:id/snapshots", (req, res) => {
    res.json(listSnapshots(projects.projectDir(req.params.id)));
  });

  app.post("/api/projects/:id/snapshots/:commit/restore", (req, res) => {
    const newHead = restoreSnapshot(projects.projectDir(req.params.id), req.params.commit);
    res.json({ restored: req.params.commit, head: newHead });
  });

  // --- Preview ---
  app.post(
    "/api/projects/:id/preview/start",
    asyncHandler(async (req, res) => {
      const dir = projects.projectDir(req.params.id);
      if (!fs.existsSync(path.join(dir, "node_modules"))) {
        res.status(409).json({ error: "Dependencies not installed for this project" });
        return;
      }
      res.json(await devServers.start(req.params.id, dir));
    }),
  );

  app.post("/api/projects/:id/preview/stop", (req, res) => {
    res.json({ stopped: devServers.stop(req.params.id) });
  });

  app.get("/api/projects/:id/preview", (req, res) => {
    res.json(devServers.status(req.params.id));
  });

  app.get("/api/projects/:id/preview/logs", (req, res) => {
    res.type("text/plain").send(devServers.getLogs(req.params.id, Number(req.query.lines ?? 120)));
  });

  // --- Build check manuel ---
  app.post(
    "/api/projects/:id/build-check",
    asyncHandler(async (req, res) => {
      res.json(await runBuildCheck(projects.projectDir(req.params.id)));
    }),
  );

  return { app, devServers };
}
