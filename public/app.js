/* OpenLovable — interface web (vanilla JS, zéro build). */
"use strict";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const api = {
  async json(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? res.statusText);
    return res.status === 204 ? null : res.json();
  },
};

const USER_NAME = localStorage.getItem("openlovable-name") ?? "Angel";
let currentProject = null;
let previewUrl = null;
let templates = [];
let projectsCache = [];
let activeGTab = "templates";

/* ═════════ DASHBOARD ═════════ */

async function renderHome() {
  $("#home").classList.remove("hidden");
  $("#workspace").classList.add("hidden");
  currentProject = null;
  $("#hero-title").textContent = `What's the vision, ${USER_NAME}?`;
  [templates, projectsCache] = await Promise.all([
    api.json("/api/templates"),
    api.json("/api/projects"),
  ]);
  renderRecentsSidebar();
  renderBuildMenu();
  renderGallery();
}

function renderRecentsSidebar() {
  const nav = $("#recents-nav");
  nav.innerHTML = "";
  const recents = projectsCache
    .filter((p) => p.lastOpenedAt)
    .sort((a, b) => (b.lastOpenedAt ?? "").localeCompare(a.lastOpenedAt ?? ""))
    .slice(0, 5);
  if (!recents.length) {
    nav.innerHTML = `<div class="side-item" style="color:var(--muted);cursor:default">Aucun projet récent</div>`;
    return;
  }
  for (const p of recents) {
    const btn = document.createElement("button");
    btn.className = "side-item";
    btn.innerHTML = `▸ <span>${escapeHtml(p.name)}</span>`;
    btn.onclick = () => openProject(p, null);
    nav.appendChild(btn);
  }
}

/* Menu "Build ▾" : partir de zéro ou d'un modèle. */
function renderBuildMenu() {
  const menu = $("#build-menu");
  menu.innerHTML = `<div class="pb-menu-label">Point de départ</div>`;
  const blank = document.createElement("button");
  blank.textContent = "◻ Projet vierge";
  blank.onclick = () => selectBuildBase(null);
  menu.appendChild(blank);
  const label = document.createElement("div");
  label.className = "pb-menu-label";
  label.textContent = "Modèles";
  menu.appendChild(label);
  for (const t of templates) {
    const btn = document.createElement("button");
    btn.textContent = `${t.name} — ${t.category}`;
    btn.onclick = () => selectBuildBase(t.id);
    menu.appendChild(btn);
  }
}

let buildBase = null;
function selectBuildBase(id) {
  buildBase = id;
  const t = templates.find((x) => x.id === id);
  $("#build-btn").innerHTML = `${t ? escapeHtml(t.name) : "Build"} <span class="ws-caret">▾</span>`;
  $("#build-menu").classList.add("hidden");
}
$("#build-btn").onclick = (e) => {
  e.stopPropagation();
  $("#build-menu").classList.toggle("hidden");
};
document.addEventListener("click", () => $("#build-menu").classList.add("hidden"));

/* — Navigation latérale — */
$$(".side-item[data-nav]").forEach((btn) => {
  btn.onclick = () => {
    $$(".side-item[data-nav]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const nav = btn.dataset.nav;
    if (nav === "dashboard") { activeGTab = "templates"; syncGTabs(); renderGallery(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    if (nav === "search") { $("#gallery-search").focus(); $("#gallery-search").scrollIntoView({ behavior: "smooth", block: "center" }); }
    if (nav === "resources") { activeGTab = "resources"; syncGTabs(); renderGallery(); }
    if (nav === "connectors") { activeGTab = "connectors"; syncGTabs(); renderGallery(); }
    if (nav === "all" || nav === "mine") { activeGTab = "projects"; syncGTabs(); renderGallery(); }
    if (nav === "starred") { activeGTab = "starred"; syncGTabs(); renderGallery(); }
    if (nav === "shared") { activeGTab = "shared"; syncGTabs(); renderGallery(); }
  };
});

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k" && !$("#home").classList.contains("hidden")) {
    e.preventDefault();
    $("#gallery-search").focus();
  }
});

/* — Onglets galerie — */
function syncGTabs() {
  $$(".gtab").forEach((b) => b.classList.toggle("active", b.dataset.gtab === activeGTab));
}
$$(".gtab").forEach((btn) => {
  btn.onclick = () => { activeGTab = btn.dataset.gtab; syncGTabs(); renderGallery(); };
});
$("#browse-all").onclick = () => { activeGTab = "templates"; $("#gallery-search").value = ""; syncGTabs(); renderGallery(); };
$("#gallery-search").addEventListener("input", () => renderGallery());

function thumbHtml(t) {
  const bg = `background:linear-gradient(135deg,${t.thumb.from},${t.thumb.to})`;
  const darkText = t.thumb.style === "editorial";
  let inner = "";
  if (t.thumb.style === "grid") {
    const cells = ["#fff8", "#fff5", "#fffb", "#fff6", "#fff9", "#fff4"].map((c) => `<i style="background:${c}"></i>`).join("");
    inner = `<span class="t-grid">${cells}</span>`;
  } else {
    inner = `<span class="t-${t.thumb.style}" style="color:${darkText ? "#1d1a14" : "#fff"}">${escapeHtml(t.thumb.text ?? t.name)}</span>`;
  }
  return `<div class="card-thumb" style="${bg}"><span class="card-badge">${escapeHtml(t.category)}</span>${inner}</div>`;
}

