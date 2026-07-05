const services = [
  { name: "API", uptime: "99.99%", ok: true },
  { name: "Web app", uptime: "99.97%", ok: true },
  { name: "Webhooks", uptime: "99.82%", ok: true },
  { name: "Email delivery", uptime: "98.94%", ok: false },
];

export default function App() {
  const allOk = services.every((s) => s.ok);
  return (
    <div className="min-h-screen bg-[#022c22] font-sans text-emerald-50">
      <main className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-10 flex items-center justify-between">
          <span className="font-bold">🛰 Statuswatch</span>
          <a href="#" className="text-sm text-emerald-300/70 hover:text-white">status history</a>
        </header>

        <div className={`rounded-2xl p-8 text-center ${allOk ? "bg-emerald-500/15 ring-1 ring-emerald-400/40" : "bg-amber-500/15 ring-1 ring-amber-400/40"}`}>
          <div className="text-5xl">{allOk ? "✅" : "⚠️"}</div>
          <h1 className="mt-3 text-3xl font-extrabold">{allOk ? "All systems operational" : "Degraded performance"}</h1>
          <p className="mt-2 text-sm text-emerald-200/70">Updated 47 seconds ago · next check in 15s</p>
        </div>

        <section className="mt-8 space-y-3">
          {services.map((s) => (
            <div key={s.name} className="rounded-xl border border-emerald-800/60 bg-emerald-950/40 p-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{s.name}</span>
                <span className={`text-sm font-medium ${s.ok ? "text-emerald-400" : "text-amber-400"}`}>
                  {s.ok ? "● Operational" : "● Degraded"}
                </span>
              </div>
              <div className="mt-3 flex gap-[2px]">
                {Array.from({ length: 90 }).map((_, i) => (
                  <span key={i} className={`h-7 flex-1 rounded-[2px] ${!s.ok && i > 84 ? "bg-amber-400" : i === 31 ? "bg-rose-500" : "bg-emerald-500/85"}`} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-emerald-300/50">
                <span>90 days ago</span><span>{s.uptime} uptime</span><span>today</span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-300/70">Past incidents</h2>
          <div className="rounded-xl border border-emerald-800/60 bg-emerald-950/40 p-5 text-sm">
            <p className="font-semibold text-amber-300">Email delivery delays — investigating</p>
            <p className="mt-1 text-emerald-200/70">Jul 4, 17:42 UTC — Our provider reports elevated queue times. Transactional email may arrive with up to 10 min delay.</p>
          </div>
        </section>

        <footer className="mt-12 text-center text-xs text-emerald-300/50">Powered by Statuswatch — subscribe via RSS or webhook</footer>
      </main>
    </div>
  );
}
