import { useMemo, useState } from "react";

const seed = [
  { id: 1, folder: "Ideas", title: "App: recipe from fridge photo", body: "Point the camera at your fridge, get 3 dinner ideas. Monetize via grocery partnerships?" },
  { id: 2, folder: "Ideas", title: "Essay — tools shape thought", body: "Notebooks vs apps. The medium quietly decides what we bother writing down." },
  { id: 3, folder: "Work", title: "1:1 with Sam — Thursday", body: "Ask about the migration timeline. Praise the incident writeup. Discuss conference budget." },
  { id: 4, folder: "Reading", title: "Quotes — The Craftsman", body: "\"Making is thinking.\" Skill = trained practice + curiosity about resistance." },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(1);
  const filtered = useMemo(
    () => seed.filter((n) => (n.title + n.body).toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const active = seed.find((n) => n.id === activeId) ?? filtered[0];

  return (
    <div className="flex min-h-screen bg-[#fffbeb] text-stone-800" style={{ fontFamily: "Georgia, serif" }}>
      <aside className="w-80 border-r border-amber-200 bg-[#fef7dd] p-5">
        <h1 className="mb-4 text-xl font-bold italic">Margins</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes…"
          className="mb-4 w-full rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        />
        <ul className="space-y-1">
          {filtered.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => setActiveId(n.id)}
                className={`w-full rounded-lg px-3 py-2.5 text-left ${active?.id === n.id ? "bg-amber-200/70" : "hover:bg-amber-100"}`}
              >
                <p className="text-[10px] uppercase tracking-widest text-amber-700">{n.folder}</p>
                <p className="truncate text-sm font-semibold">{n.title}</p>
                <p className="truncate text-xs text-stone-500">{n.body}</p>
              </button>
            </li>
          ))}
          {filtered.length === 0 && <p className="px-3 py-6 text-sm text-stone-400">No note matches “{query}”.</p>}
        </ul>
        <button className="mt-4 w-full rounded-lg border-2 border-dashed border-amber-400 py-2 text-sm text-amber-700 hover:bg-amber-100">+ New note</button>
      </aside>

      <main className="flex-1 p-10">
        {active && (
          <article className="mx-auto max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-700">{active.folder}</p>
            <h2 className="mt-2 text-4xl font-bold italic leading-tight">{active.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-700">{active.body}</p>
            <p className="mt-10 border-t border-amber-200 pt-4 text-xs text-stone-400">Edited today · 214 words · autosaved</p>
          </article>
        )}
      </main>
    </div>
  );
}
