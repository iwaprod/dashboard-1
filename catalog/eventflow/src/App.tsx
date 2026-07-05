const events = [
  { name: "Design Systems Meetup", date: "Jul 12", city: "Paris", spots: "23 spots left", tone: "#ff6b4a" },
  { name: "Indie Makers Brunch", date: "Jul 19", city: "Lyon", spots: "Sold out", tone: "#f43f5e" },
  { name: "AI × Product Night", date: "Jul 26", city: "Paris", spots: "112 going", tone: "#fb923c" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#fff4ec] font-sans text-[#221410]">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="text-xl font-black tracking-tight">eventflow<span className="text-[#ff6b4a]">*</span></span>
        <nav className="hidden gap-7 text-sm font-medium text-[#8a6a5c] md:flex">
          <a href="#discover" className="hover:text-[#221410]">Discover</a>
          <a href="#host" className="hover:text-[#221410]">Host</a>
          <a href="#pricing" className="hover:text-[#221410]">Pricing</a>
        </nav>
        <button className="rounded-full bg-[#221410] px-5 py-2 text-sm font-semibold text-[#fff4ec]">Create an event</button>
      </header>

      <section className="mx-auto max-w-4xl px-8 pb-16 pt-20 text-center">
        <h1 className="text-6xl font-black leading-[1.02] tracking-tight">
          The event platform<br />where ideas become<br />
          <span className="inline-block -rotate-1 rounded-2xl bg-[#ff6b4a] px-4 text-[#fff4ec]">gatherings</span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg text-[#8a6a5c]">
          Pages, tickets, reminders and check-in — everything you need to bring people into a room, in one link.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <button className="rounded-full bg-[#221410] px-7 py-3 font-semibold text-[#fff4ec]">Start free</button>
          <button className="rounded-full border-2 border-[#221410] px-7 py-3 font-semibold">See a live event</button>
        </div>
      </section>

      <section id="discover" className="mx-auto max-w-5xl px-8 pb-24">
        <h2 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-[#8a6a5c]">This month near you</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {events.map((e) => (
            <article key={e.name} className="group cursor-pointer rounded-3xl border-2 border-[#221410] bg-white p-6 shadow-[6px_6px_0_#221410] transition-transform hover:-translate-y-1">
              <div className="mb-5 grid h-28 place-items-center rounded-2xl text-4xl font-black text-white" style={{ background: e.tone }}>
                {e.date}
              </div>
              <h3 className="text-lg font-bold leading-snug">{e.name}</h3>
              <div className="mt-3 flex items-center justify-between text-sm text-[#8a6a5c]">
                <span>📍 {e.city}</span>
                <span className={e.spots === "Sold out" ? "font-semibold text-[#f43f5e]" : ""}>{e.spots}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer id="host" className="bg-[#221410] px-8 py-14 text-center text-[#fff4ec]">
        <h2 className="text-3xl font-black">Hosting something?</h2>
        <p className="mt-2 text-[#c9a99a]">Your event page can be live in 4 minutes.</p>
        <button className="mt-6 rounded-full bg-[#ff6b4a] px-8 py-3 font-bold">Create your event →</button>
      </footer>
    </div>
  );
}
