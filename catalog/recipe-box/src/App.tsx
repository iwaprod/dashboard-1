import { useState } from "react";

const recipes = [
  {
    id: 1, name: "Shakshuka du dimanche", time: "35 min", serves: 4, tone: "#fb923c",
    ingredients: ["6 œufs", "800g tomates concassées", "2 poivrons rouges", "1 oignon", "Cumin, paprika fumé", "Feta, coriandre"],
    steps: ["Faire revenir oignon et poivrons 8 min.", "Ajouter épices puis tomates, mijoter 12 min.", "Creuser des puits, casser les œufs, couvrir 6 min.", "Finir feta + coriandre, servir à la poêle."],
  },
  {
    id: 2, name: "Dahl de lentilles corail", time: "30 min", serves: 4, tone: "#f59e0b",
    ingredients: ["300g lentilles corail", "400ml lait de coco", "1 oignon, ail, gingembre", "Curcuma, garam masala", "Épinards frais", "Riz basmati"],
    steps: ["Suer oignon, ail, gingembre et épices.", "Ajouter lentilles + 600ml d'eau, cuire 15 min.", "Incorporer lait de coco et épinards 5 min.", "Servir sur riz avec citron vert."],
  },
  {
    id: 3, name: "Cookies tahini-chocolat", time: "25 min", serves: 12, tone: "#a16207",
    ingredients: ["150g farine", "100g tahini", "90g beurre", "120g sucre roux", "1 œuf", "150g chocolat noir concassé", "Fleur de sel"],
    steps: ["Crémer beurre, tahini et sucre.", "Ajouter œuf puis farine et chocolat.", "Boules de 40g, fleur de sel dessus.", "Cuire 11 min à 180°C — cœur encore mou."],
  },
];

export default function App() {
  const [selected, setSelected] = useState(recipes[0]);
  return (
    <div className="min-h-screen bg-[#fff7ed] text-stone-800" style={{ fontFamily: "Georgia, serif" }}>
      <header className="border-b-2 border-orange-200 px-8 py-6">
        <h1 className="text-3xl font-bold italic">Recipe Box</h1>
        <p className="text-sm text-stone-500">Les recettes qu'on refait — testées, ratées, retestées.</p>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-8 py-10 md:grid-cols-[300px_1fr]">
        <aside className="space-y-3">
          {recipes.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className={`w-full rounded-2xl border-2 p-4 text-left transition ${selected.id === r.id ? "border-orange-400 bg-white shadow" : "border-orange-200 bg-white/60 hover:border-orange-300"}`}
            >
              <div className="mb-2 h-20 rounded-xl" style={{ background: `linear-gradient(150deg, ${r.tone}, #ffedd5)` }} />
              <h3 className="font-bold">{r.name}</h3>
              <p className="text-xs text-stone-500">⏱ {r.time} · {r.serves} pers.</p>
            </button>
          ))}
        </aside>

        <article className="rounded-3xl border-2 border-orange-200 bg-white p-8">
          <div className="mb-6 h-36 rounded-2xl" style={{ background: `linear-gradient(150deg, ${selected.tone}, #ffedd5)` }} />
          <h2 className="text-4xl font-bold italic">{selected.name}</h2>
          <p className="mt-1 text-sm text-stone-500">⏱ {selected.time} · {selected.serves} personnes · difficulté ★★☆</p>

          <div className="mt-8 grid gap-8 sm:grid-cols-[220px_1fr]">
            <section>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Ingrédients</h3>
              <ul className="space-y-2 text-sm">
                {selected.ingredients.map((i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-orange-400">•</span>{i}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Préparation</h3>
              <ol className="space-y-3">
                {selected.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
