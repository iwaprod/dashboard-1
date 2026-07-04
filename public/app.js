/* OpenLovable — interface web (vanilla JS, zéro build). */
"use strict";

const $ = (sel) => document.querySelector(sel);
const api = {
  async json(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? res.statusText);
    return res.status === 204 ? null : res.json();
  },
};

let currentProject = null;
let previewUrl = null;

/* ————— Accueil ————— */

async function renderHome() {
  $("#home").classList.remove("hidden");
  $("#workspace").classList.add("hidden");
  currentProject = null;
  const list = $("#project-list");
  list.innerHTML = "";
  const projects = await api.json("/api/projects");
  for (const p of projects) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `<span>${escapeHtml(p.name)}</span><span class="date">${new Date(p.updatedAt).toLocaleString("fr-FR")}</span>`;
    card.onclick = () => openProject(p, null);
    list.appendChild(card);
  }
}

$("#create-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = $("#create-prompt").value.trim();
  if (!prompt) return;
  const name = $("#create-name").value.trim() || prompt.slice(0, 40);
  const btn = $("#create-btn");
  btn.disabled = true;
  btn.textContent = "Création du projet…";
  try {
    const meta = await api.json("/api/projects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    });
    await openProject(meta, prompt);
  } catch (err) {
    alert(`Erreur : ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = "Créer le site →";
  }
});

/* ————— Espace de travail ————— */

async function openProject(meta, firstPrompt) {
  currentProject = meta;
  previewUrl = null;
  $("#home").classList.add("hidden");
  $("#workspace").classList.remove("hidden");
  $("#project-title").textContent = meta.name;
  $("#messages").innerHTML = "";
  $("#preview-frame").classList.add("hidden");
  $("#preview-placeholder").classList.remove("hidden");
  setStatus("idle", "prêt");

  await renderHistory();
  await refreshPreviewStatus();
  if (firstPrompt) {
    await sendMessage(firstPrompt);
  }
}

$("#back-btn").onclick = () => renderHome();

function setStatus(kind, text) {
  const dot = $("#status-dot");
  dot.className = "dot " + (kind === "busy" ? "busy" : kind === "ok" ? "ok" : kind === "err" ? "err" : "");
  $("#status-text").textContent = text;
}

/* Historique de chat persisté */
async function renderHistory() {
  const messages = await api.json(`/api/projects/${currentProject.id}/messages`);
  const box = $("#messages");
  box.innerHTML = "";
  for (const m of messages) {
    if (m.role === "user" && m.displayText && !m.displayText.startsWith("[auto]")) {
      addBubble("user", m.displayText);
    } else if (m.role === "assistant" && m.displayText) {
      addBubble("assistant", m.displayText);
    }
  }
  box.scrollTop = box.scrollHeight;
}

function addBubble(role, text) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  $("#messages").appendChild(div);
  $("#messages").scrollTop = $("#messages").scrollHeight;
  return div;
}

function addChip(html, cls = "") {
  const span = document.createElement("span");
  span.className = `chip ${cls}`;
  span.innerHTML = html;
  $("#messages").appendChild(span);
  $("#messages").scrollTop = $("#messages").scrollHeight;
  return span;
}

const TOOL_LABELS = {
  write_file: "✏️ écrit",
  line_replace: "🔧 modifie",
  rename_file: "📁 renomme",
  delete_file: "🗑 supprime",
  read_file: "👀 lit",
  search_files: "🔍 recherche",
  add_dependency: "📦 installe",
  remove_dependency: "📦 désinstalle",
  read_console_logs: "🖥 logs",
};

function toolLabel(name, input) {
  const verb = TOOL_LABELS[name] ?? name;
  const target = input?.path ?? input?.from ?? input?.package ?? input?.pattern ?? "";
  return `${verb} <b>${escapeHtml(String(target))}</b>`;
}

/* ————— Chat : POST + parsing SSE ————— */

$("#chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#chat-input");
  const text = input.value.trim();
  if (!text || !currentProject) return;
  input.value = "";
  sendMessage(text);
});

$("#chat-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    $("#chat-form").requestSubmit();
  }
});

async function sendMessage(text) {
  addBubble("user", text);
  setStatus("busy", "l'agent travaille…");
  $("#send-btn").disabled = true;

  let streamingBubble = null;
  const chips = new Map(); // tool_use id -> chip element

  const finishStreamingBubble = () => {
    if (streamingBubble) {
      streamingBubble.classList.remove("streaming");
      streamingBubble = null;
    }
  };

  try {
    const res = await fetch(`/api/projects/${currentProject.id}/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    if (!res.ok || !res.body) {
      throw new Error((await res.json().catch(() => ({}))).error ?? res.statusText);
    }

    for await (const event of parseSSE(res.body)) {
      switch (event.type) {
        case "assistant_text_delta": {
          if (!streamingBubble) {
            streamingBubble = addBubble("assistant", "");
            streamingBubble.classList.add("streaming");
          }
          streamingBubble.textContent += event.text;
          $("#messages").scrollTop = $("#messages").scrollHeight;
          break;
        }
        case "assistant_message":
          finishStreamingBubble();
          break;
        case "thinking_start":
          setStatus("busy", "l'agent réfléchit…");
          break;
        case "tool_call": {
          finishStreamingBubble();
          setStatus("busy", "l'agent édite le projet…");
          const chip = addChip(`<span class="spin">◌</span> ${toolLabel(event.name, event.input)}`);
          chips.set(event.id, { chip, name: event.name, input: event.input });
          break;
        }
        case "tool_result": {
          const entry = chips.get(event.id);
          if (entry) {
            entry.chip.className = `chip ${event.isError ? "error" : "done"}`;
            entry.chip.innerHTML = `${event.isError ? "✗" : "✓"} ${toolLabel(entry.name, entry.input)}`;
          }
          break;
        }
        case "build_check":
          addChip(
            event.ok ? "✓ build vérifié" : "⚠ erreurs de build détectées",
            event.ok ? "done" : "info",
          );
          break;
        case "fix_attempt":
          addChip(`🔁 correction automatique ${event.attempt}/${event.maxAttempts}`, "info");
          break;
        case "snapshot":
          addChip(`📌 version enregistrée <b>${event.commit.slice(0, 8)}</b>`, "done");
          break;
        case "error":
          finishStreamingBubble();
          addChip(`✗ ${escapeHtml(event.message)}`, "error");
          setStatus("err", "erreur");
          break;
        case "turn_end":
          finishStreamingBubble();
          break;
      }
    }
    if ($("#status-dot").className.indexOf("err") === -1) setStatus("ok", "terminé");
  } catch (err) {
    addChip(`✗ ${escapeHtml(err.message)}`, "error");
    setStatus("err", "erreur");
  } finally {
    finishStreamingBubble();
    $("#send-btn").disabled = false;
    reloadPreview();
    renderSnapshots().catch(() => {});
    if ($("#tab-code").classList.contains("active")) renderFiles().catch(() => {});
  }
}

/** Itérateur asynchrone d'événements SSE depuis un body fetch. */
async function* parseSSE(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let sep;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const raw = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      const dataLine = raw.split("\n").find((l) => l.startsWith("data: "));
      if (!dataLine) continue;
      try {
        const parsed = JSON.parse(dataLine.slice(6));
        if (parsed && parsed.type) yield parsed;
      } catch {
        /* ligne incomplète ignorée */
      }
    }
  }
}

