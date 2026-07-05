import { useState } from "react";

const nav = [
  { section: "Getting started", pages: ["Introduction", "Installation", "Quickstart"] },
  { section: "Core concepts", pages: ["Projects", "Agents", "Snapshots"] },
  { section: "API reference", pages: ["REST endpoints", "SSE events", "Errors"] },
];

export default function App() {
  const [page, setPage] = useState("Introduction");
  return (
    <div className="flex min-h-screen bg-[#0f172a] font-sans text-slate-300">
      <aside className="hidden w-64 border-r border-slate-800 p-6 md:block">
        <div className="mb-8 flex items-center gap-2 font-bold text-white">📘 Docs <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">v2.4</span></div>
        {nav.map((group) => (
          <div key={group.section} className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">{group.section}</p>
            <ul className="space-y-1 border-l border-slate-800">
              {group.pages.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => setPage(p)}
                    className={`-ml-px block border-l py-1 pl-4 text-sm ${page === p ? "border-sky-400 text-sky-400" : "border-transparent text-slate-400 hover:text-white"}`}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <main className="mx-auto max-w-3xl flex-1 px-8 py-12">
        <div className="mb-8 flex items-center rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-500">
          🔍 Search the docs… <kbd className="ml-auto rounded bg-slate-800 px-2 py-0.5 text-xs">⌘K</kbd>
        </div>
        <p className="text-sm text-sky-400">Getting started</p>
        <h1 className="mt-1 text-4xl font-bold text-white">{page}</h1>
        <p className="mt-5 leading-relaxed">
          Everything you need to go from zero to a running project in under five minutes.
          This page covers the core ideas; follow the quickstart for the hands-on version.
        </p>
        <h2 className="mt-10 text-2xl font-semibold text-white">Install</h2>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-800 bg-[#0b1120] p-4 font-mono text-sm text-emerald-300">
{`npm install @acme/sdk

import { createClient } from "@acme/sdk";
const client = createClient({ apiKey: process.env.ACME_KEY });`}
        </pre>
        <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <b className="text-amber-400">Note.</b> API keys are scoped per environment — never reuse a production key in development.
        </div>
        <div className="mt-12 flex justify-between border-t border-slate-800 pt-6 text-sm">
          <span className="text-slate-500">← Previous</span>
          <button onClick={() => setPage("Installation")} className="text-sky-400 hover:underline">Installation →</button>
        </div>
      </main>
    </div>
  );
}
