const works = [
  { title: "Neon District", kind: "Art direction", year: "2026", tone: "linear-gradient(140deg,#3b1d5e,#e11d74)" },
  { title: "Mono No Aware", kind: "Identity", year: "2025", tone: "linear-gradient(140deg,#101014,#3f3f46)" },
  { title: "Glasshouse", kind: "Web experience", year: "2025", tone: "linear-gradient(140deg,#0c4a6e,#22d3ee)" },
  { title: "Field Notes", kind: "Editorial", year: "2024", tone: "linear-gradient(140deg,#365314,#a3e635)" },
  { title: "Afterimage", kind: "Motion", year: "2024", tone: "linear-gradient(140deg,#7c2d12,#fb923c)" },
  { title: "Static/Bloom", kind: "Installation", year: "2023", tone: "linear-gradient(140deg,#1e1b4b,#818cf8)" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-200" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <header className="flex items-center justify-between px-8 py-6 text-sm uppercase tracking-[0.2em]">
        <span className="font-bold">Jordan Studio</span>
        <nav className="flex gap-8 text-neutral-500">
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      <section className="px-8 pb-20 pt-16">
        <h1 className="max-w-5xl text-[11vw] font-bold uppercase leading-[0.9] tracking-tight text-white md:text-8xl">
          Design for<br />the after-<span className="text-[#e11d74]">dark</span>.
        </h1>
        <p className="mt-8 max-w-md text-neutral-500">
          Independent studio for brands that refuse to whisper. Identity, web, motion — Paris & remote.
        </p>
      </section>

      <section id="work" className="grid gap-px bg-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w) => (
          <a key={w.title} href="#contact" className="group relative block h-72 overflow-hidden bg-[#0a0a0c]">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: w.tone }} />
            <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/10" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
              <div>
                <h3 className="text-xl font-bold text-white">{w.title}</h3>
                <p className="text-xs uppercase tracking-widest text-white/70">{w.kind}</p>
              </div>
              <span className="text-xs text-white/60">{w.year}</span>
            </div>
          </a>
        ))}
      </section>

      <footer id="contact" className="flex flex-wrap items-center justify-between gap-4 px-8 py-14">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">New business</p>
          <a href="mailto:hello@jordan.studio" className="text-2xl font-bold text-white underline decoration-[#e11d74] underline-offset-4">
            hello@jordan.studio
          </a>
        </div>
        <span className="text-xs text-neutral-600">© 2026 Jordan Studio — all frequencies reserved</span>
      </footer>
    </div>
  );
}
