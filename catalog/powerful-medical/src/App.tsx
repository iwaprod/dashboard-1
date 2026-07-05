const steps = [
  { n: "1", title: "Photographiez l'ECG", body: "Depuis n'importe quel électrocardiographe 12 dérivations, papier ou écran." },
  { n: "2", title: "L'IA interprète", body: "Détection des syndromes coronariens aigus, arythmies et troubles de conduction." },
  { n: "3", title: "Décidez plus vite", body: "Recommandations alignées sur les guidelines, directement au chevet du patient." },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#fff] font-sans text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-100 px-8 py-4">
        <span className="flex items-center gap-2 text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-600 text-white">♥</span> Powerful Medical
        </span>
        <nav className="hidden gap-7 text-sm text-slate-500 md:flex">
          <a href="#produit" className="hover:text-slate-900">Produit</a>
          <a href="#preuves" className="hover:text-slate-900">Études cliniques</a>
          <a href="#contact" className="hover:text-slate-900">Contact</a>
        </nav>
        <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">Demander une démo</button>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:items-center">
        <div>
          <span className="rounded-full bg-red-50 px-4 py-1 text-xs font-semibold text-red-700">DISPOSITIF MÉDICAL CERTIFIÉ · CLASSE IIb</span>
          <h1 className="mt-5 text-5xl font-extrabold leading-[1.08] tracking-tight">
            L'IA qui lit l'ECG comme un <span className="text-red-600">cardiologue</span>.
          </h1>
          <p className="mt-5 max-w-md text-lg text-slate-600">
            Aidez chaque médecin, du SAMU aux urgences, à détecter l'infarctus en secondes — pas en heures.
          </p>
          <div className="mt-7 flex gap-3">
            <button className="rounded-xl bg-red-600 px-7 py-3 font-semibold text-white">Demander une démo</button>
            <button className="rounded-xl border border-slate-300 px-7 py-3 font-semibold">Voir les études</button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Patient #4821 · 12 dérivations</span><span className="text-red-600">● analyse 4,2 s</span>
          </div>
          <svg viewBox="0 0 400 90" className="mt-4 w-full text-red-500">
            <path fill="none" stroke="currentColor" strokeWidth="2"
              d="M0,45 L40,45 50,45 55,20 60,70 65,45 120,45 130,45 135,18 140,72 145,45 200,45 210,45 215,22 220,68 225,45 280,45 290,45 295,19 300,71 305,45 400,45" />
          </svg>
          <div className="mt-4 rounded-xl bg-white p-4">
            <p className="text-sm font-bold text-red-700">⚠ Suspicion STEMI antérieur — confiance 96 %</p>
            <p className="mt-1 text-sm text-slate-500">Recommandation : activation salle de cathétérisme, aspirine, ECG de contrôle.</p>
          </div>
        </div>
      </section>

      <section id="produit" className="bg-slate-50 px-8 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">Du papier au diagnostic en trois gestes</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-red-600 font-bold text-white">{s.n}</span>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preuves" className="mx-auto grid max-w-4xl gap-8 px-8 py-16 text-center md:grid-cols-3">
        {[["38 %", "d'infarctus détectés en plus vs lecture seule"], ["4 s", "par interprétation complète"], ["120+", "hôpitaux utilisateurs en Europe"]].map(([v, l]) => (
          <div key={l}><div className="text-4xl font-extrabold text-red-600">{v}</div><p className="mt-1 text-sm text-slate-500">{l}</p></div>
        ))}
      </section>

      <footer id="contact" className="border-t border-slate-100 px-8 py-10 text-center text-sm text-slate-500">
        Powerful Medical — l'IA au service du cœur · clinical@powerful.example · Bratislava · usage réservé aux professionnels de santé
      </footer>
    </div>
  );
}
