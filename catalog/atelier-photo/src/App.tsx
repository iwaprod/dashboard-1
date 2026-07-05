const shots = [
  { title: "Aube nº2", tone: "linear-gradient(160deg,#d6d3d1,#a8a29e)", tall: true },
  { title: "Sel", tone: "linear-gradient(160deg,#e7e5e4,#78716c)" },
  { title: "Brume", tone: "linear-gradient(160deg,#f5f5f4,#d6d3d1)" },
  { title: "Basalte", tone: "linear-gradient(160deg,#57534e,#292524)", tall: true },
  { title: "Lin", tone: "linear-gradient(160deg,#fafaf9,#e7e5e4)" },
  { title: "Marée", tone: "linear-gradient(160deg,#a8a29e,#57534e)" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f4] text-stone-900" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <header className="flex items-center justify-between px-8 py-8">
        <h1 className="text-sm font-medium tracking-[0.5em]">ATELIER</h1>
        <nav className="flex gap-8 text-xs tracking-[0.2em] text-stone-500">
          <a href="#work" className="hover:text-stone-900">WORK</a>
          <a href="#about" className="hover:text-stone-900">ABOUT</a>
          <a href="#contact" className="hover:text-stone-900">CONTACT</a>
        </nav>
      </header>

      <section className="px-8 pb-16 pt-10">
        <p className="max-w-lg text-3xl font-light leading-snug text-stone-700">
          Photographies calmes des choses ordinaires — lumière, matière, silence.
        </p>
      </section>

      <section id="work" className="columns-1 gap-4 px-8 pb-16 sm:columns-2 lg:columns-3">
        {shots.map((s) => (
          <figure key={s.title} className="group mb-4 break-inside-avoid cursor-pointer">
            <div className={`${s.tall ? "h-96" : "h-64"} w-full transition-opacity group-hover:opacity-90`} style={{ background: s.tone }} />
            <figcaption className="flex justify-between pt-2 text-xs tracking-widest text-stone-500">
              <span>{s.title.toUpperCase()}</span><span>2026 · ARCHIVAL PRINT</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <footer id="contact" className="border-t border-stone-300 px-8 py-10 text-xs tracking-[0.2em] text-stone-500">
        <div className="flex flex-wrap justify-between gap-3">
          <span>COMMISSIONS OPEN — AUTUMN 2026</span>
          <a href="mailto:studio@atelier.photo" className="text-stone-900 underline underline-offset-4">STUDIO@ATELIER.PHOTO</a>
        </div>
      </footer>
    </div>
  );
}
