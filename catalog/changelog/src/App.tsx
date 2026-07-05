const releases = [
  {
    version: "v2.4.0", date: "June 28, 2026", tag: "NEW",
    items: ["Realtime collaboration on boards", "Export to PDF and PNG", "Keyboard palette (⌘K) everywhere"],
  },
  {
    version: "v2.3.2", date: "June 14, 2026", tag: "FIX",
    items: ["Fixed drag ghost on Safari", "Webhooks retry with exponential backoff"],
  },
  {
    version: "v2.3.0", date: "May 30, 2026", tag: "NEW",
    items: ["Public API (beta)", "Granular member permissions", "Dark mode refinements"],
  },
];

const tagColor: Record<string, string> = { NEW: "bg-emerald-500", FIX: "bg-amber-500", BREAKING: "bg-rose-500" };

export default function App() {
  return (
    <div className="min-h-screen bg-[#052e16] font-sans text-emerald-50">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8">
        <span className="font-bold">🌱 Sprout</span>
        <nav className="flex gap-5 text-sm text-emerald-300/70">
          <a href="#" className="hover:text-white">Product</a>
          <a href="#" className="text-white">Changelog</a>
          <a href="#" className="hover:text-white">Roadmap</a>
        </nav>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-20">
        <h1 className="text-4xl font-extrabold tracking-tight">Changelog</h1>
        <p className="mt-2 text-emerald-300/70">Everything we ship, as we ship it.</p>
        <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="you@email.com" className="flex-1 rounded-lg border border-emerald-800 bg-emerald-950/50 px-4 py-2 text-sm outline-none placeholder:text-emerald-500/60" />
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950">Subscribe</button>
        </form>

        <ol className="relative mt-12 space-y-12 border-l border-emerald-800/60 pl-8">
          {releases.map((r) => (
            <li key={r.version} className="relative">
              <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-[#052e16]" />
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-xl font-bold text-white">{r.version}</h2>
                <span className={`rounded px-2 py-0.5 text-[10px] font-black text-emerald-950 ${tagColor[r.tag]}`}>{r.tag}</span>
                <span className="text-sm text-emerald-300/60">{r.date}</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-emerald-100/85">
                {r.items.map((item) => <li key={item}>— {item}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
