import { useState } from "react";

const seed = [
  { id: 1, votes: 128, title: "Show & tell: I rebuilt my grandma's recipe site from 1998", author: "mira", replies: 34, tag: "Show & tell" },
  { id: 2, votes: 86, title: "What's your unpopular opinion about testing?", author: "dev_tom", replies: 92, tag: "Discussion" },
  { id: 3, votes: 54, title: "Monthly thread: what are you building in July?", author: "mod-team", replies: 61, tag: "Official" },
  { id: 4, votes: 41, title: "Ask: how do you price a side project?", author: "solofound", replies: 27, tag: "Ask" },
  { id: 5, votes: 19, title: "The 15-minute deploy pipeline, annotated", author: "chloe.dev", replies: 8, tag: "Guide" },
];

const tagTone: Record<string, string> = {
  "Show & tell": "bg-rose-200 text-rose-900", Discussion: "bg-sky-200 text-sky-900",
  Official: "bg-amber-200 text-amber-900", Ask: "bg-violet-200 text-violet-900", Guide: "bg-emerald-200 text-emerald-900",
};

export default function App() {
  const [threads, setThreads] = useState(seed);
  const [voted, setVoted] = useState<number[]>([]);
  const upvote = (id: number) => {
    if (voted.includes(id)) return;
    setVoted((v) => [...v, id]);
    setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, votes: t.votes + 1 } : t)));
  };

  return (
    <div className="min-h-screen bg-[#fef2f2] font-sans text-rose-950">
      <header className="border-b-2 border-rose-950 bg-[#fee2e2] px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <span className="text-xl font-black">🏛 Commons</span>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-rose-700 sm:inline">4 218 makers</span>
            <button className="rounded-lg border-2 border-rose-950 bg-white px-4 py-1.5 font-bold shadow-[3px_3px_0_#4c0519]">+ New thread</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-5 flex gap-2 text-sm font-semibold">
          <button className="rounded-full bg-rose-950 px-4 py-1.5 text-white">Hot</button>
          <button className="rounded-full px-4 py-1.5 text-rose-700 hover:bg-rose-100">New</button>
          <button className="rounded-full px-4 py-1.5 text-rose-700 hover:bg-rose-100">Top this week</button>
        </div>

        <ul className="space-y-3">
          {threads.map((t) => (
            <li key={t.id} className="flex gap-4 rounded-2xl border-2 border-rose-950 bg-white p-4 shadow-[4px_4px_0_#4c0519]">
              <button
                onClick={() => upvote(t.id)}
                className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-rose-950 font-bold ${voted.includes(t.id) ? "bg-rose-950 text-white" : "bg-rose-50 hover:bg-rose-100"}`}
              >
                ▲<span className="text-sm">{t.votes}</span>
              </button>
              <div className="min-w-0">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${tagTone[t.tag]}`}>{t.tag}</span>
                <h2 className="mt-1.5 cursor-pointer font-bold leading-snug hover:underline">{t.title}</h2>
                <p className="mt-1 text-sm text-rose-700">par @{t.author} · {t.replies} réponses</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
