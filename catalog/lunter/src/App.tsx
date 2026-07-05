const range = [
  { name: "Tofu nature", desc: "La base — ferme, riche en protéines", tone: "#fef9c3" },
  { name: "Tofu fumé", desc: "Fumé au bois de hêtre, prêt à poêler", tone: "#fde68a" },
  { name: "Tartinade pois chiche", desc: "Onctueuse, citron & cumin", tone: "#d9f99d" },
  { name: "Boisson avoine", desc: "Douce et crémeuse, sans sucres ajoutés", tone: "#bbf7d0" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#f0fdf4] font-sans text-emerald-950">
      <header className="flex items-center justify-between px-8 py-5">
        <span className="text-2xl font-black lowercase tracking-tight text-emerald-700">lunter</span>
        <nav className="hidden gap-7 text-sm font-medium text-emerald-800/70 md:flex">
          <a href="#gamme" className="hover:text-emerald-950">Nos produits</a>
          <a href="#recettes" className="hover:text-emerald-950">Recettes</a>
          <a href="#histoire" className="hover:text-emerald-950">Notre histoire</a>
        </nav>
        <button className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-bold text-white">Où nous trouver</button>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-8 py-16 md:grid-cols-2 md:items-center">
        <div>
          <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold text-emerald-700">100 % VÉGÉTAL · FABRIQUÉ EN EUROPE</span>
          <h1 className="mt-5 text-6xl font-black leading-[1.02] tracking-tight">
            Le végétal qui a<br />du <span className="text-emerald-600">goût</span>.
          </h1>
          <p className="mt-5 max-w-md text-lg text-emerald-900/70">
            Du soja et de l'avoine cultivés sans OGM, transformés simplement,
            pour des assiettes généreuses — depuis trois générations.
          </p>
          <div className="mt-7 flex gap-3">
            <button className="rounded-full bg-emerald-600 px-7 py-3 font-bold text-white">Découvrir la gamme</button>
            <button className="rounded-full border-2 border-emerald-600 px-7 py-3 font-bold text-emerald-700">Nos recettes</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["🌱", "🧈", "🥣", "🥛"].map((e, i) => (
            <div key={i} className={`grid h-36 place-items-center rounded-3xl text-5xl ${i % 2 ? "mt-6" : ""}`} style={{ background: range[i].tone }}>{e}</div>
          ))}
        </div>
      </section>

      <section id="gamme" className="bg-white px-8 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-black">La gamme du frais</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {range.map((p) => (
              <article key={p.name} className="group cursor-pointer rounded-3xl border-2 border-emerald-100 p-5 transition hover:border-emerald-400">
                <div className="grid h-32 place-items-center rounded-2xl text-4xl transition-transform group-hover:scale-105" style={{ background: p.tone }}>🌿</div>
                <h3 className="mt-4 font-bold">{p.name}</h3>
                <p className="text-sm text-emerald-900/60">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="histoire" className="mx-auto max-w-3xl px-8 py-16 text-center">
        <h2 className="text-3xl font-black">De la ferme familiale au rayon frais</h2>
        <p className="mt-4 leading-relaxed text-emerald-900/70">
          Tout a commencé avec une presse à tofu artisanale dans une cuisine de montagne.
          Aujourd'hui, nos produits nourrissent des millions de repas — la recette, elle, n'a presque pas changé.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm font-bold text-emerald-700">
          <span>🌾 SANS OGM</span><span>♻️ EMBALLAGES RECYCLABLES</span><span>🐄 0 INGRÉDIENT ANIMAL</span>
        </div>
      </section>

      <footer id="recettes" className="bg-emerald-950 px-8 py-10 text-center text-emerald-100">
        <p className="font-bold lowercase">lunter</p>
        <p className="mt-1 text-sm text-emerald-300/70">le végétal généreux · presse@lunter.example</p>
      </footer>
    </div>
  );
}
