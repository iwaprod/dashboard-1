import { useState } from "react";

const offers = [
  { icon: "⚡", title: "Électricité verte", body: "Courant issu de sources renouvelables, à prix transparent et fixe." },
  { icon: "🔥", title: "Gaz naturel", body: "Tarifs suivis mois par mois, sans frais cachés ni surprise à l'échéance." },
  { icon: "🛠", title: "Services du foyer", body: "Assistance dépannage, entretien chaudière et certificats énergétiques." },
  { icon: "☀️", title: "Solaire intelligent", body: "Pilotage et optimisation de vos panneaux photovoltaïques par IA." },
];

export default function App() {
  const [zip, setZip] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-white font-sans text-emerald-950">
      <div className="bg-emerald-900 px-4 py-1.5 text-center text-xs font-medium text-emerald-100">
        Plus de 260 000 foyers et entreprises nous font déjà confiance
      </div>
      <header className="flex items-center justify-between px-8 py-4 shadow-sm">
        <span className="text-2xl font-black lowercase text-emerald-600">elec<span className="text-emerald-900">tree</span></span>
        <nav className="hidden gap-7 text-sm font-medium text-emerald-900/70 md:flex">
          <a href="#offres" className="hover:text-emerald-950">Électricité</a>
          <a href="#offres" className="hover:text-emerald-950">Gaz</a>
          <a href="#solaire" className="hover:text-emerald-950">Solaire</a>
          <a href="#devis" className="hover:text-emerald-950">Espace client</a>
        </nav>
        <a href="#devis" className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-bold text-white">Changer d'offre</a>
      </header>

      <section className="bg-gradient-to-b from-emerald-50 to-white px-8 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Fournisseur d'énergie depuis 2002</p>
            <h1 className="mt-4 text-6xl font-black leading-[1.02] tracking-tight">
              L'énergie, en<br /><span className="text-emerald-600">toute clarté</span>.
            </h1>
            <p className="mt-5 max-w-md text-lg text-emerald-900/70">
              Électricité verte et gaz naturel pour les foyers et les entreprises —
              des contrats lisibles, un prix honnête, un service qui répond.
            </p>
            <ul className="mt-6 space-y-2 text-sm font-semibold text-emerald-800">
              <li>✔ Énergie achetée auprès de sources 100 % renouvelables</li>
              <li>✔ Changement de fournisseur pris en charge de A à Z</li>
              <li>✔ Sans engagement caché — résiliable simplement</li>
            </ul>
          </div>
          <div id="devis" className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-lg">
            <h2 className="text-xl font-black">Estimez votre mensualité</h2>
            {sent ? (
              <p className="mt-6 rounded-2xl bg-emerald-50 p-5 font-semibold text-emerald-700">
                ✓ Merci ! Votre estimation personnalisée arrive par email sous quelques minutes.
              </p>
            ) : (
              <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <select className="w-full rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500">
                  <option>Électricité</option><option>Gaz</option><option>Électricité + gaz</option>
                </select>
                <input value={zip} onChange={(e) => setZip(e.target.value)} required placeholder="Code postal"
                  className="w-full rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500" />
                <input required type="email" placeholder="Email"
                  className="w-full rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500" />
                <button className="w-full rounded-xl bg-emerald-600 py-3.5 font-black text-white">Voir mon tarif</button>
              </form>
            )}
            <p className="mt-3 text-center text-xs text-emerald-900/50">Sans engagement · réponse immédiate</p>
          </div>
        </div>
      </section>

      <section id="offres" className="mx-auto max-w-5xl px-8 py-16">
        <h2 className="text-center text-3xl font-black">Tout votre foyer, un seul fournisseur</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => (
            <div key={o.title} className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6">
              <div className="text-3xl">{o.icon}</div>
              <h3 className="mt-3 font-bold">{o.title}</h3>
              <p className="mt-1 text-sm text-emerald-900/60">{o.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="solaire" className="bg-emerald-950 px-8 py-14 text-center text-emerald-50">
        <h2 className="text-3xl font-black">Vos panneaux méritent un cerveau</h2>
        <p className="mx-auto mt-2 max-w-lg text-emerald-200/80">
          Notre plateforme connectée prédit la production, optimise l'autoconsommation
          et réduit la facture des installations photovoltaïques.
        </p>
        <button className="mt-6 rounded-full bg-emerald-400 px-8 py-3 font-black text-emerald-950">Découvrir le pilotage solaire</button>
      </section>

      <footer className="px-8 py-8 text-center text-sm text-emerald-900/50">
        electree — électricité & gaz verts · service client 7j/7 · Brno · Praha
      </footer>
    </div>
  );
}
