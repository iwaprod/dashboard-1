const modules = [
  { n: "01", title: "Foundations of visual hierarchy", lessons: 6, time: "1h 40" },
  { n: "02", title: "Typography that carries meaning", lessons: 8, time: "2h 10" },
  { n: "03", title: "Color systems, not color picks", lessons: 5, time: "1h 25" },
  { n: "04", title: "Layout, grids and rhythm", lessons: 9, time: "2h 45" },
  { n: "05", title: "Portfolio project & critique", lessons: 4, time: "3h 00" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#12102b] font-sans text-violet-50">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="font-bold">🎓 CourseCraft</span>
        <button className="rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold">Enroll — €149</button>
      </header>

      <section className="mx-auto max-w-3xl px-8 pb-16 pt-14 text-center">
        <span className="rounded-full border border-violet-500/50 bg-violet-500/10 px-4 py-1 text-xs font-medium text-violet-300">COHORT 7 · STARTS SEPT 9</span>
        <h1 className="mt-6 text-6xl font-extrabold leading-[1.05] tracking-tight">
          Design skills that<br /><span className="bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">compound</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-violet-200/70">
          A 5-week course for developers and PMs who want to stop shipping ugly things. 32 lessons, weekly critique, lifetime access.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button className="rounded-xl bg-violet-500 px-7 py-3 font-semibold">Join the cohort</button>
          <button className="rounded-xl border border-violet-500/40 px-7 py-3 font-semibold text-violet-200">Watch lesson 1 free</button>
        </div>
        <p className="mt-4 text-sm text-violet-300/60">★ 4.9 — from 1 240 alumni</p>
      </section>

      <section className="mx-auto max-w-3xl px-8 pb-20">
        <h2 className="mb-6 text-2xl font-bold">Curriculum</h2>
        <div className="space-y-3">
          {modules.map((m) => (
            <div key={m.n} className="flex items-center gap-5 rounded-2xl border border-violet-800/50 bg-violet-950/40 p-5 hover:border-violet-500/60">
              <span className="text-2xl font-black text-violet-500">{m.n}</span>
              <div className="flex-1">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="text-sm text-violet-300/60">{m.lessons} lessons · {m.time}</p>
              </div>
              <span className="text-violet-400">→</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-violet-800/40 px-8 py-14 text-center">
        <blockquote className="mx-auto max-w-2xl text-2xl font-medium leading-snug">
          "I refunded two other design courses. This is the one that finally made it click."
        </blockquote>
        <p className="mt-4 text-sm text-violet-300/60">— Sofia R., front-end engineer</p>
      </section>
    </div>
  );
}
