const stops = [
  { day: "Day 1–3", city: "Lisboa", note: "Alfama at dawn, pastéis warm from the oven, the 28 tram uphill.", tone: "#fbbf24" },
  { day: "Day 4–6", city: "Porto", note: "Livraria stairs, rabelo boats, that first sip of tawny above the Douro.", tone: "#f97316" },
  { day: "Day 7–9", city: "Madeira", note: "Levada walks in the clouds, black scabbardfish, ocean pools at Porto Moniz.", tone: "#22d3ee" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#062a3f] font-sans text-sky-50">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-lg font-bold">🧭 Wanderlog</span>
        <nav className="flex gap-7 text-sm text-sky-200/70">
          <a href="#trip" className="hover:text-white">Current trip</a>
          <a href="#guides" className="hover:text-white">Guides</a>
          <a href="#about" className="hover:text-white">About</a>
        </nav>
      </header>

      <section className="px-8 pb-14 pt-12">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300/70">Travel journal · Portugal, June 2026</p>
        <h1 className="mt-3 max-w-3xl text-6xl font-extrabold leading-[1.03] tracking-tight">
          Nine days chasing<br />Atlantic <span className="text-amber-400">light</span>.
        </h1>
        <p className="mt-5 max-w-lg text-sky-200/70">
          An itinerary you can steal: three stops, slow mornings, no museums before coffee.
        </p>
      </section>

      <section id="trip" className="mx-auto max-w-4xl px-8 pb-20">
        <ol className="relative border-l-2 border-sky-700/50 pl-8">
          {stops.map((s) => (
            <li key={s.city} className="relative mb-10">
              <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-[#062a3f]" style={{ background: s.tone }}>●</span>
              <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">{s.day}</p>
              <h2 className="mt-1 text-3xl font-bold">{s.city}</h2>
              <p className="mt-2 max-w-xl text-sky-200/80">{s.note}</p>
              <button className="mt-3 text-sm font-semibold text-amber-400 hover:underline">Read the full guide →</button>
            </li>
          ))}
        </ol>
      </section>

      <section id="guides" className="border-t border-sky-800/50 bg-[#05233517] px-8 py-14">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">The packing list that survived 14 trips</h2>
            <p className="mt-1 text-sky-200/70">One bag, 8 kg, four seasons. Free, forever.</p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="you@email.com" className="rounded-xl border border-sky-700 bg-sky-900/40 px-4 py-2.5 outline-none placeholder:text-sky-400/60" />
            <button className="rounded-xl bg-amber-400 px-5 py-2.5 font-semibold text-[#062a3f]">Send it</button>
          </form>
        </div>
      </section>

      <footer id="about" className="px-8 py-8 text-sm text-sky-300/50">Wanderlog — written from seat 23A since 2019.</footer>
    </div>
  );
}
