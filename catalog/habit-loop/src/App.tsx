import { useState } from "react";

const initialHabits = [
  { id: 1, name: "Lecture 20 min", emoji: "📖", streak: 21, week: [1, 1, 1, 0, 1, 1, 1] },
  { id: 2, name: "Course à pied", emoji: "🏃", streak: 5, week: [1, 0, 1, 0, 1, 1, 0] },
  { id: 3, name: "Sans écran après 22h", emoji: "🌙", streak: 12, week: [1, 1, 0, 1, 1, 1, 1] },
  { id: 4, name: "Écrire 3 lignes", emoji: "✍️", streak: 34, week: [1, 1, 1, 1, 1, 1, 1] },
];

const days = ["L", "M", "M", "J", "V", "S", "D"];

export default function App() {
  const [habits, setHabits] = useState(initialHabits);
  const toggle = (id: number, day: number) =>
    setHabits((hs) => hs.map((h) => (h.id === id ? { ...h, week: h.week.map((v, i) => (i === day ? 1 - v : v)) } : h)));

  const doneToday = habits.filter((h) => h.week[6] === 1).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4c1d95] to-[#2e1065] font-sans text-purple-50">
      <main className="mx-auto max-w-xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">Habit Loop</h1>
          <p className="mt-1 text-purple-300">Dimanche 4 juillet — {doneToday}/{habits.length} fait aujourd'hui</p>
          <div className="mt-4 h-2.5 rounded-full bg-purple-900/60">
            <div className="h-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-300 transition-all" style={{ width: `${(doneToday / habits.length) * 100}%` }} />
          </div>
        </header>

        <section className="space-y-4">
          {habits.map((h) => (
            <div key={h.id} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-3 font-semibold"><span className="text-2xl">{h.emoji}</span>{h.name}</span>
                <span className="rounded-full bg-fuchsia-500/25 px-3 py-1 text-sm font-bold text-fuchsia-200">🔥 {h.streak} j</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {h.week.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => toggle(h.id, i)}
                    className={`flex h-11 flex-col items-center justify-center rounded-xl text-xs font-bold transition ${
                      v ? "bg-fuchsia-400 text-purple-950" : "bg-purple-900/50 text-purple-400 hover:bg-purple-800/60"
                    }`}
                  >
                    {days[i]}
                    <span>{v ? "✓" : "·"}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <button className="mt-6 w-full rounded-2xl border-2 border-dashed border-purple-400/50 py-3.5 font-semibold text-purple-300 hover:bg-white/5">
          + Nouvelle habitude
        </button>
      </main>
    </div>
  );
}
