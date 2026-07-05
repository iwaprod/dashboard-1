const spaces = [
  { icon: "🏢", title: "Bureaux flexibles", body: "Des plateaux prêts à l'emploi, du poste unique à l'étage entier." },
  { icon: "🤝", title: "Salles de réunion", body: "Réservation par reconnaissance faciale, équipement visio intégré." },
  { icon: "🎤", title: "Espaces événementiels", body: "Auditorium et rooftop pour vos lancements et conférences." },
];

const amenities = ["Bistro", "Parc paysager", "Zones zen", "Terrasses", "Espaces collaboratifs", "Parking connecté"];

export default function App() {
  return (
    <div className="min-h-screen bg-[#060b12] font-sans text-slate-200">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="font-bold tracking-wide"><span className="text-cyan-400">◉</span> BIOMETRICS HOUSE</span>
        <nav className="hidden gap-7 text-sm text-slate-400 md:flex">
          <a href="#building" className="hover:text-white">Le bâtiment</a>
          <a href="#spaces" className="hover:text-white">Espaces à louer</a>
          <a href="#visit" className="hover:text-white">Visiter</a>
        </nav>
        <button className="rounded bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Réserver une visite</button>
      </header>

      <section className="relative px-8 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0e749026,transparent_60%)]" />
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">Bratislava · siège mondial d'un leader de la biométrie</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
          Le bâtiment le plus<br /><span className="text-cyan-400">biométrique</span> du monde.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-slate-400">
          Un showroom vivant où la technologie s'expérimente au quotidien : on y entre d'un regard,
          on y travaille sans badge, et vu du ciel, le bâtiment dessine une empreinte digitale.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <button className="rounded bg-cyan-500 px-7 py-3 font-semibold text-slate-950">Louer un espace</button>
          <button className="rounded border border-slate-700 px-7 py-3 font-semibold">Visite guidée</button>
        </div>
      </section>

      <section id="building" className="border-y border-slate-800 bg-slate-900/30 px-8 py-14">
        <div className="mx-auto grid max-w-4xl gap-8 text-center md:grid-cols-3">
          {[
            ["👁", "Accès sans badge", "Reconnaissance faciale et d'empreintes à chaque porte — vos mains restent libres."],
            ["🌍", "Zéro gaz", "Géothermie et panneaux solaires alimentent l'ensemble du bâtiment."],
            ["🚉", "15 min du centre", "Accolé à la gare de Vinohrady, connexion directe aux transports publics."],
          ].map(([icon, title, body]) => (
            <div key={title as string}>
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-3 font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="spaces" className="mx-auto grid max-w-5xl gap-5 px-8 py-16 md:grid-cols-3">
        {spaces.map((s) => (
          <div key={s.title} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-cyan-700">
            <div className="text-3xl">{s.icon}</div>
            <h3 className="mt-3 font-bold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="px-8 pb-16">
        <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-slate-500">Inclus pour tous les résidents</p>
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {amenities.map((a) => (
            <span key={a} className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300">{a}</span>
          ))}
        </div>
      </section>

      <footer id="visit" className="border-t border-slate-800 px-8 py-10 text-center text-sm text-slate-500">
        BIOMETRICS HOUSE — un lieu de travail, un manifeste technologique · Bratislava · visites sur rendez-vous
      </footer>
    </div>
  );
}
