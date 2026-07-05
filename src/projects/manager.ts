import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { config } from "../config.js";
import type { ProjectMeta } from "../types.js";
import { ProjectStore } from "./store.js";
import { initRepo } from "./snapshots.js";
import { applyTemplate } from "./templates.js";

/** Cycle de vie des projets : création depuis le template, listing, accès, suppression. */
export class ProjectManager {
  constructor(private workspaceDir = config.workspaceDir) {
    fs.mkdirSync(this.workspaceDir, { recursive: true });
  }

  projectDir(id: string): string {
    if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`Invalid project id: ${id}`);
    const dir = path.join(this.workspaceDir, id);
    if (!fs.existsSync(dir)) throw new Error(`Project not found: ${id}`);
    return dir;
  }

  list(): ProjectMeta[] {
    const out: ProjectMeta[] = [];
    for (const entry of fs.readdirSync(this.workspaceDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const metaPath = path.join(this.workspaceDir, entry.name, ".openlovable", "meta.json");
      if (fs.existsSync(metaPath)) {
        out.push(JSON.parse(fs.readFileSync(metaPath, "utf8")));
      }
    }
    return out.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  get(id: string): ProjectMeta {
    return new ProjectStore(this.projectDir(id)).readMeta();
  }

  /** Crée un projet : copie du template de base (+ overlay d'un modèle de la galerie), npm install, git init. */
  async create(name: string, options: { installDeps?: boolean; templateId?: string } = {}): Promise<ProjectMeta> {
    const id = `${slugify(name) || "projet"}-${crypto.randomBytes(3).toString("hex")}`;
    const dir = path.join(this.workspaceDir, id);
    fs.cpSync(config.templateDir, dir, { recursive: true });
    if (options.templateId) applyTemplate(dir, options.templateId);

    const now = new Date().toISOString();
    const meta: ProjectMeta = {
      id,
      name,
      createdAt: now,
      updatedAt: now,
      ...(options.templateId ? { templateId: options.templateId } : {}),
    };
    new ProjectStore(dir).init(meta);

    if (options.installDeps !== false) {
      execFileSync("npm", ["install", "--no-audit", "--no-fund"], {
        cwd: dir,
        stdio: "pipe",
        timeout: 300_000,
      });
    }
    initRepo(dir);
    return meta;
  }

  delete(id: string): void {
    const dir = this.projectDir(id);
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}
