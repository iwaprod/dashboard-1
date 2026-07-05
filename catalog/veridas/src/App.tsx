const products = [
  { icon: "🪪", title: "Vérification de documents", body: "Contrôle d'authenticité de pièces d'identité de 190+ pays, en temps réel." },
  { icon: "🙂", title: "Biométrie faciale", body: "Comparaison selfie/document avec détection du vivant, sans friction." },
  { icon: "🎙", title: "Biométrie vocale", body: "Authentifiez un client en 3 secondes de voix, sur n'importe quel canal." },
];

const useCases = ["Ouverture de compte bancaire", "Souscription télécom", "Accès physique aux stades", "Paiement fort (SCA)", "Lutte contre la fraude"];

export default function App() {
  return (
    <div className="min-h-screen bg-[#12102a] font-sans text-violet-50">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="text-lg font-bold">veridas<span className="text-violet-400">.</span></span>
        <nav className="hidden gap-7 text-sm text-violet-200/70 md:flex">
          <a href="#produits" className="hover:text-white">Produits</a>
          <a href="#cas" className="hover:text-white">Cas d'usage</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <button className="rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold">Essayer la démo</button>
      </header>

      <section className="mx-auto max-w-4xl px-8 pb-16 pt-20 text-center">
        <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tight">
          Sachez <span className="bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">qui</span> est
          vraiment<br />de l'autre côté de l'écran.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-violet-200/70">
          Plateforme de vérification d'identité numérique : document, visage et voix,
          conformes aux exigences réglementaires les plus strictes.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <button className="rounded-full bg-violet-500 px-7 py-3 font-semibold">Vérifier une identité</button>
          <button className="rounded-full border border-violet-500/40 px-7 py-3 font-semibold text-violet-200">Parler aux ventes</button>
        </div>
        <div className="mx-auto mt-12 flex max-w-lg items-center justify-between rounded-2xl border border-violet-800/50 bg-violet-950/40 p-5 text-left">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-500/20 text-2xl">🪪</span>
            <div><p className="font-semibold">Identité vérifiée</p><p className="text-sm text-violet-300/60">document ✓ · visage ✓ · vivant ✓</p></div>
          </div>
          <span className="rounded-full bg-emerald-400/20 px-4 py-1.5 text-sm font-bold text-emerald-300">98,7 %</span>
        </div>
      </section>

      <section id="produits" className="mx-auto grid max-w-5xl gap-5 px-8 pb-16 md:grid-cols-3">
        {products.map((p) => (
          <div key={p.title} className="rounded-2xl border border-violet-800/50 bg-violet-950/40 p-7">
            <div className="text-3xl">{p.icon}</div>
            <h3 className="mt-3 font-bold">{p.title}</h3>
            <p className="mt-2 text-sm text-violet-200/60">{p.body}</p>
          </div>
        ))}
      </section>

      <section id="cas" className="border-y border-violet-800/40 bg-violet-950/20 px-8 py-12">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-violet-300/60">Cas d'usage</p>
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {useCases.map((u) => (
            <span key={u} className="rounded-full border border-violet-700/60 px-5 py-2 text-sm">{u}</span>
          ))}
        </div>
      </section>

      <footer id="contact" className="px-8 py-10 text-center text-sm text-violet-300/50">
        veridas — identité numérique de confiance · sales@veridas.example · Pamplona · Madrid · Mexico
      </footer>
    </div>
  );
}
