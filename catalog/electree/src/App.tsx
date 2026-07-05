const offers = [
  { title: "Copropriétés", body: "Bornes partagées avec facturation individuelle par badge.", icon: "🏢" },
  { title: "Entreprises", body: "Flottes et collaborateurs — supervision et rapports d'usage.", icon: "🚗" },
  { title: "Commerces & hôtels", body: "Attirez une clientèle qui recharge pendant qu'elle consomme.", icon: "🏨" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#052e16] font-sans text-emerald-50">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="text-lg font-bold">⚡ electree</span>
        <nav className="hidden gap-7 text-sm text-emerald-200/70 md:flex">
          <a href="#offres" className="hover:text-white">Solutions</a>
          <a href="#process" className="hover:text-white">Comment ça marche</a>
          <a href="#devis" className="hover:text-white">Devis</a>
        </nav>
        <button className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-bold text-emerald-950">Devis gratuit</button>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Bornes de recharge — installation & exploitation</p>
          <h1 className="mt-4 text-6xl font-extrabold leading-[1.03] tracking-tight">
            Rechargez là où<br />la vie <span className="text-emerald-400">stationne</span>.
          </h1>
          <p className="mt-5 max-w-md text-emerald-200/70">
            De l'étude électrique à la supervision 24/7 : nous installons et exploitons
            vos bornes AC et DC, sans investissement initial si vous le souhaitez.
          </p>
          <div className="mt-8 flex gap-3">
            <button className="rounded-xl bg-emerald-400 px-7 py-3 font-bold text-emerald-950">Étude gratuite</button>
            <button className="rounded-xl border border-emerald-700 px-7 py-3 font-bold text-emerald-100">Nos références</button>
          </div>
        </div>
        <div className="mx-auto w-64 rounded-[2rem] border border-emerald-700/60 bg-emerald-950/50 p-6 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-400 text-4xl text-emerald-950">⚡</div>
          <p className="mt-4 text-sm text-emerald-300/70">Borne #E-208 · Parking Riviéra</p>
          <p className="mt-3 text-5xl font-extrabold">67 %</p>
          <p className="text-sm text-emerald-300/70">42 min restantes · 22 kW</p>
          <div className="mt-4 h-2.5 rounded-full bg-emerald-900"><div className="h-2.5 w-2/3 rounded-full bg-emerald-400" /></div>
          <p className="mt-4 text-xs text-emerald-400">3,84 € — arrêt automatique à 80 %</p>
        </div>
      </section>

      <section id="offres" className="mx-auto grid max-w-5xl gap-5 px-8 pb-16 md:grid-cols-3">
        {offers.map((o) => (
          <div key={o.title} className="rounded-2xl border border-emerald-800/60 bg-emerald-950/40 p-7">
            <div className="text-3xl">{o.icon}</div>
            <h3 className="mt-3 font-bold">{o.title}</h3>
            <p className="mt-2 text-sm text-emerald-200/60">{o.body}</p>
          </div>
        ))}
      </section>

      <section id="process" className="border-t border-emerald-800/50 px-8 py-14">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-between gap-6 text-center">
          {[["01", "Étude sur site"], ["02", "Installation certifiée"], ["03", "Mise en service"], ["04", "Exploitation 24/7"]].map(([n, l]) => (
            <div key={n} className="min-w-32 flex-1">
              <div className="text-3xl font-extrabold text-emerald-400">{n}</div>
              <p className="mt-1 text-sm text-emerald-200/70">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="devis" className="bg-emerald-400 px-8 py-12 text-center text-emerald-950">
        <h2 className="text-3xl font-extrabold">Votre parking peut rapporter.</h2>
        <p className="mt-1 font-medium">Étude de faisabilité gratuite sous 48 h.</p>
        <button className="mt-5 rounded-xl bg-emerald-950 px-8 py-3 font-bold text-emerald-50">Demander un devis</button>
      </footer>
    </div>
  );
}
