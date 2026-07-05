const features = [
  { icon: "🛰", title: "Global probes", body: "27 regions ping your endpoints every 15 seconds." },
  { icon: "📟", title: "Smart alerts", body: "Escalation chains that page the right person, not everyone." },
  { icon: "📊", title: "Public status", body: "A status page your customers actually trust — on your domain." },
];

const plans = [
  { name: "Solo", price: "€0", tagline: "for side projects", items: ["5 monitors", "1 status page", "Email alerts"] },
  { name: "Team", price: "€29", tagline: "per month", items: ["50 monitors", "Unlimited pages", "Slack + SMS", "1y history"], hot: true },
  { name: "Scale", price: "€99", tagline: "per month", items: ["500 monitors", "SSO & audit log", "99.99% SLA", "Priority support"] },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#061418] font-sans text-cyan-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="flex items-center gap-2 text-lg font-bold">
          <span className="relative flex h-3 w-3"><span className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-400 opacity-60" /><span className="h-3 w-3 rounded-full bg-cyan-400" /></span>
          pulse
        </span>
        <nav className="hidden gap-8 text-sm text-cyan-200/70 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <button className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#06282e]">Start monitoring</button>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 text-center">
        <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tight">
          Uptime your users<br />can <span className="text-cyan-400">feel</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-cyan-200/70">
          Pulse watches your endpoints from around the world and tells you before your customers do.
        </p>
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-cyan-900 bg-[#08202a] p-5 text-left font-mono text-sm">
          <div className="flex justify-between border-b border-cyan-900/60 pb-3 text-cyan-200/60">
            <span>api.yourapp.com</span><span className="text-emerald-400">● operational</span>
          </div>
          <div className="flex gap-[3px] pt-4">
            {Array.from({ length: 60 }).map((_, i) => (
              <span key={i} className={`h-8 flex-1 rounded-sm ${i === 44 ? "bg-amber-400" : "bg-emerald-500/80"}`} />
            ))}
          </div>
          <p className="pt-3 text-xs text-cyan-200/50">Last 60 days · 99.982% uptime · 1 degraded window</p>
        </div>
      </section>

      <section id="features" className="mx-auto grid max-w-5xl gap-5 px-6 pb-20 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-cyan-900 bg-[#08202a] p-6">
            <div className="text-2xl">{f.icon}</div>
            <h3 className="mt-3 font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-cyan-200/60">{f.body}</p>
          </div>
        ))}
      </section>

      <section id="pricing" className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-3xl font-bold">Simple pricing</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-2xl border p-7 ${p.hot ? "border-cyan-400 bg-cyan-400/5" : "border-cyan-900 bg-[#08202a]"}`}>
              {p.hot && <span className="mb-3 inline-block rounded-full bg-cyan-400 px-3 py-0.5 text-xs font-bold text-[#06282e]">MOST POPULAR</span>}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="mt-2 text-4xl font-extrabold">{p.price}<span className="ml-1 text-sm font-normal text-cyan-200/60">{p.tagline}</span></p>
              <ul className="mt-5 space-y-2 text-sm text-cyan-200/80">
                {p.items.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
              <button className={`mt-6 w-full rounded-lg py-2.5 font-semibold ${p.hot ? "bg-cyan-400 text-[#06282e]" : "border border-cyan-800"}`}>
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-cyan-900/60 py-8 text-center text-sm text-cyan-200/50">
        pulse — built for the 3am pager · status.pulse.dev
      </footer>
    </div>
  );
}
