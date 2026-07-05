const menu = [
  { course: "Pour commencer", dishes: [
    { name: "Velouté de potimarron, noisettes brûlées", price: "12" },
    { name: "Œuf parfait, crème de morilles", price: "14" },
  ]},
  { course: "Plats", dishes: [
    { name: "Volaille fermière, jus corsé, panais", price: "26" },
    { name: "Lieu jaune, beurre blanc au yuzu", price: "28" },
    { name: "Risotto d'épeautre, champignons des bois", price: "22" },
  ]},
  { course: "Douceurs", dishes: [
    { name: "Paris-Brest de la maison", price: "11" },
    { name: "Poire pochée, glace verveine", price: "10" },
  ]},
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#231a12] text-[#f0e6d6]" style={{ fontFamily: "Georgia, serif" }}>
      <header className="px-8 pt-10 text-center">
        <p className="text-xs tracking-[0.5em] text-[#c8a878]">CUISINE DE SAISON — PARIS XI</p>
        <h1 className="mt-3 text-6xl italic">Bistro Lumière</h1>
        <nav className="mt-6 flex justify-center gap-8 text-sm tracking-widest text-[#b09976]">
          <a href="#menu" className="hover:text-[#f0e6d6]">LA CARTE</a>
          <a href="#reserver" className="hover:text-[#f0e6d6]">RÉSERVER</a>
          <a href="#acces" className="hover:text-[#f0e6d6]">ACCÈS</a>
        </nav>
      </header>

      <section className="mx-auto max-w-2xl px-8 py-16 text-center">
        <div className="mx-auto mb-10 h-px w-24 bg-[#c8a878]" />
        <p className="text-lg leading-relaxed text-[#d8c9ac]">
          Une petite salle, une carte courte qui change avec le marché, du feu, du beurre,
          et des vins de vignerons qu'on aime. Ouvert du mardi au samedi, midi et soir.
        </p>
      </section>

      <section id="menu" className="mx-auto max-w-2xl px-8 pb-16">
        {menu.map((section) => (
          <div key={section.course} className="mb-12">
            <h2 className="mb-6 text-center text-2xl italic text-[#c8a878]">{section.course}</h2>
            <ul className="space-y-4">
              {section.dishes.map((d) => (
                <li key={d.name} className="flex items-baseline gap-3">
                  <span>{d.name}</span>
                  <span className="flex-1 border-b border-dotted border-[#5a4832]" />
                  <span className="text-[#c8a878]">{d.price} €</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="reserver" className="bg-[#1a130d] px-8 py-14 text-center">
        <h2 className="text-3xl italic">Réserver une table</h2>
        <p className="mt-2 text-[#b09976]">42 couverts — pensez à réserver quelques jours à l'avance.</p>
        <form className="mx-auto mt-7 flex max-w-md flex-wrap justify-center gap-2" onSubmit={(e) => e.preventDefault()}>
          <input type="date" className="rounded border border-[#5a4832] bg-transparent px-3 py-2.5 text-[#f0e6d6]" />
          <select className="rounded border border-[#5a4832] bg-[#1a130d] px-3 py-2.5">
            {[2, 3, 4, 5, 6].map((n) => <option key={n}>{n} pers.</option>)}
          </select>
          <button className="rounded bg-[#c8a878] px-6 py-2.5 font-semibold text-[#231a12]">Réserver</button>
        </form>
      </section>

      <footer id="acces" className="px-8 py-8 text-center text-sm text-[#8f7a58]">
        17 rue de la Fontaine-au-Roi, 75011 Paris · 01 43 00 00 00 · mar–sam 12h–14h / 19h30–22h30
      </footer>
    </div>
  );
}