function projectThumbHtml(p) {
  const t = templates.find((x) => x.id === p.templateId);
  if (t) return thumbHtml({ ...t, category: t.name });
  const hue = [...p.id].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return `<div class="card-thumb" style="background:linear-gradient(135deg,hsl(${hue},45%,22%),hsl(${(hue + 40) % 360},50%,38%))">
    <span class="card-badge">Projet</span><span class="t-gradient">${escapeHtml(p.name.slice(0, 18))}</span></div>`;
}

function renderGallery() {
  const grid = $("#gallery-grid");
  const empty = $("#gallery-empty");
  const q = $("#gallery-search").value.trim().toLowerCase();
  grid.innerHTML = "";
  empty.classList.add("hidden");

  const showEmpty = (msg) => { empty.innerHTML = msg; empty.classList.remove("hidden"); };

  if (activeGTab === "resources") {
    showEmpty(`<h3 style="color:var(--text)">📚 Resources</h3><p style="margin-top:8px">Guide de démarrage : décrivez votre site dans la barre du haut, l'agent le construit.<br>Docs API : <code>/api/projects</code>, <code>/api/templates</code>, chat SSE — voir le README du dépôt.</p>`);
    return;
  }
  if (activeGTab === "connectors") {
    showEmpty(`<h3 style="color:var(--text)">🔌 Connectors</h3><p style="margin-top:8px">GitHub, Supabase, Stripe… arrivent bientôt.<br>L'agent peut déjà installer n'importe quel paquet npm dans vos projets.</p>`);
    return;
  }
  if (activeGTab === "shared") {
    showEmpty(`<h3 style="color:var(--text)">🤝 Shared with me</h3><p style="margin-top:8px">Personne ne vous a encore partagé de projet.</p>`);
    return;
  }

  if (activeGTab === "templates") {
    const list = templates.filter((t) => !q || (t.name + t.description + t.category).toLowerCase().includes(q));
    if (!list.length) return showEmpty(`Aucun modèle pour « ${escapeHtml(q)} »`);
    for (const t of list) grid.appendChild(templateCard(t));
    return;
  }

  // projects / recent / starred
  let list = [...projectsCache];
  if (activeGTab === "recent") {
    list = list.filter((p) => p.lastOpenedAt).sort((a, b) => (b.lastOpenedAt ?? "").localeCompare(a.lastOpenedAt ?? ""));
  }
  if (activeGTab === "starred") list = list.filter((p) => p.starred);
  list = list.filter((p) => !q || p.name.toLowerCase().includes(q));
  if (!list.length) {
    return showEmpty(
      activeGTab === "starred"
        ? "Aucun projet épinglé — cliquez sur ☆ sur un projet."
        : activeGTab === "recent"
          ? "Aucun projet ouvert récemment."
          : "Aucun projet pour l'instant — décrivez votre idée ci-dessus pour commencer.",
    );
  }
  for (const p of list) grid.appendChild(projectCard(p));
}

function templateCard(t) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `${thumbHtml(t)}<h3>${escapeHtml(t.name)}</h3><p>${escapeHtml(t.description)}</p>`;
  card.onclick = () => createFromTemplate(t);
  return card;
}

function projectCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `${projectThumbHtml(p)}<h3>${escapeHtml(p.name)}</h3><p>Modifié ${new Date(p.updatedAt).toLocaleString("fr-FR")}</p>`;
  const star = document.createElement("button");
  star.className = "card-star";
  star.textContent = p.starred ? "★" : "☆";
  star.title = p.starred ? "Retirer des favoris" : "Épingler";
  star.onclick = async (e) => {
    e.stopPropagation();
    const updated = await api.json(`/api/projects/${p.id}`, {
      method: "PATCH", headers: { "content-type": "application/json" },
      body: JSON.stringify({ starred: !p.starred }),
    });
    Object.assign(p, updated);
    renderGallery();
  };
  card.querySelector(".card-thumb").appendChild(star);
  card.onclick = () => openProject(p, null);
  return card;
}

async function createFromTemplate(t) {
  if (!confirm(`Créer un projet à partir du modèle « ${t.name} » ?`)) return;
  const meta = await withBusyButton($("#create-btn"), () =>
    api.json("/api/projects", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: t.name, templateId: t.id }),
    }),
  );
  await openProject(meta, null);
}

/* — Barre de prompt du hero — */
$("#create-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = $("#create-prompt").value.trim();
  if (!prompt) return;
  const name = prompt.slice(0, 44);
  try {
    const meta = await withBusyButton($("#create-btn"), () =>
      api.json("/api/projects", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, templateId: buildBase ?? undefined }),
      }),
    );
    $("#create-prompt").value = "";
    await openProject(meta, prompt);
  } catch (err) {
    alert(`Erreur : ${err.message}`);
  }
});
$("#create-prompt").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#create-form").requestSubmit(); }
});

