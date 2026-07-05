const calendar = [
  { round: "R5", date: "19–20 JUL", track: "Spa-Francorchamps 🇧🇪", series: "GT Cup Europe" },
  { round: "R6", date: "09–10 AUG", track: "Hockenheimring 🇩🇪", series: "GT Cup Europe" },
  { round: "R7", date: "06–07 SEP", track: "Circuit Paul Ricard 🇫🇷", series: "Endurance 6H" },
];

const results = [
  { pos: "P1", event: "Misano — Course 2", note: "Victoire + meilleur tour" },
  { pos: "P3", event: "Brno — Course 1", note: "Podium sous la pluie" },
  { pos: "P2", event: "Slovakiaring — Course 2", note: "Remontée de P11" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-neutral-100">
      <header className="flex items-center justify-between px-8 py-5 text-sm uppercase tracking-[0.2em]">
        <span className="text-lg font-black italic">DESTINATION<span className="text-red-600">RACING</span></span>
        <nav className="hidden gap-7 text-neutral-400 md:flex">
          <a href="#team" className="hover:text-white">Équipe</a>
          <a href="#calendar" className="hover:text-white">Calendrier</a>
          <a href="#drive" className="hover:text-white">Roulez avec nous</a>
        </nav>
      </header>

      <section className="relative overflow-hidden px-8 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent,transparent_60px,#dc262608_60px,#dc262608_62px)]" />
        <p className="text-xs uppercase tracking-[0.4em] text-red-500">Écurie GT — saison 2026</p>
        <h1 className="mt-4 max-w-4xl text-7xl font-black uppercase italic leading-[0.95] tracking-tight md:text-8xl">
          Chaque dixième<br />se <span className="text-red-600">mérite</span>.
        </h1>
        <p className="mt-6 max-w-md text-neutral-400">
          Deux GT4, un camion-atelier, et une obsession : transformer des gentlemen drivers en pilotes qui font peur aux pros.
        </p>
        <div className="mt-8 flex gap-3">
          <a href="#drive" className="bg-red-600 px-7 py-3 font-black uppercase italic">Réserver un roulage</a>
          <a href="#calendar" className="border border-neutral-700 px-7 py-3 font-black uppercase italic text-neutral-300">Calendrier</a>
        </div>
      </section>

      <section className="grid gap-px bg-neutral-900 md:grid-cols-3">
        {results.map((r) => (
          <div key={r.event} className="bg-[#0a0a0a] p-8">
            <div className="text-5xl font-black italic text-red-600">{r.pos}</div>
            <p className="mt-2 font-bold uppercase">{r.event}</p>
            <p className="text-sm text-neutral-500">{r.note}</p>
          </div>
        ))}
      </section>

      <section id="calendar" className="px-8 py-16">
        <h2 className="mb-8 text-3xl font-black uppercase italic">Prochaines courses</h2>
        <div className="divide-y divide-neutral-800 border-y border-neutral-800">
          {calendar.map((c) => (
            <div key={c.round} className="flex flex-wrap items-center gap-6 py-5">
              <span className="w-12 text-2xl font-black italic text-red-600">{c.round}</span>
              <span className="w-28 font-mono text-neutral-400">{c.date}</span>
              <span className="flex-1 text-lg font-bold">{c.track}</span>
              <span className="text-sm uppercase tracking-widest text-neutral-500">{c.series}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="drive" className="bg-red-600 px-8 py-16 text-center">
        <h2 className="text-4xl font-black uppercase italic">Passez de spectateur à pilote</h2>
        <p className="mx-auto mt-3 max-w-lg text-red-100">
          Journées coaching, location à l'arrivée, saison complète avec ingénieur dédié — programme sur mesure selon votre niveau.
        </p>
        <a href="mailto:contact@destination.racing" className="mt-7 inline-block bg-black px-8 py-3 font-black uppercase italic">
          Demander le programme
        </a>
      </section>

      <footer id="team" className="px-8 py-8 text-sm text-neutral-600">
        Destination Racing — paddock 14, circuit de Magny-Cours · contact@destination.racing
      </footer>
    </div>
  );
}
