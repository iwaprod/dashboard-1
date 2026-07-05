const drops = [
  { name: "Hoodie « Chaos Mode »", price: "49,99 €", tag: "HOT", tone: "linear-gradient(140deg,#7c3aed,#db2777)" },
  { name: "Chaussettes logo (x3)", price: "19,99 €", tag: "", tone: "linear-gradient(140deg,#db2777,#f59e0b)" },
  { name: "Tee « No Thoughts »", price: "29,99 €", tag: "RESTOCK", tone: "linear-gradient(140deg,#4c1d95,#7c3aed)" },
  { name: "Tapis de souris XXL", price: "34,99 €", tag: "", tone: "linear-gradient(140deg,#0ea5e9,#7c3aed)" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#17102b] font-sans text-purple-50">
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 px-4 py-2 text-center text-sm font-black text-white">
        🔥 DROP D'ÉTÉ EN LIGNE — LIVRAISON OFFERTE DÈS 50 € 🔥
      </div>
      <header className="flex items-center justify-between px-8 py-5">
        <span className="text-2xl font-black italic tracking-tight">SOCKS<span className="text-pink-500">FOR1</span></span>
        <nav className="hidden gap-7 text-sm font-bold uppercase text-purple-300 md:flex">
          <a href="#drop" className="hover:text-white">Le drop</a>
          <a href="#videos" className="hover:text-white">Vidéos</a>
          <a href="#discord" className="hover:text-white">Discord</a>
        </nav>
        <button className="rounded-full bg-pink-500 px-5 py-2 text-sm font-black">🛒 (0)</button>
      </header>

      <section className="relative overflow-hidden px-8 py-20 text-center">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-purple-600 opacity-30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-pink-500 opacity-30 blur-[100px]" />
        <p className="text-sm font-black uppercase tracking-[0.3em] text-pink-400">Boutique officielle</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-7xl font-black italic leading-[0.95] tracking-tight">
          PORTE LE<br /><span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">CHAOS</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-purple-200/80">
          Le merch pensé par la commu, pour la commu. Éditions limitées — quand c'est parti, c'est parti.
        </p>
        <a href="#drop" className="mt-8 inline-block rounded-full bg-pink-500 px-9 py-4 text-lg font-black">VOIR LE DROP ↓</a>
      </section>

      <section id="drop" className="mx-auto max-w-5xl px-8 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {drops.map((d) => (
            <article key={d.name} className="group cursor-pointer">
              <div className="relative grid h-56 place-items-center overflow-hidden rounded-2xl text-6xl transition-transform group-hover:-rotate-2 group-hover:scale-105" style={{ background: d.tone }}>
                🧦
                {d.tag && <span className="absolute right-2 top-2 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-purple-950">{d.tag}</span>}
              </div>
              <h3 className="mt-3 font-black">{d.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-pink-400">{d.price}</span>
                <button className="rounded-full bg-purple-800 px-4 py-1 text-xs font-black group-hover:bg-pink-500">AJOUTER</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="discord" className="border-t border-purple-800/50 px-8 py-14 text-center">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-10">
          {[["4,2 M", "abonnés"], ["800 k", "membres Discord"], ["120+", "vidéos par an"]].map(([v, l]) => (
            <div key={l}><div className="text-4xl font-black text-pink-400">{v}</div><p className="text-sm text-purple-300/70">{l}</p></div>
          ))}
        </div>
        <button className="mt-8 rounded-full bg-[#5865F2] px-8 py-3.5 font-black">Rejoindre le Discord →</button>
      </section>

      <footer id="videos" className="px-8 py-8 text-center text-sm text-purple-400/60">
        SOCKSFOR1 STORE — expédié sous 48 h · support@socks.example · pas de remboursement sur les éditions limitées, désolé pas désolé
      </footer>
    </div>
  );
}
