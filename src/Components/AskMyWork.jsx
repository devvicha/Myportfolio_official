import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";

// Set VITE_ASK_API_URL once the Cloud Run agent is deployed. Until then (and
// whenever the service is cold or down) the section falls back to the canned
// answers below and says so — an honest offline state beats a spinner that
// never resolves.
const API_URL = import.meta.env.VITE_ASK_API_URL;

const SUGGESTIONS = [
  "How does he prevent hallucinations in production?",
  "Has he ever broken production?",
  "What has he fine-tuned?",
  "Does he know Azure or Microsoft tooling?",
];

// Offline answers. Each one is true and cites a real artifact — the same
// grounding contract the deployed agent runs under.
const FALLBACK = {
  [SUGGESTIONS[0]]: {
    answer:
      "Structurally, not by prompting harder. A customer was quoted the wrong price in production, so he built a fact firewall: the model names the item, pricing.js decides what it costs, so a total cannot drift. It shipped in audit mode first — logging violations rather than blocking replies — because a too-greedy regex blocking real customers would have been a worse failure than the bug it fixed.",
    sources: ["factFirewall.js", "pricing.js"],
    tools: ['search_work("hallucination")', 'get_project("whatsapp-agent")'],
  },
  [SUGGESTIONS[1]]: {
    answer:
      "Yes. In July 2026 the production WhatsApp number was flagged for automation and blocked for two days; around 1,500 customer messages queued undelivered. He traced the root cause to an unofficial client library, wrote the postmortem with cited sources, and drove the migration to Meta's official Cloud API as the permanent fix.",
    sources: ["WHATSAPP-BAN-INCIDENT-2026-07.md"],
    tools: ['search_work("production incident")'],
  },
  [SUGGESTIONS[2]]: {
    answer:
      "Whisper large-v2, with LoRA adapters, for Sinhala — a low-resource language. Rank 32, alpha 64, targeting the attention projections, trained to convergence over 20,244 steps with loss falling from 2.17 to about 0.12. He also trained YOLO pose and segmentation models on a self-collected garment dataset.",
    sources: ["Whisper-Fine-Tuning-For-Sinhala"],
    tools: ['search_work("fine-tuning")', "get_metrics()"],
  },
  [SUGGESTIONS[3]]: {
    answer:
      "Partly, and it is worth being exact. He has shipped Azure AI Speech in production — the Azure Speech SDK runs in three of his voice projects alongside OpenAI and Gemini. He has not used Azure OpenAI, AI Foundry, or Entra ID, and he has not used Copilot Studio or Power Automate. What he has built four times over is the same shape of system on a different stack: grounded generative answers, typed actions against back-end APIs, topic routing, and escalation to a human queue.",
    sources: ["check_stack: azure → partial", "check_stack: copilot studio → no"],
    tools: ['check_stack("azure")', 'check_stack("copilot studio")'],
  },
};

const AskMyWork = () => {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState([]);
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(!API_URL);
  const endRef = useRef(null);

  useEffect(() => {
    if (turns.length) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [turns]);

  const ask = async (question) => {
    const q = question.trim();
    if (!q || busy) return;

    setInput("");
    setTurns((t) => [...t, { role: "user", text: q }]);
    setBusy(true);

    // No backend configured, or a question we have a canned answer for.
    const canned = FALLBACK[q];

    if (!API_URL) {
      setTurns((t) => [
        ...t,
        canned
          ? { role: "agent", ...canned, offline: true }
          : {
              role: "agent",
              answer:
                "The agent is asleep — it answers from a grounded corpus of my work when it is running. Try one of the suggested questions above, or reach me directly.",
              sources: [],
              tools: [],
              offline: true,
            },
      ]);
      setBusy(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/ask`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTurns((t) => [
        ...t,
        {
          role: "agent",
          answer: data.answer,
          sources: data.sources || [],
          tools: data.tools || [],
        },
      ]);
      setOffline(false);
    } catch {
      setOffline(true);
      setTurns((t) => [
        ...t,
        canned
          ? { role: "agent", ...canned, offline: true }
          : {
              role: "agent",
              answer:
                "The agent could not be reached just now. Try one of the suggested questions — those answers are kept on the page.",
              sources: [],
              tools: [],
              offline: true,
            },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="ask" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            Ask my <span className="text-purple-500">work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            An agent grounded in my projects. It cites its source, and it says so
            when it does not know.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-gray-900/90 border border-gray-800 rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="inline-flex items-center gap-2 text-gray-500 text-xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  offline ? "bg-gray-600" : "bg-purple-500"
                }`}
              />
              {offline
                ? "agent offline — showing kept answers"
                : "grounded — answers only from cited sources"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-7">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                disabled={busy}
                className="text-left text-sm text-gray-300 border border-gray-800 bg-black px-3.5 py-2 rounded-full hover:border-purple-500 hover:text-white transition-colors disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          {turns.length > 0 && (
            <div className="flex flex-col gap-5 mb-7">
              {turns.map((turn, i) =>
                turn.role === "user" ? (
                  <div
                    key={i}
                    className="self-end max-w-[80%] bg-gray-800 text-white rounded-xl px-4 py-3"
                  >
                    {turn.text}
                  </div>
                ) : (
                  <div key={i} className="self-start max-w-[92%]">
                    <div className="border-l-2 border-purple-500 pl-4">
                      <p className="text-gray-300 leading-relaxed mb-3">
                        {turn.answer}
                      </p>

                      {turn.sources?.length > 0 && (
                        <p className="text-gray-500 text-xs mb-2">
                          source: {turn.sources.join(" · ")}
                        </p>
                      )}

                      {turn.tools?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 text-gray-500 text-xs pt-2 border-t border-gray-800">
                          <ChevronRight size={12} className="text-purple-500" />
                          {turn.tools.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
              <div ref={endRef} />
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-3 border border-gray-800 bg-black rounded-full pl-5 pr-2 py-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about my work…"
              aria-label="Ask a question about my work"
              className="flex-grow bg-transparent text-white placeholder-gray-500 outline-none py-1.5"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send question"
              className="w-9 h-9 shrink-0 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors"
            >
              {busy ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <ArrowRight size={16} />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AskMyWork;
