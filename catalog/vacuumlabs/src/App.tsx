const expertise = [
  { title: "Néobanques", body: "Du KYC au ledger : nous avons construit des banques entières, plusieurs fois." },
  { title: "Paiements", body: "Cartes, wallets, orchestration PSP — la plomberie qui n'a pas le droit de fuir." },
  { title: "Crypto & Web3", body: "Infrastructure d'échange et smart contracts audités, sans le folklore." },
  { title: "IA appliquée", body: "Des copilotes bancaires qui passent la conformité, pas des démos." },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#03060d] font-sans text-slate-200">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="font-mono text-lg font-bold">vacuum<span className="text-emerald-400">labs</span></span>
        <nav className="hidden gap-7 text-sm text-slate-400 md:flex">
          <a href="#expertise" className="hover:text-white">Expertise</a>
          <a href="#work" className="hover:text-white">Références</a>
          <a href="#careers" className="hover:text-white">Carrières</a>
        </nav>
        <button className="rounded border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-slate-950">
          Nous parler
        </button>
      </header>

      <section className="px-8 py-24">
        <p className="font-mono text-sm text-emerald-400">// fintech engineering, depuis 2012</p>
        <h1 className="mt-4 max-w-4xl text-6xl font-extrabold leading-[1.02] tracking-tight text-white md:text-7xl">
          Nous construisons la fintech<br />que votre banque <span className="text-emerald-400">vous envie</span>.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-slate-400">
          750+ ingénieurs produit qui ont livré des néobanques, des plateformes de paiement
          et des systèmes de trading pour des clients sur quatre continents.
        </p>
        <div className="mt-9 flex gap-3">
          <button className="rounded bg-emerald-400 px-7 py-3 font-bold text-slate-950">Démarrer un projet</button>
          <button className="rounded border border-slate-700 px-7 py-3 font-semibold">Nos études de cas</button>
        </div>
      </section>

      <section id="expertise" className="grid gap-px border-y border-slate-800 bg-slate-800 md:grid-cols-4">
        {expertise.map((e) => (
          <div key={e.title} className="bg-[#03060d] p-8 hover:bg-slate-900/60">
            <h3 className="font-mono font-bold text-emerald-400">{e.title}</h3>
            <p className="mt-3 text-sm text-slate-400">{e.body}</p>
          </div>
        ))}
      </section>

      <section id="work" className="px-8 py-16">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-between gap-8 text-center">
          {[["750+", "ingénieurs & designers"], ["10 ans+", "de produits bancaires en prod"], ["4", "continents livrés"], ["0", "projet « maquette seulement »"]].map(([v, l]) => (
            <div key={l} className="min-w-36 flex-1">
              <div className="font-mono text-4xl font-extrabold text-white">{v}</div>
              <p className="mt-1 text-sm text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-8 mb-16 rounded-2xl border border-slate-800 bg-slate-900/40 p-10 lg:mx-auto lg:max-w-4xl">
        <p className="font-mono text-sm text-emerald-400">// comment on travaille</p>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {[
            ["Équipes intégrées", "Nos squads rejoignent votre organisation — mêmes stand-ups, même backlog, même exigence."],
            ["Conformité native", "PSD2, PCI-DSS, audits réglementaires : intégrés dès le design, pas rattrapés après."],
            ["Transfert inclus", "Nous documentons et formons pour que votre équipe reprenne les clés sans nous."],
          ].map(([t, b]) => (
            <div key={t}><h3 className="font-bold text-white">{t}</h3><p className="mt-2 text-sm text-slate-400">{b}</p></div>
          ))}
        </div>
      </section>

      <footer id="careers" className="border-t border-slate-800 px-8 py-10 text-sm text-slate-500">
        <div className="flex flex-wrap justify-between gap-4">
          <span className="font-mono">vacuumlabs — Bratislava · Prague · Londres · Singapour</span>
          <a href="mailto:hello@vacuum.example" className="text-emerald-400 hover:underline">hello@vacuum.example</a>
        </div>
      </footer>
    </div>
  );
}
