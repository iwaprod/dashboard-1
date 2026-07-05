import { useState } from "react";

interface Card {
  id: number;
  x: number;
  y: number;
  rot: number;
  color: string;
  label: string;
  emoji: string;
}

const initialCards: Card[] = [
  { id: 1, x: 6, y: 12, rot: -4, color: "#f7c8d8", label: "Palette — blush & rose", emoji: "🌸" },
  { id: 2, x: 30, y: 6, rot: 3, color: "#e8e4f7", label: "Type study — Fraunces", emoji: "✒️" },
  { id: 3, x: 55, y: 14, rot: -2, color: "#fdf3d8", label: "Texture — raw paper", emoji: "📜" },
  { id: 4, x: 76, y: 8, rot: 5, color: "#d8f0e4", label: "Motion ref — slow fade", emoji: "🎞" },
  { id: 5, x: 14, y: 48, rot: 2, color: "#fde4d8", label: "Editorial layout", emoji: "📐" },
  { id: 6, x: 42, y: 42, rot: -5, color: "#e4ecfd", label: "Photography — soft light", emoji: "📷" },
  { id: 7, x: 68, y: 50, rot: 3, color: "#f0d8f7", label: "Logo sketches v3", emoji: "✏️" },
];

export default function App() {
  const [cards, setCards] = useState(initialCards);
  const [selected, setSelected] = useState<number | null>(null);

  const shuffle = () => {
    setCards((prev) =>
      prev.map((c) => ({
        ...c,
        x: 5 + Math.random() * 75,
        y: 5 + Math.random() * 60,
        rot: Math.random() * 12 - 6,
      })),
    );
  };

  return (
    <div className="min-h-screen bg-[#faf6f8] text-neutral-900" style={{ fontFamily: "Georgia, serif" }}>
      <header className="flex items-center justify-between border-b border-rose-200 bg-white/70 px-8 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-300 text-sm">🎨</span>
          <div>
            <h1 className="text-lg font-bold">Inspo Canvas</h1>
            <p className="text-xs text-neutral-500">Moodboard · Brand refresh 2026</p>
          </div>
        </div>
        <div className="flex gap-2 text-sm">
          <button onClick={shuffle} className="rounded-full border border-rose-300 px-4 py-1.5 hover:bg-rose-50">
            Shuffle layout
          </button>
          <button className="rounded-full bg-neutral-900 px-4 py-1.5 text-white">Share board</button>
        </div>
      </header>

      <main className="relative mx-auto h-[78vh] max-w-6xl overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(#e5c8d4 1px, transparent 1px)", backgroundSize: "26px 26px" }}
        />
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelected(card.id === selected ? null : card.id)}
            className="absolute w-48 rounded-xl p-4 text-left shadow-lg transition-transform duration-500 hover:scale-105"
            style={{
              left: `${card.x}%`,
              top: `${card.y}%`,
              transform: `rotate(${card.rot}deg) scale(${selected === card.id ? 1.15 : 1})`,
              background: card.color,
              zIndex: selected === card.id ? 10 : 1,
            }}
          >
            <div className="mb-6 text-3xl">{card.emoji}</div>
            <div className="text-sm font-semibold leading-snug">{card.label}</div>
            <div className="mt-2 text-[11px] uppercase tracking-widest text-neutral-500">pinned</div>
          </button>
        ))}
      </main>

      <footer className="px-8 py-3 text-xs text-neutral-400">
        {cards.length} references · click a card to focus · spatial canvas
      </footer>
    </div>
  );
}
