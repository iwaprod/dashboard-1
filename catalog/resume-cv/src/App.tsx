const experience = [
  { years: "2023 —", role: "Staff Product Engineer", org: "Fjord Analytics", note: "Own the data-viz platform used by 400+ enterprise customers." },
  { years: "2020–23", role: "Senior Front-end Engineer", org: "Papershift", note: "Led the design-system rebuild; cut UI defects by 60%." },
  { years: "2017–20", role: "Front-end Engineer", org: "Studio Brut", note: "Shipped 30+ client sites; twice awarded Site of the Day." },
];

const skills = ["TypeScript", "React", "Design systems", "Data visualization", "Accessibility", "Node.js", "GraphQL"];

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-800" style={{ fontFamily: "Georgia, serif" }}>
      <main className="mx-auto max-w-2xl px-8 py-20">
        <header className="mb-14">
          <h1 className="text-5xl font-bold tracking-tight">Nadia Belkacem</h1>
          <p className="mt-3 text-lg text-stone-500">Product engineer — interfaces that explain themselves.</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-stone-500">
            <a className="underline underline-offset-4 hover:text-stone-900" href="mailto:nadia@belkacem.dev">nadia@belkacem.dev</a>
            <a className="underline underline-offset-4 hover:text-stone-900" href="#">github/nbelkacem</a>
            <span>Paris · remote-friendly</span>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-stone-400">Experience</h2>
          <ol className="space-y-8">
            {experience.map((e) => (
              <li key={e.org} className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-6">
                <span className="font-mono text-sm text-stone-400">{e.years}</span>
                <div>
                  <h3 className="text-lg font-semibold">{e.role} · <span className="font-normal italic">{e.org}</span></h3>
                  <p className="mt-1 text-stone-600">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-stone-400">Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="rounded-full border border-stone-300 px-4 py-1.5 text-sm">{s}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border-2 border-stone-800 p-7">
          <h2 className="text-xl font-bold">Currently open to</h2>
          <p className="mt-2 text-stone-600">
            Staff/principal roles on products where the interface <em>is</em> the product. Four-day weeks preferred.
          </p>
          <a href="mailto:nadia@belkacem.dev" className="mt-4 inline-block bg-stone-900 px-6 py-2.5 text-sm text-white">Get in touch</a>
        </section>

        <footer className="mt-14 text-center text-xs text-stone-400">Last updated June 2026 — références sur demande</footer>
      </main>
    </div>
  );
}
