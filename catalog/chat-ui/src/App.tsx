import { useState } from "react";

interface Msg { role: "user" | "ai"; text: string }

const canned = [
  "Bonne question ! Voici comment je verrais les choses : commencez petit, mesurez, puis itérez.",
  "Voici trois pistes possibles — la deuxième est celle que je recommanderais pour démarrer.",
  "J'ai résumé l'essentiel en quatre points ci-dessus. Voulez-vous que je détaille l'un d'eux ?",
];

export default function App() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Bonjour 👋 Je suis Companion. Posez-moi n'importe quelle question." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: canned[m.length % canned.length] }]);
    }, 600);
  };

  return (
    <div className="flex h-screen bg-[#111827] font-sans text-gray-100">
      <aside className="hidden w-64 flex-col border-r border-gray-800 p-4 md:flex">
        <button className="mb-4 rounded-xl border border-gray-700 py-2.5 text-sm hover:bg-gray-800">+ Nouvelle conversation</button>
        <p className="mb-2 px-2 text-xs uppercase tracking-widest text-gray-500">Aujourd'hui</p>
        {["Plan de lancement produit", "Idées de noms de marque", "Relecture d'email"].map((c, i) => (
          <button key={c} className={`truncate rounded-lg px-3 py-2 text-left text-sm ${i === 0 ? "bg-gray-800" : "text-gray-400 hover:bg-gray-800/60"}`}>{c}</button>
        ))}
        <div className="mt-auto rounded-xl bg-gray-800/70 p-3 text-xs text-gray-400">✨ Companion Pro<br /><span className="text-gray-500">Réponses plus longues, fichiers, mémoire</span></div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="border-b border-gray-800 px-6 py-3 text-sm text-gray-400">Companion <span className="text-gray-600">· modèle v4</span></header>
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "ai" && <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-500 text-sm">✦</span>}
              <p className={`max-w-lg rounded-2xl px-4 py-2.5 leading-relaxed ${m.role === "user" ? "bg-teal-600" : "bg-gray-800"}`}>{m.text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 p-4">
          <div className="mx-auto flex max-w-2xl gap-2 rounded-2xl border border-gray-700 bg-gray-800/60 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Écrivez votre message…"
              className="flex-1 bg-transparent px-3 outline-none placeholder:text-gray-500"
            />
            <button onClick={send} className="rounded-xl bg-teal-500 px-4 py-2 font-semibold text-gray-950">↑</button>
          </div>
          <p className="mt-2 text-center text-xs text-gray-600">Companion peut se tromper — vérifiez les informations importantes.</p>
        </div>
      </main>
    </div>
  );
}
