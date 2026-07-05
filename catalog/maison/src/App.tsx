const products = [
  { name: "Ceramic vessel n°4", price: "€86", tone: "#d9cbb6" },
  { name: "Oak side table", price: "€420", tone: "#c4a986" },
  { name: "Linen throw — sand", price: "€64", tone: "#e6dccb" },
  { name: "Stoneware carafe", price: "€58", tone: "#b8a894" },
  { name: "Paper lamp — cloud", price: "€148", tone: "#efe9de" },
  { name: "Walnut catch-all", price: "€39", tone: "#a58a6b" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#efe9df] text-[#2a241c]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <header className="flex items-center justify-between px-10 py-6">
        <nav className="flex gap-6 text-sm tracking-wide text-[#6b5f4d]">
          <a href="#shop" className="hover:text-[#2a241c]">Collection</a>
          <a href="#story" className="hover:text-[#2a241c]">Story</a>
        </nav>
        <h1 className="text-2xl tracking-[0.35em]">MAISON</h1>
        <nav className="flex gap-6 text-sm tracking-wide text-[#6b5f4d]">
          <a href="#journal" className="hover:text-[#2a241c]">Journal</a>
          <a href="#cart" className="hover:text-[#2a241c]">Cart (0)</a>
        </nav>
      </header>

      <section className="grid gap-10 px-10 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-xs tracking-[0.3em] text-[#8a7a60]">CURATED FOR CONSIDERED LIVING</p>
          <h2 className="text-6xl italic leading-[1.05]">Objects of<br />Quiet Beauty</h2>
          <p className="mt-6 max-w-md text-[#6b5f4d]">
            Hand-finished pieces from small European workshops. Few things, chosen well, kept for decades.
          </p>
          <a href="#shop" className="mt-8 inline-block border border-[#2a241c] px-8 py-3 text-sm tracking-widest hover:bg-[#2a241c] hover:text-[#efe9df]">
            SHOP NOW
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-72 rounded-t-full" style={{ background: "linear-gradient(160deg,#d9cbb6,#b8a894)" }} />
          <div className="mt-10 h-72 rounded-b-full" style={{ background: "linear-gradient(200deg,#e6dccb,#c4a986)" }} />
        </div>
      </section>

      <section id="shop" className="px-10 pb-24">
        <div className="mb-8 flex items-end justify-between border-b border-[#d5c9b4] pb-4">
          <h3 className="text-3xl italic">The collection</h3>
          <span className="text-xs tracking-widest text-[#8a7a60]">SPRING — {products.length} PIECES</span>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.name} className="group cursor-pointer">
              <div
                className="mb-4 h-64 transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ background: `linear-gradient(170deg, ${p.tone}, #efe9df 140%)` }}
              />
              <div className="flex items-baseline justify-between">
                <h4 className="text-lg">{p.name}</h4>
                <span className="text-sm text-[#8a7a60]">{p.price}</span>
              </div>
              <p className="mt-1 text-xs tracking-widest text-[#a5977d] opacity-0 transition-opacity group-hover:opacity-100">
                ADD TO CART →
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer id="story" className="border-t border-[#d5c9b4] px-10 py-10 text-sm text-[#8a7a60]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="tracking-[0.35em]">MAISON</span>
          <span>Slow objects since 2021 — Lisboa · Antwerp · Kyoto</span>
        </div>
      </footer>
    </div>
  );
}
