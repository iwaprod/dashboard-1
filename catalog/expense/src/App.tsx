const spend = [
  { month: "Jan", value: 62 }, { month: "Feb", value: 48 }, { month: "Mar", value: 71 },
  { month: "Apr", value: 55 }, { month: "May", value: 43 }, { month: "Jun", value: 66 },
];

const categories = [
  { name: "Housing", amount: "€1 240", share: 42, color: "#34d399" },
  { name: "Food & dining", amount: "€486", share: 17, color: "#a7f3d0" },
  { name: "Transport", amount: "€212", share: 8, color: "#6ee7b7" },
  { name: "Subscriptions", amount: "€94", share: 4, color: "#10b981" },
];

const transactions = [
  { label: "Rent — June", cat: "Housing", amount: "−€1 240,00" },
  { label: "Marché Bastille", cat: "Food", amount: "−€36,20" },
  { label: "Navigo pass", cat: "Transport", amount: "−€86,40" },
  { label: "Salary", cat: "Income", amount: "+€3 450,00", positive: true },
  { label: "Spotify Duo", cat: "Subscriptions", amount: "−€14,99" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#04130b] font-sans text-emerald-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400 font-black text-emerald-950">E</span>
            <span className="text-lg font-bold tracking-[0.25em]">EXPENSE</span>
          </div>
          <button className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950">+ Add transaction</button>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            { label: "Balance", value: "€4 812,30", sub: "+€310 this month" },
            { label: "Spent in June", value: "€2 118,04", sub: "68% of budget" },
            { label: "Saved this year", value: "€3 940,00", sub: "on track for €8k goal" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-emerald-900/60 bg-emerald-950/40 p-6">
              <p className="text-xs uppercase tracking-widest text-emerald-500">{kpi.label}</p>
              <p className="mt-2 text-3xl font-bold">{kpi.value}</p>
              <p className="mt-1 text-sm text-emerald-400/70">{kpi.sub}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="rounded-2xl border border-emerald-900/60 bg-emerald-950/40 p-6 lg:col-span-3">
            <h2 className="mb-6 text-sm font-semibold text-emerald-300">Monthly spending</h2>
            <div className="flex h-44 items-end gap-3">
              {spend.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700 to-emerald-400" style={{ height: `${m.value}%` }} />
                  <span className="text-xs text-emerald-500">{m.month}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-900/60 bg-emerald-950/40 p-6 lg:col-span-2">
            <h2 className="mb-6 text-sm font-semibold text-emerald-300">By category</h2>
            <ul className="space-y-4">
              {categories.map((c) => (
                <li key={c.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{c.name}</span>
                    <span className="text-emerald-400">{c.amount}</span>
                  </div>
                  <div className="h-2 rounded-full bg-emerald-900/70">
                    <div className="h-2 rounded-full" style={{ width: `${c.share}%`, background: c.color }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-emerald-900/60 bg-emerald-950/40 p-6">
          <h2 className="mb-4 text-sm font-semibold text-emerald-300">Recent transactions</h2>
          <ul className="divide-y divide-emerald-900/60">
            {transactions.map((t) => (
              <li key={t.label} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-xs text-emerald-500">{t.cat}</p>
                </div>
                <span className={t.positive ? "font-semibold text-emerald-400" : "text-emerald-100"}>{t.amount}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
