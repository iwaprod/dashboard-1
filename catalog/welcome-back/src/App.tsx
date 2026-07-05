import { useState } from "react";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");

  if (signedIn) {
    return (
      <div className="flex min-h-screen bg-[#0b1220] font-sans text-slate-200">
        <aside className="hidden w-60 border-r border-slate-800 p-5 md:block">
          <div className="mb-8 text-lg font-bold text-white">◆ Northstar</div>
          <nav className="space-y-1 text-sm">
            {["Overview", "Projects", "Members", "Billing", "Settings"].map((item, i) => (
              <a key={item} href="#" className={`block rounded-lg px-3 py-2 ${i === 0 ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/50"}`}>{item}</a>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-white">Good evening, {email.split("@")[0] || "there"} 👋</h1>
          <p className="mt-1 text-sm text-slate-500">Here's what happened while you were away.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { label: "Active projects", value: "12" },
              { label: "Tasks due this week", value: "27" },
              { label: "Team members online", value: "8" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <p className="text-xs uppercase tracking-widest text-slate-500">{kpi.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{kpi.value}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setSignedIn(false)} className="mt-10 text-sm text-slate-500 underline hover:text-white">Sign out</button>
        </main>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen font-sans md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-[#16233d] to-[#0b1220] p-10 text-slate-300 md:flex">
        <span className="text-lg font-bold text-white">◆ Northstar</span>
        <blockquote className="max-w-sm">
          <p className="text-2xl font-medium leading-snug text-white">"We moved our whole ops team in a weekend. Nobody wants to go back."</p>
          <footer className="mt-4 text-sm text-slate-400">— Lena Marchetti, COO at Fjord</footer>
        </blockquote>
        <span className="text-xs text-slate-500">© 2026 Northstar Inc.</span>
      </div>

      <div className="flex items-center justify-center bg-[#0b1220] p-8">
        <form
          onSubmit={(e) => { e.preventDefault(); setSignedIn(true); }}
          className="w-full max-w-sm"
        >
          <h1 className="text-3xl font-bold text-white">Welcome back.</h1>
          <p className="mt-2 text-sm text-slate-500">Pick up where you left off.</p>

          <label className="mt-8 block text-sm text-slate-400">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-indigo-400"
            />
          </label>
          <label className="mt-4 block text-sm text-slate-400">
            Password
            <input
              type="password"
              required
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-indigo-400"
            />
          </label>
          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <label className="flex items-center gap-1.5"><input type="checkbox" className="accent-indigo-500" /> Remember me</label>
            <a href="#" className="hover:text-white">Forgot password?</a>
          </div>
          <button className="mt-6 w-full rounded-lg bg-indigo-500 py-3 font-semibold text-white hover:bg-indigo-400">
            Sign in
          </button>
          <p className="mt-5 text-center text-sm text-slate-500">
            New here? <a href="#" className="text-indigo-400 hover:underline">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
}
