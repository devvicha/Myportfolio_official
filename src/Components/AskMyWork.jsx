import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Loader2, Sparkles, X } from "lucide-react";
import { ASK_MAX_LENGTH, getAskEndpoint, requestAnswer } from "../lib/askApi";
import "../styles/integrations.css";

const API_URL = import.meta.env.VITE_ASK_API_URL;
const SUGGESTIONS = [
  "How does he prevent hallucinations in production?",
  "Has he ever broken production?",
  "What has he fine-tuned?",
  "Does he know Azure or Microsoft tooling?",
];

// Saved notes retain the source references from the original project record.
const SAVED_ANSWERS = {
  [SUGGESTIONS[0]]: {
    answer:
      "After a customer was quoted the wrong price in production, Vichaksha built a fact firewall: the model identifies the item, and pricing.js determines its price. It first shipped in audit mode to log violations before blocking replies, so the team could check for false positives.",
    sources: ["factFirewall.js", "pricing.js"],
  },
  [SUGGESTIONS[1]]: {
    answer:
      "Yes. In July 2026, the production WhatsApp number was blocked for two days, leaving around 1,500 customer messages queued. He traced the incident to an unofficial client library, documented the postmortem, and drove the migration to Meta’s official Cloud API.",
    sources: ["WHATSAPP-BAN-INCIDENT-2026-07.md"],
  },
  [SUGGESTIONS[2]]: {
    answer:
      "He fine-tuned Whisper large-v2 for Sinhala using LoRA adapters, with rank 32 and alpha 64, targeting attention projections. Training ran for 20,244 steps, with training loss falling from 2.17 to about 0.12. He also trained YOLO pose and segmentation models on a self-collected garment dataset.",
    sources: ["Whisper-Fine-Tuning-For-Sinhala"],
  },
  [SUGGESTIONS[3]]: {
    answer:
      "He has shipped Azure AI Speech in production, using the Speech SDK in three voice projects alongside OpenAI and Gemini. His project record does not include Azure OpenAI, AI Foundry, Entra ID, Copilot Studio, or Power Automate. His experience with grounded answers, typed API actions, topic routing, and human escalation comes from other stacks.",
    sources: ["check_stack: azure → partial", "check_stack: copilot studio → no"],
  },
};

function savedResponse(question, unavailable = false) {
  const saved = SAVED_ANSWERS[question];
  return {
    role: "assistant",
    saved: true,
    answer: saved?.answer || (unavailable
      ? "The live assistant couldn’t be reached. The suggested questions have saved answers you can read now, or you can contact Vichaksha directly."
      : "The live assistant is not connected. Choose one of the suggested questions to explore saved project notes, or contact Vichaksha directly."),
    sources: saved?.sources || [],
    tools: [],
  };
}

