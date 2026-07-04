import fs from "node:fs";
import path from "node:path";
import type { ChatMessage, ProjectMeta } from "../types.js";

/** Persistance disque : métadonnées + historique de chat, sous <projet>/.openlovable/. */
export class ProjectStore {
  constructor(private projectDir: string) {}

  private get dir(): string {
    return path.join(this.projectDir, ".openlovable");
  }
  private get metaPath(): string {
    return path.join(this.dir, "meta.json");
  }
  private get messagesPath(): string {
    return path.join(this.dir, "messages.json");
  }

  init(meta: ProjectMeta): void {
    fs.mkdirSync(this.dir, { recursive: true });
    this.writeMeta(meta);
    if (!fs.existsSync(this.messagesPath)) this.writeMessages([]);
  }

  readMeta(): ProjectMeta {
    return JSON.parse(fs.readFileSync(this.metaPath, "utf8"));
  }

  writeMeta(meta: ProjectMeta): void {
    fs.mkdirSync(this.dir, { recursive: true });
    fs.writeFileSync(this.metaPath, JSON.stringify(meta, null, 2));
  }

  touch(): void {
    const meta = this.readMeta();
    meta.updatedAt = new Date().toISOString();
    this.writeMeta(meta);
  }

  readMessages(): ChatMessage[] {
    if (!fs.existsSync(this.messagesPath)) return [];
    return JSON.parse(fs.readFileSync(this.messagesPath, "utf8"));
  }

  writeMessages(messages: ChatMessage[]): void {
    fs.mkdirSync(this.dir, { recursive: true });
    fs.writeFileSync(this.messagesPath, JSON.stringify(messages, null, 2));
  }

  appendMessage(message: ChatMessage): void {
    const all = this.readMessages();
    all.push(message);
    this.writeMessages(all);
  }
}
