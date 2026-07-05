import { useState } from "react";

const kit = {
  name: "Acme Studio",
  colors: [
    { hex: "#1a1a1a", role: "Ink" },
    { hex: "#f6f1e7", role: "Paper" },
    { hex: "#c96f4a", role: "Terracotta" },
    { hex: "#5a6f5d", role: "Sage" },
    { hex: "#d9b98a", role: "Sand" },
  ],
  type: [
    { family: "Fraunces", role: "Display", sample: "Aa Bb Cc — 72/64" },
    { family: "Georgia", role: "Body", sample: "The quick brown fox jumps over the lazy dog." },
  ],
  voice: ["Warm, not cute", "Precise, not stiff", "Confident, never loud"],
};

export default function App() {
  const [url, setUrl] = useState("");
  const [extracted, setExtracted] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#1a1a1a]" style={{ fontFamily: "Georgia, serif" }}>
      <header className="flex items-center justify-between border-b border-[#e0d6c2] px-10 py-5">
        <span className="text-lg italic">Brand Kit</span>
        <span className="text-xs tracking-[0.25em] text-[#8f8267]">STRUCTURED IDENTITY, FROM ANY SOURCE</span>
      </header>

      <section className="mx-auto max-w-3xl px-8 pt-20 text-center">
        <h1 className="text-6xl italic leading-tight">Get their <span className="underline decoration-[#c96f4a] decoration-4 underline-offset-8">brand</span>.</h1>
        <p className="mx-auto mt-6 max-w-lg text-[#6f6450]">
          Paste a website or drop an asset — get back a structured kit of colors, typography and voice.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setExtracted(true); }}
          className="mx-auto mt-8 flex max-w-xl gap-2"
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://their-website.com"
            className="flex-1 rounded-full border border-[#d5c9ae] bg-white px-6 py-3 outline-none focus:border-[#c96f4a]"
          />
          <button className="rounded-full bg-[#1a1a1a] px-7 py-3 text-[#f6f1e7]">Extract</button>
        </form>
      </section>

      {extracted && (
        <section className="mx-auto max-w-4xl px-8 py-16">
          <div className="rounded-2xl border border-[#e0d6c2] bg-white p-10 shadow-sm">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-3xl italic">{kit.name}</h2>
              <span className="text-xs tracking-widest text-[#8f8267]">{url || "acme.studio"} · EXTRACTED KIT</span>
            </div>

            <h3 className="mb-3 text-xs tracking-[0.25em] text-[#8f8267]">COLOR</h3>
            <div className="mb-10 grid grid-cols-5 gap-3">
              {kit.colors.map((c) => (
                <div key={c.hex}>
                  <div className="h-20 rounded-lg border border-black/5" style={{ background: c.hex }} />
                  <div className="mt-2 text-sm">{c.role}</div>
                  <div className="text-xs text-[#8f8267]">{c.hex}</div>
                </div>
              ))}
            </div>

            <h3 className="mb-3 text-xs tracking-[0.25em] text-[#8f8267]">TYPOGRAPHY</h3>
            <div className="mb-10 grid gap-4 md:grid-cols-2">
              {kit.type.map((t) => (
                <div key={t.family} className="rounded-lg border border-[#e0d6c2] p-5">
                  <div className="flex justify-between text-xs text-[#8f8267]"><span>{t.role}</span><span>{t.family}</span></div>
                  <div className="mt-3 text-2xl italic">{t.sample}</div>
                </div>
              ))}
            </div>

            <h3 className="mb-3 text-xs tracking-[0.25em] text-[#8f8267]">VOICE</h3>
            <ul className="flex flex-wrap gap-2">
              {kit.voice.map((v) => (
                <li key={v} className="rounded-full border border-[#c96f4a] px-4 py-1.5 text-sm text-[#c96f4a]">{v}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
