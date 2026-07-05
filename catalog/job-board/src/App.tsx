import { useState } from "react";

const jobs = [
  { title: "Senior Product Designer", company: "Fjord Analytics", place: "Remote (EU)", salary: "€75–95k", tags: ["Design", "Remote"], logo: "🌊" },
  { title: "Staff Backend Engineer", company: "Papershift", place: "Berlin", salary: "€90–120k", tags: ["Engineering"], logo: "📄" },
  { title: "Growth Marketer", company: "Sprout", place: "Paris · hybrid", salary: "€55–70k", tags: ["Marketing"], logo: "🌱" },
  { title: "DevRel Engineer", company: "Pulse", place: "Remote (world)", salary: "€70–90k", tags: ["Engineering", "Remote"], logo: "📟" },
  { title: "Founding Designer", company: "Northstar", place: "Lisbon", salary: "€60–80k + equity", tags: ["Design"], logo: "◆" },
];

const filters = ["All", "Engineering", "Design", "Marketing", "Remote"];

export default function App() {
  const [active, setActive] = useState("All");
  const shown = jobs.filter((j) => active === "All" || j.tags.includes(active));

  return (
    <div className="min-h-screen bg-[#082f49] font-sans text-sky-50">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold">💼 Workfolio</span>
        <button className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-sky-950">Post a job — €99</button>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-10 pt-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Jobs at companies<br />that <span className="text-sky-400">ship</span>.</h1>
        <p className="mx-auto mt-4 max-w-md text-sky-200/70">Hand-reviewed roles at small, profitable product teams. New batch every Monday.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${active === f ? "bg-sky-400 text-sky-950" : "border border-sky-700 text-sky-200 hover:border-sky-500"}`}>
              {f}
            </button>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-4xl space-y-3 px-6 pb-20">
        {shown.map((j) => (
          <article key={j.title} className="flex cursor-pointer flex-wrap items-center gap-4 rounded-2xl border border-sky-800/60 bg-sky-950/40 p-5 hover:border-sky-500/70">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-sky-900 text-2xl">{j.logo}</span>
            <div className="min-w-48 flex-1">
              <h2 className="font-bold">{j.title}</h2>
              <p className="text-sm text-sky-300/70">{j.company} · {j.place}</p>
            </div>
            <div className="flex items-center gap-2">
              {j.tags.map((t) => <span key={t} className="rounded-full bg-sky-900 px-3 py-1 text-xs text-sky-300">{t}</span>)}
              <span className="ml-2 font-semibold text-sky-200">{j.salary}</span>
            </div>
          </article>
        ))}
        <p className="pt-4 text-center text-sm text-sky-300/60">{shown.length} open roles · updated 2 h ago</p>
      </main>
    </div>
  );
}
