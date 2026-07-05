import { useEffect, useState } from "react";

const slides = [
  {
    kicker: "Q3 STRATEGY",
    title: "Ship faster,\nlearn faster.",
    body: "Our plan for the next quarter in three moves.",
    bg: "linear-gradient(135deg, #ff4fa0, #7b5cff)",
  },
  {
    kicker: "MOVE 01",
    title: "One team,\none funnel.",
    body: "Marketing and product share a single activation metric from now on.",
    bg: "linear-gradient(135deg, #101014, #2a2a3a)",
  },
  {
    kicker: "MOVE 02",
    title: "Weekly releases,\nno exceptions.",
    body: "Every Friday something reaches users. Small is fine — silent is not.",
    bg: "linear-gradient(135deg, #7b5cff, #38bdf8)",
  },
  {
    kicker: "MOVE 03",
    title: "Talk to ten\nusers a week.",
    body: "Each PM records the calls and posts one insight per interview.",
    bg: "linear-gradient(135deg, #f43f5e, #f97316)",
  },
  {
    kicker: "THANK YOU",
    title: "Questions?",
    body: "deck built with code · edit slides in src/App.tsx",
    bg: "linear-gradient(135deg, #0f172a, #1e293b)",
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + delta)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const slide = slides[index];
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <main
        className="relative flex flex-1 items-center justify-center transition-all duration-500"
        style={{ background: slide.bg }}
      >
        <div className="max-w-3xl px-12">
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] opacity-80">{slide.kicker}</p>
          <h1 className="whitespace-pre-line text-6xl font-extrabold leading-[1.05] tracking-tight">{slide.title}</h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">{slide.body}</p>
        </div>
        <div className="absolute bottom-6 left-12 text-sm opacity-70">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </main>
      <footer className="flex items-center justify-between bg-neutral-950 px-6 py-3">
        <span className="text-xs text-neutral-500">Lovable Slides — ← → to navigate</span>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-4 bg-neutral-600"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} className="rounded-lg border border-neutral-700 px-3 py-1 text-sm">←</button>
          <button onClick={() => go(1)} className="rounded-lg bg-white px-3 py-1 text-sm text-black">→</button>
        </div>
      </footer>
    </div>
  );
}
