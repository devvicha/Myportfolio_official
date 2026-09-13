import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

// Research papers render only when this array has entries. Every entry needs a
// status — an unlabelled "under review" paper a reader cannot find reads as
// inflation, which costs more than the line gains.
const papers = [];

// Internal engineering documents. The repositories are private client work, so
// these are described, not linked.
const writing = [
  {
    title: "WhatsApp ban incident — postmortem",
    date: "July 2026",
    summary:
      "The production number was flagged for automation and blocked for two days; roughly 1,500 customer messages queued undelivered. Root cause traced to an unofficial client library, established with cited sources, alongside customer impact, the permanent remediation — migration to Meta's official Cloud API — and non-negotiable rules going forward.",
    tags: ["incident response", "root cause", "remediation"],
  },
  {
    title: "GenAI cost & architecture",
    date: "2026",
    summary:
      "A working framework for LLM spend: cost equals calls times tokens per call times price per token, so every optimisation turns exactly one of three knobs. Audits where the money actually goes, finds the system prompt dominates, and separates real savings from guesses — if someone cannot say which knob their proposal turns, they are guessing.",
    tags: ["cost engineering", "prompt caching", "model tiering"],
  },
  {
    title: "Dashboard escalation specification",
    date: "2026",
    summary:
      "A specification written for another developer on the dashboard team, defining how the bot signals that a conversation needs a human. Reuses the existing ingest endpoint, keys escalations idempotently off the triggering message id, and separates what already works with zero changes from the four additions that make escalations a first-class, filterable signal.",
    tags: ["API design", "idempotency", "cross-team spec"],
  },
  {
    title: "Media & link understanding — design document",
    date: "July 2026",
    summary:
      "Customers arriving from TikTok send a screenshot or a link and then ask for \"this item\" — which the bot could not resolve, because image content was discarded after a single receipt check. Diagnoses the failure down to the exact call site, costs video understanding at fractions of a cent per clip, and designs link resolution with an SSRF guard and size and timeout caps. Written as a plan; not yet implemented.",
    tags: ["multimodal", "SSRF guard", "design doc"],
  },
  {
    title: "Production bug resolution plan",
    date: "2026",
    summary:
      "Four production bugs on a live cosmetics WhatsApp bot traced to a single root cause — the bot had no durable state. Component-by-component audit citing exact files and lines, a bug to root-cause mapping, and a target architecture scoped at four days, additive and reversible.",
    tags: ["debugging", "architecture", "state design"],
  },
];

const Research = () => (
  <section id="research" className="py-24 bg-black">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
          Research & <span className="text-purple-500">Writing</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          How I think about systems when they break, cost money, or have to be
          handed to someone else.
        </p>
      </motion.div>

      {papers.length > 0 && (
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-semibold text-white mb-6">Papers</h3>
          <div className="flex flex-col gap-4">
            {papers.map((paper) => (
              <div
                key={paper.title}
                className="bg-gray-900/90 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h4 className="text-lg font-semibold text-white">{paper.title}</h4>
                  <span className="text-purple-400 text-xs border border-purple-900 px-2 py-1 rounded-md shrink-0">
                    {paper.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{paper.venue}</p>
                {paper.authors && (
                  <p className="text-gray-500 text-sm">{paper.authors}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5 mb-8">
          <FileText className="w-5 h-5 text-purple-500" />
          <h3 className="text-xl font-semibold text-white">
            Engineering documents
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {writing.map((doc, i) => (
            <motion.article
              key={doc.title}
              className="bg-gray-900/90 border border-gray-800 rounded-xl p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <h4 className="text-xl font-semibold text-white">{doc.title}</h4>
                <span className="text-gray-500 text-sm shrink-0">{doc.date}</span>
              </div>

              <p className="text-gray-400 leading-relaxed mb-4">{doc.summary}</p>

              <div className="flex flex-wrap gap-2">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-gray-800 text-gray-300 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-8">
          These documents live in private client repositories. Happy to walk
          through any of them in an interview.
        </p>
      </div>
    </div>
  </section>
);

export default Research;
