const sticks = [
  { model: "5A Hickory", spec: "406 mm · 14,2 mm · olive bois", price: "13,90 €", tag: "Best-seller" },
  { model: "5B Precision", spec: "407 mm · 15,0 mm · olive bois", price: "14,90 €", tag: "" },
  { model: "7A Jazz", spec: "394 mm · 13,4 mm · olive petite", price: "13,90 €", tag: "" },
  { model: "Rock XXL", spec: "419 mm · 16,5 mm · olive nylon", price: "15,90 €", tag: "Nouveau" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0c0a09] font-sans text-stone-100">
      <header className="flex items-center justify-between border-b border-stone-800 px-8 py-5">
        <span className="text-2xl font-black uppercase tracking-tight">Wincent</span>
        <nav className="hidden gap-7 text-sm uppercase tracking-widest text-stone-400 md:flex">
          <a href="#shop" className="hover:text-white">Boutique</a>
          <a href="#artists" className="hover:text-white">Artistes</a>
          <a href="#craft" className="hover:text-white">Fabrication</a>
        </nav>
        <button className="rounded bg-orange-600 px-4 py-2 text-sm font-black uppercase">Panier (0)</button>
      </header>

      <section className="relative overflow-hidden px-8 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#ea580c22,transparent_60%)]" />
        <p className="text-xs uppercase tracking-[0.5em] text-orange-500">Hickory sélectionné · tourné en Suède</p>
        <h1 className="mt-5 text-7xl font-black uppercase leading-[0.95] tracking-tight md:text-8xl">
          Frappe.<br /><span className="text-orange-500">Encore.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-stone-400">
          Des baguettes appariées au gramme et à la fréquence, jouées sur les plus grandes scènes depuis 1999.
        </p>
        <a href="#shop" className="mt-8 inline-block bg-orange-600 px-8 py-3.5 font-black uppercase">Voir la boutique</a>
      </section>

      <section id="shop" className="mx-auto max-w-5xl px-8 pb-16">
        <h2 className="mb-8 text-3xl font-black uppercase">Les classiques</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sticks.map((s) => (
            <article key={s.model} className="group rounded-xl border border-stone-800 bg-stone-950 p-5 hover:border-orange-700">
              <div className="relative grid h-36 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-stone-800 to-stone-900">
                <div className="flex rotate-45 gap-1.5">
                  <span className="h-40 w-2.5 rounded-full bg-gradient-to-b from-amber-200 to-amber-600" />
                  <span className="h-40 w-2.5 rounded-full bg-gradient-to-b from-amber-200 to-amber-600" />
                </div>
                {s.tag && <span className="absolute left-2 top-2 rounded bg-orange-600 px-2 py-0.5 text-[10px] font-black uppercase">{s.tag}</span>}
              </div>
              <h3 className="mt-4 font-black uppercase">{s.model}</h3>
              <p className="text-xs text-stone-500">{s.spec}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold text-orange-500">{s.price}</span>
                <button className="rounded border border-stone-700 px-3 py-1 text-xs font-bold uppercase group-hover:border-orange-600 group-hover:text-orange-500">Ajouter</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="craft" className="border-y border-stone-800 bg-stone-950 px-8 py-14 text-center">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-10">
          {[["±0,5 g", "tolérance d'appariement au poids"], ["100 %", "hickory américain premium"], ["3×", "contrôle de rectitude par paire"]].map(([v, l]) => (
            <div key={l}><div className="text-4xl font-black text-orange-500">{v}</div><p className="mt-1 text-sm text-stone-400">{l}</p></div>
          ))}
        </div>
      </section>

      <footer id="artists" className="px-8 py-10 text-center text-sm text-stone-600">
        WINCENT — joué par des batteurs de metal, jazz et session dans 40 pays · dealer@wincent.example
      </footer>
    </div>
  );
}
