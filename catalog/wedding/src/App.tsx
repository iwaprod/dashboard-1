import { useState } from "react";

const schedule = [
  { time: "15h30", what: "Cérémonie laïque", where: "Sous le grand chêne" },
  { time: "17h00", what: "Cocktail & photos", where: "La roseraie" },
  { time: "20h00", what: "Dîner", where: "L'orangerie" },
  { time: "23h00", what: "Ouverture du bal", where: "Jusqu'au bout de la nuit" },
];

export default function App() {
  const [rsvp, setRsvp] = useState<null | "yes" | "no">(null);
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-[#fdf2f8] text-rose-950" style={{ fontFamily: "Georgia, serif" }}>
      <header className="px-8 pb-12 pt-20 text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-rose-400">Samedi 5 juin 2027 · Provence</p>
        <h1 className="mt-6 text-6xl italic leading-tight md:text-7xl">Léa <span className="text-rose-300">&</span> Marius</h1>
        <div className="mx-auto mt-8 h-px w-24 bg-rose-300" />
        <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-rose-800">
          Après onze ans, deux chats et un tour du monde, on se dit oui.
          Et on aimerait beaucoup que vous soyez là.
        </p>
      </header>

      <section className="mx-auto max-w-lg px-8 pb-16">
        <h2 className="mb-8 text-center text-3xl italic">La journée</h2>
        <ol className="space-y-6">
          {schedule.map((s) => (
            <li key={s.time} className="flex items-baseline gap-6">
              <span className="w-16 shrink-0 text-right font-bold text-rose-400">{s.time}</span>
              <div className="border-l-2 border-rose-200 pl-6">
                <p className="text-lg font-semibold">{s.what}</p>
                <p className="text-sm text-rose-700/70">{s.where}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white/70 px-8 py-16">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-3xl italic">Répondez-nous</h2>
          <p className="mt-2 text-sm text-rose-700/80">avant le 1er mars 2027, s'il vous plaît 💌</p>

          {rsvp ? (
            <p className="mt-8 rounded-2xl border border-rose-300 bg-rose-50 p-6 text-lg italic">
              {rsvp === "yes"
                ? `Merci ${name || ""} ! On a déjà hâte de trinquer avec vous. 🥂`
                : "On boira un verre à votre santé — vous nous manquerez."}
            </p>
          ) : (
            <form className="mt-8 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="w-full rounded-full border border-rose-300 bg-white px-6 py-3 text-center outline-none focus:border-rose-500"
              />
              <div className="flex gap-3">
                <button onClick={() => setRsvp("yes")} className="flex-1 rounded-full bg-rose-950 py-3 text-rose-50">
                  Je serai là ✨
                </button>
                <button onClick={() => setRsvp("no")} className="flex-1 rounded-full border border-rose-950 py-3">
                  Avec regret…
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer className="px-8 py-10 text-center text-sm text-rose-700/70">
        <p className="italic">Domaine des Trois Cyprès — 435 chemin des Restanques, Lourmarin</p>
        <p className="mt-2 text-xs tracking-widest text-rose-400">DRESS CODE : ÉLÉGANT CHAMPÊTRE · ENFANTS BIENVENUS</p>
      </footer>
    </div>
  );
}
