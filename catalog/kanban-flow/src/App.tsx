import { useState } from "react";

interface Task { id: number; title: string; label: string; color: string }
type Board = Record<string, Task[]>;

const initial: Board = {
  "To do": [
    { id: 1, title: "Rewrite onboarding email", label: "Marketing", color: "#f59e0b" },
    { id: 2, title: "Fix flaky signup test", label: "Bug", color: "#ef4444" },
    { id: 3, title: "Draft Q3 roadmap", label: "Planning", color: "#8b5cf6" },
  ],
  "In progress": [
    { id: 4, title: "Billing page redesign", label: "Design", color: "#ec4899" },
    { id: 5, title: "Migrate to Postgres 17", label: "Infra", color: "#06b6d4" },
  ],
  "Review": [{ id: 6, title: "Dark mode PR #482", label: "Frontend", color: "#3b82f6" }],
  "Done": [
    { id: 7, title: "SSO for enterprise", label: "Backend", color: "#22c55e" },
    { id: 8, title: "June retro notes", label: "Team", color: "#a3a3a3" },
  ],
};

export default function App() {
  const [board, setBoard] = useState(initial);
  const columns = Object.keys(board);

  const move = (task: Task, from: string, direction: 1 | -1) => {
    const target = columns[columns.indexOf(from) + direction];
    if (!target) return;
    setBoard((b) => ({
      ...b,
      [from]: b[from].filter((t) => t.id !== task.id),
      [target]: [...b[target], task],
    }));
  };

  return (
    <div className="min-h-screen bg-[#101c3a] font-sans text-slate-100">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-bold">📋 Kanban Flow <span className="ml-2 text-sm font-normal text-slate-400">/ Product board</span></h1>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {["#f472b6", "#38bdf8", "#4ade80"].map((c) => <span key={c} className="h-7 w-7 rounded-full border-2 border-[#101c3a]" style={{ background: c }} />)}
          </div>
          <button className="rounded-lg bg-blue-500 px-4 py-1.5 text-sm font-semibold">+ Task</button>
        </div>
      </header>

      <main className="grid gap-4 overflow-x-auto p-6 md:grid-cols-4">
        {columns.map((col) => (
          <section key={col} className="rounded-xl bg-[#0b1430] p-3">
            <h2 className="mb-3 flex justify-between px-1 text-sm font-semibold text-slate-300">
              {col} <span className="text-slate-500">{board[col].length}</span>
            </h2>
            <div className="space-y-2.5">
              {board[col].map((t) => (
                <article key={t.id} className="group rounded-lg border border-slate-800 bg-[#101c3a] p-3.5">
                  <span className="rounded px-2 py-0.5 text-[10px] font-bold text-slate-900" style={{ background: t.color }}>{t.label}</span>
                  <p className="mt-2 text-sm font-medium">{t.title}</p>
                  <div className="mt-2 flex justify-end gap-1 opacity-0 transition group-hover:opacity-100">
                    <button onClick={() => move(t, col, -1)} className="rounded bg-slate-800 px-2 text-xs">←</button>
                    <button onClick={() => move(t, col, 1)} className="rounded bg-slate-800 px-2 text-xs">→</button>
                  </div>
                </article>
              ))}
              {board[col].length === 0 && <p className="px-1 py-4 text-center text-xs text-slate-600">Nothing here</p>}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
