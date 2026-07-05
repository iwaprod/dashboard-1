import { useState } from "react";

const episodes = [
  { n: 48, title: "The maintainer who said no", guest: "with Ana Duarte", length: "52 min" },
  { n: 47, title: "Shipping when you're scared", guest: "with Kojo Mensah", length: "44 min" },
  { n: 46, title: "Databases are a social problem", guest: "with Priya Nair", length: "61 min" },
  { n: 45, title: "The art of the tiny tool", guest: "with Tom Delacroix", length: "38 min" },
];

export default function App() {
  const [playing, setPlaying] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-[#170f24] font-sans text-purple-50">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-lg font-bold">〰 Wavelength</span>
        <nav className="flex gap-6 text-sm text-purple-300/70">
          <a href="#" className="hover:text-white">Episodes</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">RSS</a>
        </nav>
      </header>

      <section className="px-8 pb-12 pt-10">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-8">
          <div className="grid h-44 w-44 place-items-center rounded-3xl bg-gradient-to-br from-purple-500 to-rose-500 text-6xl shadow-2xl">〰</div>
          <div className="min-w-64 flex-1">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-300/70">A podcast about software & the people who make it</p>
            <h1 className="mt-2 text-5xl font-extrabold tracking-tight">Wavelength</h1>
            <p className="mt-3 max-w-md text-purple-200/70">Long conversations, no hot takes. New episode every other Tuesday.</p>
            <div className="mt-5 flex gap-2 text-sm">
              {["Spotify", "Apple", "Overcast", "RSS"].map((p) => (
                <span key={p} className="rounded-full border border-purple-500/40 px-4 py-1.5 text-purple-200">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-8 pb-20">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-purple-300/70">Latest episodes</h2>
        <ul className="space-y-3">
          {episodes.map((e) => (
            <li key={e.n} className="flex items-center gap-5 rounded-2xl border border-purple-800/40 bg-purple-950/30 p-5">
              <button
                onClick={() => setPlaying(playing === e.n ? null : e.n)}
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-bold ${playing === e.n ? "bg-rose-500" : "bg-purple-500"}`}
              >
                {playing === e.n ? "❚❚" : "▶"}
              </button>
              <div className="flex-1">
                <p className="text-xs text-purple-400">EP. {e.n}</p>
                <h3 className="font-semibold">{e.title}</h3>
                <p className="text-sm text-purple-300/60">{e.guest} · {e.length}</p>
              </div>
              {playing === e.n && (
                <div className="hidden items-end gap-[3px] md:flex">
                  {[9, 14, 7, 16, 11, 6, 13].map((h, i) => (
                    <span key={i} className="w-1 animate-pulse rounded bg-rose-400" style={{ height: h * 2, animationDelay: `${i * 90}ms` }} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
