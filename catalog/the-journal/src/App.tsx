const featured = {
  tag: "ESSAY",
  title: "In defense of slow software",
  excerpt:
    "We optimized every millisecond out of our tools and somewhere along the way we optimized out the thinking, too. A case for friction in the right places.",
  author: "Camille Fournier",
  read: "14 min read",
};

const stories = [
  { tag: "INTERVIEW", title: "The typographer who quit the internet", author: "R. Okafor", read: "9 min" },
  { tag: "FIELD NOTES", title: "What Kyoto's gardens teach about information design", author: "M. Laurent", read: "6 min" },
  { tag: "ESSAY", title: "Nobody reads documentation (and how to write it anyway)", author: "S. Adeyemi", read: "11 min" },
  { tag: "CRITICISM", title: "The dashboard aesthetic is eating the web", author: "C. Fournier", read: "8 min" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#191713]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <header className="border-b-2 border-[#191713] px-8 py-6 text-center">
        <p className="text-[11px] tracking-[0.4em] text-[#948a76]">VOL. XII — SUMMER 2026</p>
        <h1 className="mt-2 text-5xl font-bold italic tracking-tight">The Journal</h1>
        <nav className="mt-4 flex justify-center gap-8 text-xs tracking-[0.2em] text-[#6f6551]">
          <a href="#" className="hover:text-[#191713]">ESSAYS</a>
          <a href="#" className="hover:text-[#191713]">INTERVIEWS</a>
          <a href="#" className="hover:text-[#191713]">FIELD NOTES</a>
          <a href="#" className="hover:text-[#191713]">ARCHIVE</a>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-8">
        <article className="cursor-pointer border-b border-[#ddd3bd] py-14 text-center">
          <span className="text-xs tracking-[0.3em] text-[#b04a2f]">{featured.tag}</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-5xl font-bold italic leading-[1.1] hover:underline">
            {featured.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#6f6551]">{featured.excerpt}</p>
          <p className="mt-6 text-sm text-[#948a76]">
            by <span className="italic text-[#191713]">{featured.author}</span> · {featured.read}
          </p>
        </article>

        <section className="grid gap-x-12 sm:grid-cols-2">
          {stories.map((s) => (
            <article key={s.title} className="cursor-pointer border-b border-[#ddd3bd] py-10">
              <span className="text-[11px] tracking-[0.3em] text-[#b04a2f]">{s.tag}</span>
              <h3 className="mt-3 text-2xl font-bold italic leading-snug hover:underline">{s.title}</h3>
              <p className="mt-3 text-sm text-[#948a76]">by <span className="italic">{s.author}</span> · {s.read}</p>
            </article>
          ))}
        </section>

        <section className="my-14 border-2 border-[#191713] p-8 text-center">
          <h3 className="text-2xl font-bold italic">The Sunday letter</h3>
          <p className="mt-2 text-[#6f6551]">One essay, one link, one question. Every Sunday, no exceptions.</p>
          <form className="mx-auto mt-5 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="your@email.com" className="flex-1 border border-[#191713] bg-transparent px-4 py-2.5 outline-none" />
            <button className="bg-[#191713] px-6 py-2.5 text-[#faf7f2]">Subscribe</button>
          </form>
        </section>
      </main>

      <footer className="border-t-2 border-[#191713] py-6 text-center text-xs tracking-[0.25em] text-[#948a76]">
        THE JOURNAL — WRITTEN SLOWLY SINCE 2019
      </footer>
    </div>
  );
}
