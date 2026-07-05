const pipeline: Record<string, { company: string; value: string; owner: string }[]> = {
  "New lead": [
    { company: "Brightloop", value: "€8k", owner: "SA" },
    { company: "Fjord Analytics", value: "€22k", owner: "ML" },
  ],
  "In discussion": [
    { company: "Nova Freight", value: "€14k", owner: "SA" },
    { company: "Papershift", value: "€6k", owner: "JD" },
    { company: "Kite Health", value: "€31k", owner: "ML" },
  ],
  "Proposal sent": [{ company: "Delta Robotics", value: "€48k", owner: "JD" }],
  "Won 🎉": [
    { company: "Loom & Field", value: "€12k", owner: "SA" },
    { company: "Arcadia Labs", value: "€27k", owner: "ML" },
  ],
};

const ownerColor: Record<string, string> = { SA: "#38bdf8", ML: "#a78bfa", JD: "#fbbf24" };

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#0e1726] font-sans text-slate-200">
      <aside className="hidden w-56 flex-col border-r border-slate-800 bg-[#0b1220] p-5 md:flex">
        <div className="mb-8 flex items-center gap-2 text-lg font-bold text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-sky-500 text-sm">A</span> Atlas
        </div>
        <nav className="space-y-1 text-sm">
          {["Pipeline", "Contacts", "Companies", "Tasks", "Reports"].map((item, i) => (
            <a key={item} href="#" className={`block rounded-lg px-3 py-2 ${i === 0 ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/60"}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400">
          Q3 target<br /><span className="text-lg font-bold text-white">€120k</span> / €200k
          <div className="mt-2 h-1.5 rounded-full bg-slate-800"><div className="h-1.5 w-3/5 rounded-full bg-sky-500" /></div>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto p-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Pipeline</h1>
            <p className="text-sm text-slate-500">8 deals · €168k in play</p>
          </div>
          <button className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white">+ New deal</button>
        </header>

        <div className="grid min-w-[900px] grid-cols-4 gap-4">
          {Object.entries(pipeline).map(([stage, deals]) => (
            <section key={stage} className="rounded-xl bg-slate-900/50 p-3">
              <h2 className="mb-3 flex items-center justify-between px-1 text-sm font-semibold text-slate-300">
                {stage} <span className="text-xs text-slate-500">{deals.length}</span>
              </h2>
              <div className="space-y-3">
                {deals.map((d) => (
                  <article key={d.company} className="cursor-pointer rounded-lg border border-slate-800 bg-[#0e1726] p-4 hover:border-sky-700">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-white">{d.company}</h3>
                      <span className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-slate-900" style={{ background: ownerColor[d.owner] }}>
                        {d.owner}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{d.value} · annual</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