async function withBusyButton(btn, fn) {
  const prev = btn.textContent;
  btn.disabled = true;
  btn.textContent = "…";
  try { return await fn(); } finally { btn.disabled = false; btn.textContent = prev; }
}

/* ═════════ ESPACE DE TRAVAIL ═════════ */

async function openProject(meta, firstPrompt) {
  currentProject = meta;
  previewUrl = null;
  $("#home").classList.add("hidden");
  $("#workspace").classList.remove("hidden");
  $("#project-title").textContent = meta.name;
  $("#star-btn").textContent = meta.starred ? "★" : "☆";
  $("#messages").innerHTML = "";
  $("#preview-frame").classList.add("hidden");
  $("#preview-placeholder").classList.remove("hidden");
  setStatus("idle", "prêt");

  api.json(`/api/projects/${meta.id}`, {
    method: "PATCH", headers: { "content-type": "application/json" },
    body: JSON.stringify({ opened: true }),
  }).catch(() => {});

  await renderChatHistory();
  await refreshPreviewStatus();
  if (firstPrompt) await sendMessage(firstPrompt);
}

$("#back-btn").onclick = () => renderHome();

$("#star-btn").onclick = async () => {
  if (!currentProject) return;
  const updated = await api.json(`/api/projects/${currentProject.id}`, {
    method: "PATCH", headers: { "content-type": "application/json" },
    body: JSON.stringify({ starred: !currentProject.starred }),
  });
  currentProject = updated;
  $("#star-btn").textContent = updated.starred ? "★" : "☆";
};

function setStatus(kind, text) {
  const dot = $("#status-dot");
  dot.className = "dot " + (kind === "busy" ? "busy" : kind === "ok" ? "ok" : kind === "err" ? "err" : "");
  $("#status-text").textContent = text;
}

async function renderChatHistory() {
  const messages = await api.json(`/api/projects/${currentProject.id}/messages`);
  const box = $("#messages");
  box.innerHTML = "";
  for (const m of messages) {
    if (m.role === "user" && m.displayText && !m.displayText.startsWith("[auto]")) addBubble("user", m.displayText);
    else if (m.role === "assistant" && m.displayText) addBubble("assistant", m.displayText);
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
  write_file: "✏️ écrit", line_replace: "🔧 modifie", rename_file: "📁 renomme",
  delete_file: "🗑 supprime", read_file: "👀 lit", search_files: "🔍 recherche",
  add_dependency: "📦 installe", remove_dependency: "📦 désinstalle", read_console_logs: "🖥 logs",
};

function toolLabel(name, input) {
  const verb = TOOL_LABELS[name] ?? name;
  const target = input?.path ?? input?.from ?? input?.package ?? input?.pattern ?? "";
  return `${verb} <b>${escapeHtml(String(target))}</b>`;
}

/* — Chat : POST + parsing SSE — */

$("#chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#chat-input");
  const text = input.value.trim();
  if (!text || !currentProject) return;
  input.value = "";
  sendMessage(text);
});

$("#chat-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#chat-form").requestSubmit(); }
});

async function sendMessage(text) {
  addBubble("user", text);
  setStatus("busy", "l'agent travaille…");
  $("#send-btn").disabled = true;

  let streamingBubble = null;
  const chips = new Map();
  const finishStreamingBubble = () => {
    if (streamingBubble) { streamingBubble.classList.remove("streaming"); streamingBubble = null; }
  };

  try {
    const res = await fetch(`/api/projects/${currentProject.id}/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    if (!res.ok || !res.body) throw new Error((await res.json().catch(() => ({}))).error ?? res.statusText);

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
        case "assistant_message": finishStreamingBubble(); break;
        case "thinking_start": setStatus("busy", "l'agent réfléchit…"); break;
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
          addChip(event.ok ? "✓ build vérifié" : "⚠ erreurs de build détectées", event.ok ? "done" : "info");
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
        case "turn_end": finishStreamingBubble(); break;
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
      } catch { /* fragment ignoré */ }
    }
  }
}

/* — Onglets espace de travail — */

$$(".tab").forEach((btn) => {
  btn.onclick = () => {
    $$(".tab").forEach((b) => b.classList.remove("active"));
    $$(".tab-pane").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    $(`#tab-${btn.dataset.tab}`).classList.add("active");
    if (btn.dataset.tab === "code") renderFiles().catch(console.error);
    if (btn.dataset.tab === "history") renderSnapshots().catch(console.error);
  };
});

/* — Preview — */

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
  } catch { /* pas de preview */ }
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
  if (previewUrl && !frame.classList.contains("hidden")) frame.src = previewUrl + "?t=" + Date.now();
}
$("#reload-preview").onclick = reloadPreview;

/* — Code — */

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

/* — Historique de versions — */

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

/* — Utilitaires — */

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

renderHome().catch(console.error);
