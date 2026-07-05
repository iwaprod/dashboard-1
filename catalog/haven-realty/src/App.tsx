import { useState } from "react";

const listings = [
  { title: "Loft under the rafters", place: "Canal Saint-Martin, Paris 10e", price: "€ 845 000", beds: 2, area: 96, tone: "linear-gradient(150deg,#bfdbfe,#60a5fa)", type: "Apartment" },
  { title: "Garden house", place: "Croix-Rousse, Lyon", price: "€ 620 000", beds: 4, area: 140, tone: "linear-gradient(150deg,#bbf7d0,#4ade80)", type: "House" },
  { title: "Seafront duplex", place: "Le Mourillon, Toulon", price: "€ 495 000", beds: 3, area: 88, tone: "linear-gradient(150deg,#a5f3fc,#22d3ee)", type: "Apartment" },
  { title: "Stone longère", place: "Pays d'Auge, Normandie", price: "€ 380 000", beds: 5, area: 210, tone: "linear-gradient(150deg,#fde68a,#f59e0b)", type: "House" },
  { title: "Artist's studio", place: "Marais, Paris 3e", price: "€ 540 000", beds: 1, area: 52, tone: "linear-gradient(150deg,#e9d5ff,#a855f7)", type: "Apartment" },
  { title: "Rooftop penthouse", place: "Part-Dieu, Lyon", price: "€ 970 000", beds: 3, area: 118, tone: "linear-gradient(150deg,#fecdd3,#fb7185)", type: "Apartment" },
];

export default function App() {
  const [filter, setFilter] = useState("All");
  const shown = listings.filter((l) => filter === "All" || l.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
        <span className="text-xl font-bold">🏡 Haven Realty</span>
        <nav className="hidden gap-7 text-sm text-slate-500 md:flex">
          <a href="#buy" className="text-slate-900 font-medium">Buy</a>
          <a href="#" className="hover:text-slate-900">Rent</a>
          <a href="#" className="hover:text-slate-900">Sell</a>
          <a href="#" className="hover:text-slate-900">Agents</a>
        </nav>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">List your property</button>
      </header>

      <section className="bg-gradient-to-b from-blue-50 to-slate-50 px-8 py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Find a place<br />that feels like <span className="text-blue-600">home</span>.</h1>
        <div className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <input placeholder="City, neighbourhood, or postal code…" className="flex-1 px-5 py-3.5 outline-none" />
          <button className="bg-blue-600 px-7 font-semibold text-white">Search</button>
        </div>
      </section>

      <section id="buy" className="mx-auto max-w-6xl px-8 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured listings</h2>
          <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1 text-sm">
            {["All", "Apartment", "House"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 ${filter === f ? "bg-slate-900 text-white" : "text-slate-500"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l) => (
            <article key={l.title} className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="h-44 transition-transform duration-500 group-hover:scale-105" style={{ background: l.tone }} />
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold">{l.title}</h3>
                  <span className="font-bold text-blue-600">{l.price}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">📍 {l.place}</p>
                <p className="mt-3 text-xs text-slate-400">{l.beds} bed · {l.area} m² · {l.type}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
