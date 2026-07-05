const links = [
  { label: "🎬 Nouvelle vidéo — Recettes d'été", url: "#", hot: true },
  { label: "📕 Mon e-book (gratuit)", url: "#" },
  { label: "🧑‍🍳 Cours de cuisine en ligne", url: "#" },
  { label: "🛒 Ma sélection matériel", url: "#" },
  { label: "💌 Newsletter du dimanche", url: "#" },
];

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500 px-6 py-12 font-sans">
      <main className="w-full max-w-md text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-rose-200 text-5xl shadow-lg">👩‍🍳</div>
        <h1 className="mt-4 text-2xl font-extrabold text-white">@camille.cuisine</h1>
        <p className="mt-1 text-rose-100">Recettes simples, produits de saison · 280k abonnés</p>

        <div className="mt-8 space-y-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              className={`block rounded-full py-3.5 font-semibold shadow transition-transform hover:scale-[1.03] ${
                l.hot ? "bg-rose-950 text-white" : "bg-white/95 text-rose-950"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-5 text-2xl">
          {["📸", "🎵", "▶️", "🐦"].map((icon) => (
            <a key={icon} href="#" className="grid h-11 w-11 place-items-center rounded-full bg-white/25 backdrop-blur transition hover:bg-white/40">{icon}</a>
          ))}
        </div>
        <p className="mt-8 text-xs text-rose-100/80">créé avec linkhub</p>
      </main>
    </div>
  );
}
