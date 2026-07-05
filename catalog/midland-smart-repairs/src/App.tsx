import { useState } from "react";

const services = [
  { icon: "🚪", title: "Rayures & éraflures", body: "Portières, pare-chocs, ailes — réparation localisée, teinte exacte." },
  { icon: "🛞", title: "Jantes alu", body: "Frottées contre un trottoir ? Reprise et vernis, comme neuves." },
  { icon: "🔨", title: "Débosselage sans peinture", body: "Coups de portière et impacts de grêle, sans passage en carrosserie." },
  { icon: "🪟", title: "Impacts de pare-brise", body: "Injection de résine avant que ça fissure — 30 minutes." },
];

export default function App() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <div className="bg-blue-900 px-4 py-2 text-center text-sm font-semibold text-white">
        📱 Devis par photo en 2 h — 07 00 000 000 · Intervention à domicile dans tout le Midlands
      </div>
      <header className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
        <span className="text-xl font-black text-blue-900">MIDLAND <span className="text-orange-500">SMART</span> REPAIRS</span>
        <nav className="hidden gap-6 text-sm font-semibold text-slate-600 md:flex">
          <a href="#services" className="hover:text-blue-900">Services</a>
          <a href="#avis" className="hover:text-blue-900">Avis</a>
          <a href="#devis" className="hover:text-blue-900">Devis</a>
        </nav>
        <a href="#devis" className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-black text-white">DEVIS GRATUIT</a>
      </header>

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 px-8 py-20 text-white">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-5xl font-black leading-[1.05]">
              La carrosserie vient<br /><span className="text-orange-400">à vous</span>.
            </h1>
            <p className="mt-5 max-w-md text-blue-100">
              Réparations SMART (Small to Medium Area Repair Technology) à domicile ou au travail :
              moins cher qu'une carrosserie, fini dans la journée, garanti 3 ans.
            </p>
            <ul className="mt-6 space-y-2 text-sm font-semibold">
              <li>✅ Sans avance de franchise ni paperasse assurance</li>
              <li>✅ Teinte constructeur préparée sur place</li>
              <li>✅ Note moyenne 4,9/5 sur 800+ interventions</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
            <h2 className="text-lg font-black text-blue-900">Devis photo en 2 h</h2>
            {sent ? (
              <p className="mt-6 rounded-xl bg-emerald-50 p-5 font-semibold text-emerald-700">
                ✓ Bien reçu ! On vous rappelle avec un prix ferme avant ce soir.
              </p>
            ) : (
              <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <input required placeholder="Votre nom" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-700" />
                <input required placeholder="Téléphone" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-700" />
                <input placeholder="Immatriculation (optionnel)" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-700" />
                <label className="block cursor-pointer rounded-lg border-2 border-dashed border-slate-300 px-4 py-4 text-center text-sm text-slate-500 hover:border-orange-400">
                  📷 Ajouter des photos du dégât
                </label>
                <button className="w-full rounded-lg bg-orange-500 py-3 font-black text-white">RECEVOIR MON DEVIS</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-5xl px-8 py-16">
        <h2 className="text-center text-3xl font-black text-blue-900">Ce qu'on répare</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="avis" className="bg-white px-8 py-14">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {[
            ["« Rayure de parking sur ma portière — réparée devant chez moi en 3 h, invisible. Moitié du prix de la carrosserie. »", "Sarah W., Birmingham"],
            ["« Quatre jantes reprises pendant que je télétravaillais. Résultat impeccable, je recommande. »", "James P., Coventry"],
          ].map(([quote, who]) => (
            <blockquote key={who} className="rounded-2xl bg-slate-50 p-6">
              <p className="text-amber-500">★★★★★</p>
              <p className="mt-2 text-slate-700">{quote}</p>
              <footer className="mt-3 text-sm font-semibold text-slate-500">{who}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <footer id="devis" className="bg-blue-900 px-8 py-10 text-center text-blue-100">
        <p className="text-xl font-black text-white">MIDLAND SMART REPAIRS</p>
        <p className="mt-1 text-sm">Birmingham · Coventry · Wolverhampton — lun–sam 8h–18h · 07 00 000 000</p>
      </footer>
    </div>
  );
}
