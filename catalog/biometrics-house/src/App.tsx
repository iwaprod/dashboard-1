const solutions = [
  { icon: "🫆", title: "Empreinte digitale", body: "Lecteurs optiques et capacitifs pour le contrôle d'accès haute fréquence." },
  { icon: "👁", title: "Reconnaissance de l'iris", body: "Identification sans contact, fiable même avec gants et masques." },
  { icon: "🙂", title: "Reconnaissance faciale", body: "Terminaux anti-spoofing avec détection du vivant embarquée." },
  { icon: "🖐", title: "Réseau veineux", body: "Le niveau de sécurité maximal pour les zones critiques." },
];

const sectors = ["Banques", "Data centers", "Aéroports", "Laboratoires", "Industrie", "Administrations"];

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] font-sans text-slate-200">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="font-bold tracking-wide"><span className="text-cyan-400">◉</span> BIOMETRICS HOUSE</span>
        <nav className="hidden gap-7 text-sm text-slate-400 md:flex">
          <a href="#solutions" className="hover:text-white">Solutions</a>
          <a href="#secteurs" className="hover:text-white">Secteurs</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <button className="rounded bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Audit gratuit</button>
      </header>

      <section className="relative px-8 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0e749022,transparent_65%)]" />
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">Intégrateur de solutions biométriques</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
          Votre identité est<br />la seule <span className="text-cyan-400">clé</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-slate-400">
          Nous concevons, installons et maintenons des systèmes d'identification biométrique
          pour les sites où « à peu près sûr » n'existe pas.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <button className="rounded bg-cyan-500 px-7 py-3 font-semibold text-slate-950">Parler à un expert</button>
          <button className="rounded border border-slate-700 px-7 py-3 font-semibold">Catalogue matériel</button>
        </div>
      </section>

      <section id="solutions" className="mx-auto grid max-w-5xl gap-5 px-8 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((s) => (
          <div key={s.title} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-cyan-700">
            <div className="text-3xl">{s.icon}</div>
            <h3 className="mt-3 font-bold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{s.body}</p>
          </div>
        ))}
      </section>

      <section id="secteurs" className="border-y border-slate-800 bg-slate-900/30 px-8 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-slate-500">Ils sécurisent leurs accès avec nous</p>
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((s) => (
              <span key={s} className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-8 px-8 py-16 text-center md:grid-cols-3">
        {[
          ["1 400+", "points d'accès déployés"],
          ["99,98 %", "taux de disponibilité constaté"],
          ["24/7", "maintenance et astreinte"],
        ].map(([v, l]) => (
          <div key={l}>
            <div className="text-4xl font-extrabold text-cyan-400">{v}</div>
            <div className="mt-1 text-sm text-slate-400">{l}</div>
          </div>
        ))}
      </section>

      <footer id="contact" className="border-t border-slate-800 px-8 py-10 text-center text-sm text-slate-500">
        BIOMETRICS HOUSE — étude, installation, maintenance · contact@biometrics.example
      </footer>
    </div>
  );
}
