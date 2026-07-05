const services = [
  { n: "01", title: "Product discovery", body: "Deux semaines pour transformer une intuition en backlog priorisé et prototypé." },
  { n: "02", title: "Équipes dédiées", body: "Designers et ingénieurs seniors intégrés à votre roadmap, pas des tickets jetés par-dessus le mur." },
  { n: "03", title: "Rescue missions", body: "Un produit en retard, une dette qui déborde ? On entre, on stabilise, on relivre." },
];

const clients = ["fintech", "logistique", "santé", "SaaS B2B", "marketplaces"];

export default function App() {
  return (
    <div className="min-h-screen bg-[#101012] font-sans text-zinc-100">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-xl font-black tracking-tight">sparring<span className="text-amber-400">_</span></span>
        <nav className="hidden gap-8 text-sm text-zinc-400 md:flex">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#method" className="hover:text-white">Méthode</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      <section className="px-8 py-24">
        <h1 className="max-w-4xl text-7xl font-black leading-[0.98] tracking-tight md:text-8xl">
          On ne code pas<br />vos specs.<br />
          <span className="text-amber-400">On se bat avec.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg text-zinc-400">
          Studio produit & ingénierie. Nous challengeons vos idées avant d'écrire la première ligne —
          c'est pour ça qu'on s'appelle sparring.
        </p>
        <a href="#contact" className="mt-9 inline-block bg-amber-400 px-8 py-4 font-black text-zinc-950">
          Planifier un premier round →
        </a>
      </section>

      <section id="services" className="border-t border-zinc-800">
        {services.map((s) => (
          <div key={s.n} className="group grid gap-4 border-b border-zinc-800 px-8 py-10 transition-colors hover:bg-zinc-900/50 md:grid-cols-[80px_260px_1fr]">
            <span className="text-2xl font-black text-amber-400">{s.n}</span>
            <h3 className="text-2xl font-bold">{s.title}</h3>
            <p className="max-w-xl text-zinc-400">{s.body}</p>
          </div>
        ))}
      </section>

      <section id="method" className="px-8 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Ce qu'on croit</p>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {[
            ["Semaine 1 = prod", "Un déploiement dès la première semaine, même minuscule. Le momentum est une feature."],
            ["Seniors only", "Pas de pyramide de juniors facturés. Celui qui vend est celui qui code."],
            ["Fin de mission = but", "On construit pour partir : documentation, passation, et votre équipe autonome."],
          ].map(([t, b]) => (
            <div key={t} className="border-l-2 border-amber-400 pl-5">
              <h3 className="font-bold">{t}</h3>
              <p className="mt-2 text-sm text-zinc-400">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {clients.map((c) => (
            <span key={c} className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-400">{c}</span>
          ))}
        </div>
      </section>

      <footer id="contact" className="border-t border-zinc-800 px-8 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Un projet ?</p>
        <a href="mailto:ring@sparring.example" className="mt-2 inline-block text-4xl font-black underline decoration-amber-400 decoration-4 underline-offset-8">
          ring@sparring.example
        </a>
        <p className="mt-6 text-sm text-zinc-600">Prague · Bratislava · remote — réponse en 24 h, sans commercial au milieu.</p>
      </footer>
    </div>
  );
}
