import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const position = 1287;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#12102e] px-6 font-sans text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#3d2f8f] opacity-50 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#8b5cf6] opacity-25 blur-[120px]" />

      <main className="relative z-10 w-full max-w-xl text-center">
        <span className="mb-6 inline-block rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-xs font-medium tracking-wide text-violet-300">
          LAUNCHING SEPTEMBER 2026
        </span>
        <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
          Your inbox,<br />finally <span className="bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">quiet</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-slate-400">
          Launchlist batches everything non-urgent into one beautiful daily digest. Be first in line.
        </p>

        {joined ? (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-violet-500/40 bg-violet-500/10 p-6">
            <p className="text-2xl">🎟</p>
            <p className="mt-2 font-semibold">You're #{position} on the list</p>
            <p className="mt-1 text-sm text-slate-400">Skip ahead by sharing your invite link with friends.</p>
            <button className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#12102e]">Copy invite link</button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setJoined(true); }}
            className="mx-auto mt-10 flex max-w-md gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@work.com"
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 outline-none placeholder:text-slate-500 focus:border-violet-400"
            />
            <button className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-3.5 font-semibold">
              Join the list
            </button>
          </form>
        )}

        <div className="mt-12 flex items-center justify-center gap-3 text-sm text-slate-500">
          <div className="flex -space-x-2">
            {["#f472b6", "#a78bfa", "#38bdf8", "#4ade80"].map((c) => (
              <span key={c} className="h-8 w-8 rounded-full border-2 border-[#12102e]" style={{ background: c }} />
            ))}
          </div>
          <span><b className="text-white">1 286</b> people already waiting</span>
        </div>
      </main>
    </div>
  );
}
