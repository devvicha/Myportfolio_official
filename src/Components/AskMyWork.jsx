import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Loader2, MessageSquare, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState([]);
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(!API_URL);
  const endRef = useRef(null);

  useEffect(() => {
    if (turns.length) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [turns]);

  // Invite once, a few seconds in — long enough not to interrupt the hero,
  // short enough that most readers are still on the page. Dismissed for the
  // session once it has been seen or the panel has been opened.
  useEffect(() => {
    if (sessionStorage.getItem("askNudgeSeen")) return;
    const show = setTimeout(() => setNudge(true), 6000);
    const hide = setTimeout(() => setNudge(false), 20000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // The hero's "Ask my work anything" button opens the panel by dispatching
  // this event, so nothing has to know where the widget lives in the tree.
  useEffect(() => {
    const openPanel = () => {
      setOpen(true);
      setNudge(false);
      sessionStorage.setItem("askNudgeSeen", "1");
    };
    window.addEventListener("open-ask-my-work", openPanel);
    return () => window.removeEventListener("open-ask-my-work", openPanel);
  }, []);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    setOpen((o) => !o);
    setNudge(false);
    sessionStorage.setItem("askNudgeSeen", "1");
  };

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

  const statusLine = offline
    ? "agent offline — showing kept answers"
    : "grounded — answers only from cited sources";

  return (
    <>
      {/* Anchor so #ask and the nav still resolve to a real place on the page. */}
      <div id="ask" aria-hidden="true" />

      {/* Launcher — fixed, so it follows the reader through every section. */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-end gap-3">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              onClick={toggle}
              initial={{ opacity: 0, x: 12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="hidden sm:block max-w-[15rem] text-left bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 shadow-xl hover:border-purple-500 transition-colors"
            >
              <span className="block text-white text-sm font-medium mb-0.5">
                Ask me about my work
              </span>
              <span className="block text-gray-400 text-xs leading-snug">
                An agent trained on my projects — it cites its sources.
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggle}
          aria-label={open ? "Close the assistant" : "Ask me about my work"}
          aria-expanded={open}
          className="relative w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          animate={
            open
              ? { rotate: 0 }
              : {
                  // A periodic wave rather than a constant animation — it
                  // catches the eye without becoming wallpaper.
                  rotate: [0, -14, 12, -8, 6, 0],
                  transition: { duration: 1.1, repeat: Infinity, repeatDelay: 5 },
                }
          }
        >
          {open ? <X size={22} /> : <MessageSquare size={22} />}
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-purple-400 ring-2 ring-black animate-pulse" />
          )}
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ask my work"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="fixed z-50 bg-gray-900 border border-gray-800 shadow-2xl flex flex-col
                       inset-x-3 bottom-24 top-16 rounded-xl
                       sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-24 sm:w-[26rem] sm:h-[34rem]"
          >
            <div className="flex items-start justify-between gap-4 p-5 border-b border-gray-800">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Ask my <span className="text-purple-500">work</span>
                </h3>
                <span className="inline-flex items-center gap-2 text-gray-500 text-xs mt-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      offline ? "bg-gray-600" : "bg-purple-500"
                    }`}
                  />
                  {statusLine}
                </span>
              </div>
              <button
                onClick={toggle}
                aria-label="Close"
                className="text-gray-500 hover:text-white transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-5">
              {turns.length === 0 && (
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  I answer from a grounded record of what Vichaksha has actually
                  built — and I say so when I do not know.
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-5">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                    disabled={busy}
                    className="text-left text-xs text-gray-300 border border-gray-800 bg-black px-3 py-1.5 rounded-full hover:border-purple-500 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                {turns.map((turn, i) =>
                  turn.role === "user" ? (
                    <div
                      key={i}
                      className="self-end max-w-[85%] bg-gray-800 text-white text-sm rounded-xl px-3.5 py-2.5"
                    >
                      {turn.text}
                    </div>
                  ) : (
                    <div key={i} className="self-start w-full">
                      <div className="border-l-2 border-purple-500 pl-3.5">
                        <p className="text-gray-300 text-sm leading-relaxed mb-2">
                          {turn.answer}
                        </p>

                        {turn.sources?.length > 0 && (
                          <p className="text-gray-500 text-xs mb-1.5">
                            source: {turn.sources.join(" · ")}
                          </p>
                        )}

                        {turn.tools?.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 text-gray-500 text-xs pt-1.5 border-t border-gray-800">
                            <ChevronRight size={11} className="text-purple-500" />
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
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="p-4 border-t border-gray-800"
            >
              <div className="flex items-center gap-2 border border-gray-800 bg-black rounded-full pl-4 pr-1.5 py-1.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  aria-label="Ask a question about my work"
                  className="flex-grow bg-transparent text-white text-sm placeholder-gray-500 outline-none py-1.5"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send question"
                  className="w-8 h-8 shrink-0 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors"
                >
                  {busy ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <ArrowRight size={14} />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskMyWork;
