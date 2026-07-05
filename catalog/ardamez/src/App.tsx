const products = [
  { name: "Plaque de rue classique", desc: "Fond bleu, lettres blanches, bords bombés", price: "dès 89 €" },
  { name: "Numéro de maison", desc: "Rond ou carré, 12 coloris d'émail", price: "dès 29 €" },
  { name: "Table de bistrot émaillée", desc: "Plateau émaillé au motif de votre choix", price: "sur devis" },
  { name: "Enseigne & plaque publicitaire", desc: "Sur mesure, sérigraphie à la main", price: "sur devis" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1d2f5e]" style={{ fontFamily: "Georgia, serif" }}>
      <header className="border-b-4 border-[#1d2f5e] bg-[#1d2f5e] px-8 py-6 text-[#f4f1ea]">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-2xl font-bold tracking-[0.25em]">ARDAMEZ</h1>
          <nav className="hidden gap-7 text-sm tracking-widest md:flex">
            <a href="#atelier" className="hover:underline">L'ATELIER</a>
            <a href="#creations" className="hover:underline">CRÉATIONS</a>
            <a href="#devis" className="hover:underline">DEVIS</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-10 px-8 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs tracking-[0.3em] text-[#8a93ad]">ÉMAILLERIE FRANÇAISE — DEPUIS QUATRE GÉNÉRATIONS</p>
          <h2 className="mt-4 text-5xl font-bold leading-[1.08]">La plaque émaillée, cuite au grand feu.</h2>
          <p className="mt-5 leading-relaxed text-[#44507a]">
            Acier embouti, émail vitrifié au grand feu, couleurs inaltérables pendant un siècle.
            Plaques de rue, enseignes et tables de bistrot sortent de notre atelier
            de Nort-sur-Erdre, près de Nantes — sérigraphiés à la main, cuisson après chaque couleur.
          </p>
          <a href="#devis" className="mt-7 inline-block bg-[#1d2f5e] px-8 py-3 text-sm tracking-widest text-[#f4f1ea]">
            DEMANDER UN DEVIS
          </a>
        </div>
        <div className="rounded-lg border-[6px] border-[#1d2f5e] bg-[#22397a] p-10 text-center shadow-[inset_0_0_40px_#00000040]">
          <div className="rounded border-2 border-[#f4f1ea] px-4 py-8">
            <p className="text-xs tracking-[0.4em] text-[#c8d2ee]">RUE DE LA</p>
            <p className="mt-2 text-4xl font-bold tracking-wider text-white">RÉPUBLIQUE</p>
          </div>
          <p className="mt-4 text-xs tracking-[0.3em] text-[#8a93ad]">ÉMAIL VÉRITABLE · BORDS BOMBÉS</p>
        </div>
      </section>

      <section id="creations" className="border-y-4 border-[#1d2f5e] bg-white px-8 py-14">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-8 text-center text-3xl font-bold">Nos fabrications</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <article key={p.name} className="border-2 border-[#1d2f5e] p-6 text-center transition-transform hover:-translate-y-1">
                <div className="mx-auto mb-4 grid h-16 w-24 place-items-center rounded border-2 border-[#f4f1ea] bg-[#22397a] text-xl font-bold text-white shadow-inner">
                  Aa
                </div>
                <h4 className="font-bold">{p.name}</h4>
                <p className="mt-1 text-sm text-[#44507a]">{p.desc}</p>
                <p className="mt-3 text-sm font-bold tracking-widest text-[#b3552e]">{p.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="atelier" className="mx-auto max-w-3xl px-8 py-14 text-center">
        <h3 className="text-3xl font-bold">Un savoir-faire classé</h3>
        <p className="mt-4 leading-relaxed text-[#44507a]">
          Emboutissage, émaillage, sérigraphie, cuisson : tout est réalisé sur place.
          Nous fournissons mairies, musées, hôtels et particuliers exigeants, en France et au-delà.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm tracking-widest text-[#8a93ad]">
          <span>✔ GARANTIE 25 ANS</span><span>✔ FABRIQUÉ EN FRANCE</span><span>✔ POSE PARTOUT EN FRANCE</span>
        </div>
      </section>

      <footer id="devis" className="bg-[#1d2f5e] px-8 py-10 text-center text-[#f4f1ea]">
        <p className="text-lg font-bold tracking-widest">ARDAMEZ — ÉMAILLERIE & SIGNALÉTIQUE</p>
        <p className="mt-2 text-sm text-[#c8d2ee]">Atelier de Nort-sur-Erdre, près de Nantes · devis@ardamez.example · 02 98 00 00 00</p>
      </footer>
    </div>
  );
}
