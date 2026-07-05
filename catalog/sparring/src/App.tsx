const services = [
  { n: "01", title: "Levées de fonds", body: "Term sheets, due diligence, pactes d'actionnaires — négociés du côté des fondateurs." },
  { n: "02", title: "Propriété intellectuelle & logiciel", body: "Protégez votre code, vos marques et vos données avant qu'un tiers ne s'en charge." },
  { n: "03", title: "Réglementaire & IA", body: "RGPD, AI Act, fintech et crypto : avancez vite sans marcher sur une mine." },
  { n: "04", title: "Stratégie & CFO", body: "Valorisations, modèles économiques et préparation aux boards, main dans la main." },
];

const sectors = ["fintech", "crypto", "healthtech", "gaming", "SaaS", "e-commerce", "proptech"];

export default function App() {
  return (
    <div className="min-h-screen bg-[#101012] font-sans text-zinc-100">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-xl font-black tracking-tight">sparring<span className="text-amber-400">_</span></span>
        <nav className="hidden gap-8 text-sm text-zinc-400 md:flex">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#playbook" className="hover:text-white">Playbook</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      <section className="px-8 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Juridique & stratégie pour les visionnaires de la tech</p>
        <h1 className="mt-5 max-w-4xl text-7xl font-black leading-[0.98] tracking-tight md:text-8xl">
          Votre partenaire<br />d'<span className="text-amber-400">entraînement</span><br />juridique.
        </h1>
        <p className="mt-8 max-w-md text-lg text-zinc-400">
          Un bon sparring-partner ne vous ménage pas : il vous prépare au vrai combat.
          Nous encaissons les questions difficiles — contrats, régulation, investisseurs — pour que vous restiez debout.
        </p>
        <a href="#contact" className="mt-9 inline-block bg-amber-400 px-8 py-4 font-black text-zinc-950">
          Monter sur le ring →
        </a>
      </section>

      <section id="services" className="border-t border-zinc-800">
        {services.map((s) => (
          <div key={s.n} className="group grid gap-4 border-b border-zinc-800 px-8 py-10 transition-colors hover:bg-zinc-900/50 md:grid-cols-[80px_300px_1fr]">
            <span className="text-2xl font-black text-amber-400">{s.n}</span>
            <h3 className="text-2xl font-bold">{s.title}</h3>
            <p className="max-w-xl text-zinc-400">{s.body}</p>
          </div>
        ))}
      </section>

      <section id="playbook" className="px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-black">Le Playbook, en accès libre</h2>
            <p className="mt-4 max-w-md text-zinc-400">
              Modèles de contrats, checklists de levée et guides réglementaires
              en source ouverte pour les fondateurs solo et les jeunes équipes d'Europe centrale.
            </p>
            <button className="mt-6 border border-amber-400 px-7 py-3 font-black text-amber-400 hover:bg-amber-400 hover:text-zinc-950">
              Ouvrir le Playbook
            </button>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-7 font-mono text-sm text-zinc-300">
            <p className="text-amber-400">playbook/</p>
            <p className="mt-2 pl-4">├─ pacte-fondateurs.md</p>
            <p className="pl-4">├─ checklist-seed-round.md</p>
            <p className="pl-4">├─ cgu-saas-template.md</p>
            <p className="pl-4">└─ rgpd-startup-kit.md</p>
            <p className="mt-3 text-zinc-500">100+ entreprises accompagnées en CEE, US et au-delà</p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {sectors.map((c) => (
            <span key={c} className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-400">{c}</span>
          ))}
        </div>
      </section>

      <footer id="contact" className="border-t border-zinc-800 px-8 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Une question difficile ?</p>
        <a href="mailto:ring@sparring.example" className="mt-2 inline-block text-4xl font-black underline decoration-amber-400 decoration-4 underline-offset-8">
          ring@sparring.example
        </a>
        <p className="mt-6 text-sm text-zinc-600">Bratislava · Prague — réponse en 24 h, en langage humain, pas en jargon.</p>
      </footer>
    </div>
  );
}
