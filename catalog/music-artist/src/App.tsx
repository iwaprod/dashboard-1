const dates = [
  { date: "12 SEP", city: "Paris — Olympia", status: "Complet" },
  { date: "18 SEP", city: "Lyon — Transbordeur", status: "Billets" },
  { date: "25 SEP", city: "Bruxelles — AB", status: "Billets" },
  { date: "02 OCT", city: "Genève — Usine", status: "Billets" },
];

const releases = [
  { title: "Éclipse", year: "2026", kind: "ALBUM", tone: "linear-gradient(140deg,#e11d48,#7c3aed)" },
  { title: "Nuit Blanche", year: "2024", kind: "EP", tone: "linear-gradient(140deg,#2e1065,#db2777)" },
  { title: "Fragments", year: "2023", kind: "SINGLE", tone: "linear-gradient(140deg,#0f172a,#e11d48)" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0c0612] font-sans text-fuchsia-50">
      <header className="flex items-center justify-between px-8 py-6 text-sm uppercase tracking-[0.25em]">
        <span className="font-black">NOVAE</span>
        <nav className="flex gap-7 text-fuchsia-300/60">
          <a href="#tour" className="hover:text-white">Tour</a>
          <a href="#music" className="hover:text-white">Musique</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      <section className="relative overflow-hidden px-8 py-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#7c3aed44,transparent_60%)]" />
        <p className="relative text-xs uppercase tracking-[0.5em] a text-fuchsia-300/70">Nouvel album — Éclipse</p>
        <h1 className="relative mt-4 bg-gradient-to-r from-fuchsia-300 via-rose-300 to-violet-300 bg-clip-text text-[16vw] font-black leading-none tracking-tighter text-transparent md:text-9xl">
          NOVAE
        </h1>
        <div className="relative mt-8 flex justify-center gap-3">
          <button className="rounded-full bg-fuchsia-500 px-7 py-3 font-bold">▶ Écouter</button>
          <button className="rounded-full border border-fuchsia-500/50 px-7 py-3 font-bold text-fuchsia-200">Voir le clip</button>
        </div>
      </section>

      <section id="music" className="mx-auto max-w-4xl px-8 pb-20">
        <h2 className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-fuchsia-300/60">Discographie</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {releases.map((r) => (
            <article key={r.title} className="group cursor-pointer">
              <div className="grid h-52 place-items-center rounded-2xl text-4xl transition-transform group-hover:scale-[1.03]" style={{ background: r.tone }}>♪</div>
              <p className="mt-3 font-bold">{r.title}</p>
              <p className="text-xs uppercase tracking-widest text-fuchsia-300/50">{r.kind} · {r.year}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="tour" className="border-t border-fuchsia-900/40 px-8 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-fuchsia-300/60">Tournée 2026</h2>
          <ul className="divide-y divide-fuchsia-900/40">
            {dates.map((d) => (
              <li key={d.city} className="flex items-center gap-6 py-4">
                <span className="w-16 font-mono text-fuchsia-400">{d.date}</span>
                <span className="flex-1 font-semibold">{d.city}</span>
                {d.status === "Complet" ? (
                  <span className="text-sm uppercase text-fuchsia-300/40">Complet</span>
                ) : (
                  <button className="rounded-full border border-fuchsia-500 px-5 py-1.5 text-sm font-bold text-fuchsia-300 hover:bg-fuchsia-500 hover:text-white">Billets</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer id="contact" className="px-8 py-8 text-center text-xs uppercase tracking-[0.25em] text-fuchsia-300/40">
        Booking — agent@novae.music · Presse — presse@novae.music
      </footer>
    </div>
  );
}
