const pillars = [
  { icon: "🧠", title: "Data engine", body: "Un profil client unifié en temps réel, socle de toutes vos décisions." },
  { icon: "🔎", title: "Recherche produit", body: "Un moteur de recherche e-commerce qui comprend l'intention, pas les mots-clés." },
  { icon: "✉️", title: "Marketing automation", body: "Emails, SMS et push orchestrés par le comportement de chaque visiteur." },
];

const logos = ["NORDIQ", "maison&co", "VELOCITY", "brightcart", "OPALE", "runlab"];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f1e] font-sans text-slate-100">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="text-lg font-bold">🌸 bloomreach</span>
        <nav className="hidden gap-7 text-sm text-slate-400 md:flex">
          <a href="#produits" className="hover:text-white">Plateforme</a>
          <a href="#clients" className="hover:text-white">Clients</a>
          <a href="#demo" className="hover:text-white">Ressources</a>
        </nav>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm">Connexion</button>
          <button className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold">Demander une démo</button>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-8 pb-14 pt-20 text-center">
        <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tight">
          Chaque visiteur mérite<br />
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">son propre magasin</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
          La plateforme qui unifie données clients, recherche produit et marketing automation
          pour personnaliser chaque page, chaque email, chaque instant.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <button className="rounded-xl bg-pink-500 px-7 py-3 font-semibold">Demander une démo</button>
          <button className="rounded-xl border border-slate-700 px-7 py-3 font-semibold">Visite guidée produit</button>
        </div>
      </section>

      <section id="clients" className="border-y border-slate-800 px-8 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-bold tracking-wide text-slate-600">
          {logos.map((l) => <span key={l}>{l}</span>)}
        </div>
      </section>

      <section id="produits" className="mx-auto grid max-w-5xl gap-5 px-8 py-16 md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7 hover:border-pink-500/50">
            <div className="text-3xl">{p.icon}</div>
            <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{p.body}</p>
            <p className="mt-4 text-sm font-semibold text-pink-400">En savoir plus →</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-[#1a1030] px-10 py-12 md:mx-8 lg:mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <blockquote className="max-w-xl">
            <p className="text-2xl font-medium leading-snug">« +28 % de revenu par visiteur en six mois. La personnalisation a cessé d'être un projet — c'est devenu notre façon de vendre. »</p>
            <footer className="mt-4 text-sm text-slate-400">Directrice e-commerce, enseigne mode européenne</footer>
          </blockquote>
          <div className="grid grid-cols-2 gap-6 text-center">
            {[["+28 %", "revenu / visiteur"], ["×3", "taux de conversion recherche"]].map(([v, l]) => (
              <div key={l}><div className="text-3xl font-extrabold text-pink-400">{v}</div><p className="text-xs text-slate-500">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      <footer id="demo" className="px-8 py-12 text-center text-sm text-slate-500">
        bloomreach — commerce personnalisé · démo sous 48 h · partners@bloom.example
      </footer>
    </div>
  );
}
