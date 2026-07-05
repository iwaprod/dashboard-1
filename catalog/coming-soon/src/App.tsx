import { useEffect, useState } from "react";

const LAUNCH = new Date("2026-09-01T09:00:00Z").getTime();

export default function App() {
  const [now, setNow] = useState(Date.now());
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, LAUNCH - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor(diff / 3_600_000) % 24;
  const m = Math.floor(diff / 60_000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] px-6 font-sans text-zinc-100">
      <p className="text-xs uppercase tracking-[0.5em] text-zinc-500">Something is coming</p>
      <h1 className="mt-4 text-center text-7xl font-black tracking-tighter">
        Soon<span className="text-zinc-600">.</span>
      </h1>

      <div className="mt-10 flex gap-3 font-mono">
        {[
          [d, "jours"], [h, "heures"], [m, "min"], [s, "sec"],
        ].map(([v, label]) => (
          <div key={label as string} className="w-20 rounded-2xl border border-zinc-800 bg-zinc-900/60 py-4 text-center">
            <div className="text-3xl font-bold">{String(v).padStart(2, "0")}</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">{label}</div>
          </div>
        ))}
      </div>

      {done ? (
        <p className="mt-10 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-emerald-300">
          ✓ Vous serez prévenu·e en premier.
        </p>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }}
          className="mt-10 flex w-full max-w-sm gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="flex-1 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 outline-none placeholder:text-zinc-600 focus:border-zinc-400"
          />
          <button className="rounded-full bg-zinc-100 px-6 py-3 font-semibold text-zinc-950">Prévenez-moi</button>
        </form>
      )}
      <p className="mt-12 text-xs text-zinc-600">© 2026 — un lancement soigné vaut mieux qu'un lancement rapide</p>
    </div>
  );
}