export default function AskMyWork() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState([]);
  const [busy, setBusy] = useState(false);
  const [connection, setConnection] = useState(getAskEndpoint(API_URL) ? "ready" : "offline");
  const [model, setModel] = useState(null);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const requestRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener("open-ask-my-work", openPanel);
    return () => window.removeEventListener("open-ask-my-work", openPanel);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus({ preventScroll: true });
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  useEffect(() => {
    if (open && turns.length) endRef.current?.scrollIntoView({ block: "nearest" });
  }, [turns, busy, open]);

  useEffect(() => () => requestRef.current?.abort(), []);

  async function ask(question) {
    const q = question.trim();
    if (!q || q.length > ASK_MAX_LENGTH || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setInput("");
    setTurns((previous) => [...previous, { role: "user", text: q }]);

    if (!getAskEndpoint(API_URL)) {
      setTurns((previous) => [...previous, savedResponse(q)]);
      busyRef.current = false;
      setBusy(false);
      inputRef.current?.focus({ preventScroll: true });
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    try {
      const answer = await requestAnswer(API_URL, q, { signal: controller.signal });
      if (controller.signal.aborted) return;
      setTurns((previous) => [...previous, { role: "assistant", ...answer }]);
      setConnection(answer.mode === "live" ? "connected" : answer.mode === "mock" ? "mock" : "ready");
      setModel(answer.mode === "live" ? answer.model : null);
    } catch {
      if (controller.signal.aborted) return;
      setConnection("unavailable");
      setTurns((previous) => [...previous, savedResponse(q, true)]);
    } finally {
      busyRef.current = false;
      if (!controller.signal.aborted) setBusy(false);
      requestRef.current = null;
    }
  }

  const status = {
    ready: "Ask about the projects behind this portfolio",
    connected: model ? `Connected · ${model}` : "Connected to the project assistant",
    mock: "Demo mode · no AI model was called",
    offline: "Live assistant not connected · saved answers available",
    unavailable: "Live assistant unavailable · saved answers available",
  }[connection];

  return (
    <>
      <div id="ask" aria-hidden="true" />
      <button
        type="button"
        className="portfolio-ai-launcher"
        aria-label="Ask my AI about my work"
        aria-expanded={open}
        aria-controls="portfolio-ai-dialog"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Sparkles size={17} aria-hidden="true" />
        <span>Ask my AI</span>
        <span className={`portfolio-ai-dot ${connection === "connected" ? "is-connected" : ""}`} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id="portfolio-ai-dialog"
        className="portfolio-ai-dialog"
        aria-labelledby="portfolio-ai-title"
        aria-describedby="portfolio-ai-status"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpen(false);
          }
        }}
      >
        <div className="portfolio-ai-header">
          <div className="portfolio-ai-avatar"><Sparkles size={21} aria-hidden="true" /></div>
          <div className="portfolio-ai-heading">
            <h2 id="portfolio-ai-title">A little more context.</h2>
            <p id="portfolio-ai-status">{status}</p>
          </div>
          <button type="button" className="portfolio-ai-close" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={19} /></button>
        </div>

        <div className="portfolio-ai-scroll">
          <div className="portfolio-ai-intro">
            <span className="section-label">BEHIND THE WORK</span>
            <p>Curious about a project?<br />Let’s get into the details.</p>
            <span>Explore the decisions, tools, and lessons behind what I’ve built.</span>
          </div>
          <div className="portfolio-ai-suggestions" aria-label="Suggested questions">
            {SUGGESTIONS.map((question) => (
              <button key={question} type="button" onClick={() => ask(question)} disabled={busy}>
                <span>{question}</span><ArrowUpRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="portfolio-ai-turns" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">
            {turns.map((turn, index) => turn.role === "user" ? (
              <div key={index} className="portfolio-ai-question"><span className="portfolio-visually-hidden">You: </span>{turn.text}</div>
            ) : (
              <div key={index} className="portfolio-ai-answer">
                <span className="portfolio-ai-answer-label"><Sparkles size={12} aria-hidden="true" />{turn.saved ? "SAVED PROJECT NOTE" : turn.mode === "mock" ? "DEMO RESPONSE" : turn.mode === "static" ? "INTRODUCTION" : turn.grounded ? "PROJECT ASSISTANT" : "NOT VERIFIED IN THE RECORDS"}</span>
                <p>{turn.answer}</p>
                {turn.sources.length > 0 ? (
                  <details className="portfolio-ai-sources">
                    <summary><BookOpen size={13} aria-hidden="true" />{turn.sources.length} source{turn.sources.length > 1 ? "s" : ""}</summary>
                    <ul>{turn.sources.map((source, sourceIndex) => <li key={`${source}-${sourceIndex}`}>{source}</li>)}</ul>
                    {turn.tools.length > 0 && <div className="portfolio-ai-tools"><span>Tools used</span>{turn.tools.map((tool, toolIndex) => <code key={`${tool}-${toolIndex}`}>{tool}</code>)}</div>}
                  </details>
                ) : !turn.saved && <span className="portfolio-ai-no-sources">No source references returned with this answer.</span>}
              </div>
            ))}
            {busy && <div className="portfolio-ai-thinking" role="status"><Loader2 size={14} className="portfolio-spin" aria-hidden="true" />Looking through my project records…</div>}
            <div ref={endRef} />
          </div>
        </div>

        <form className="portfolio-ai-form" onSubmit={(event) => { event.preventDefault(); ask(input); }}>
          <div className="portfolio-ai-input-wrap">
            <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} maxLength={ASK_MAX_LENGTH} placeholder="What would you like to know?" aria-label="Your question about my work" autoComplete="off" />
            <button type="submit" aria-label="Send question" disabled={busy || !input.trim()}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
          <p>Prefer a conversation? <a href="#contact" onClick={() => setOpen(false)}>Get in touch <ArrowUpRight size={11} aria-hidden="true" /></a></p>
        </form>
      </dialog>
    </>
  );
}
