const classes = [
  { time: "07:00", name: "Strength Foundations", coach: "Maya", spots: 4 },
  { time: "12:15", name: "Lunch Burn — 45'", coach: "Ibra", spots: 9 },
  { time: "18:30", name: "Hyrox Prep", coach: "Léo", spots: 0 },
  { time: "20:00", name: "Mobility & Breath", coach: "Maya", spots: 12 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="text-2xl font-black italic tracking-tighter">FORM<span className="text-red-600">.</span></span>
        <nav className="hidden gap-8 text-sm font-semibold uppercase tracking-wider text-zinc-400 md:flex">
          <a href="#planning" className="hover:text-white">Planning</a>
          <a href="#coachs" className="hover:text-white">Coachs</a>
          <a href="#tarifs" className="hover:text-white">Tarifs</a>
        </nav>
        <button className="bg-red-600 px-5 py-2 text-sm font-black uppercase">Essai gratuit</button>
      </header>

      <section className="relative overflow-hidden px-8 py-24">
        <div className="pointer-events-none absolute -right-16 top-0 select-none text-[26vw] font-black leading-none text-zinc-900">01</div>
        <h1 className="relative max-w-3xl text-7xl font-black uppercase italic leading-[0.95] tracking-tight">
          Le corps suit<br />la <span className="text-red-600">discipline</span>.
        </h1>
        <p className="relative mt-6 max-w-md text-zinc-400">
          Salle de force et de conditionnement à Marseille. Coaching en petit groupe, programmation sérieuse, zéro miroir-selfie.
        </p>
        <div className="relative mt-8 flex gap-3">
          <button className="bg-red-600 px-7 py-3 font-black uppercase">Commencer</button>
          <button className="border border-zinc-700 px-7 py-3 font-black uppercase text-zinc-300">Voir la salle</button>
        </div>
      </section>

      <section id="planning" className="border-t border-zinc-800 px-8 py-16">
        <h2 className="mb-8 text-3xl font-black uppercase italic">Aujourd'hui</h2>
        <div className="divide-y divide-zinc-800 border-y border-zinc-800">
          {classes.map((c) => (
            <div key={c.time + c.name} className="flex flex-wrap items-center gap-4 py-5">
              <span className="w-16 font-mono text-lg text-red-500">{c.time}</span>
              <div className="flex-1">
                <p className="font-bold uppercase">{c.name}</p>
                <p className="text-sm text-zinc-500">Coach {c.coach}</p>
              </div>
              {c.spots === 0 ? (
                <span className="text-sm font-bold uppercase text-zinc-600">Complet</span>
              ) : (
                <button className="border border-red-600 px-4 py-1.5 text-sm font-bold uppercase text-red-500 hover:bg-red-600 hover:text-white">
                  {c.spots} places
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="tarifs" className="grid gap-px border-t border-zinc-800 bg-zinc-800 md:grid-cols-3">
        {[
          { name: "Drop-in", price: "18€", note: "la séance" },
          { name: "Membre", price: "89€", note: "par mois, sans engagement", hot: true },
          { name: "Athlète", price: "129€", note: "illimité + programmation perso" },
        ].map((p) => (
          <div key={p.name} className={`p-10 ${p.hot ? "bg-red-600" : "bg-zinc-950"}`}>
            <h3 className="font-black uppercase">{p.name}</h3>
            <p className="mt-3 text-5xl font-black">{p.price}</p>
            <p className={`mt-1 text-sm ${p.hot ? "text-red-100" : "text-zinc-500"}`}>{p.note}</p>
          </div>
        ))}
      </section>

      <footer className="px-8 py-8 text-sm text-zinc-600">FORM. — 12 traverse des Docks, Marseille · lun–dim 6h–23h</footer>
    </div>
  );
}