/* ————— Onglets ————— */

document.querySelectorAll(".tab").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    $(`#tab-${btn.dataset.tab}`).classList.add("active");
    if (btn.dataset.tab === "code") renderFiles().catch(console.error);
    if (btn.dataset.tab === "history") renderSnapshots().catch(console.error);
  };
});

/* ————— Preview ————— */

$("#start-preview").onclick = async () => {
  const btn = $("#start-preview");
  btn.disabled = true;
  btn.textContent = "Démarrage…";
  try {
    const { url } = await api.json(`/api/projects/${currentProject.id}/preview/start`, { method: "POST" });
    setPreview(url);
  } catch (err) {
    alert(`Erreur : ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = "▶ Démarrer l'aperçu";
  }
};

async function refreshPreviewStatus() {
  try {
    const status = await api.json(`/api/projects/${currentProject.id}/preview`);
    if (status.running) setPreview(`http://${location.hostname}:${status.port}`);
  } catch {
    /* pas de preview */
  }
}

function setPreview(url) {
  previewUrl = url;
  const frame = $("#preview-frame");
  frame.src = url;
  frame.classList.remove("hidden");
  $("#preview-placeholder").classList.add("hidden");
  $("#open-preview").href = url;
}

function reloadPreview() {
  const frame = $("#preview-frame");
  if (previewUrl && !frame.classList.contains("hidden")) {
    frame.src = previewUrl + "?t=" + Date.now();
  }
}

$("#reload-preview").onclick = reloadPreview;

/* ————— Code ————— */

async function renderFiles() {
  const files = await api.json(`/api/projects/${currentProject.id}/files`);
  const list = $("#file-list");
  list.innerHTML = "";
  for (const f of files) {
    const li = document.createElement("li");
    li.textContent = f;
    li.onclick = async () => {
      list.querySelectorAll("li").forEach((el) => el.classList.remove("active"));
      li.classList.add("active");
      const res = await fetch(`/api/projects/${currentProject.id}/files/${f}`);
      $("#file-content").textContent = await res.text();
    };
    list.appendChild(li);
  }
}

/* ————— Historique de versions ————— */

async function renderSnapshots() {
  if (!currentProject) return;
  const snapshots = await api.json(`/api/projects/${currentProject.id}/snapshots`);
  const list = $("#snapshot-list");
  list.innerHTML = "";
  snapshots.forEach((s, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="sha">${s.commit.slice(0, 8)}</span><span>${escapeHtml(s.message)}</span><span class="when">${new Date(s.date).toLocaleString("fr-FR")}</span>`;
    if (i > 0) {
      const btn = document.createElement("button");
      btn.textContent = "Restaurer";
      btn.onclick = async () => {
        if (!confirm(`Restaurer le projet à la version ${s.commit.slice(0, 8)} ?`)) return;
        await api.json(`/api/projects/${currentProject.id}/snapshots/${s.commit}/restore`, { method: "POST" });
        await renderSnapshots();
        reloadPreview();
      };
      li.appendChild(btn);
    }
    list.appendChild(li);
  });
}

/* ————— Utilitaires ————— */

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

renderHome().catch(console.error);
