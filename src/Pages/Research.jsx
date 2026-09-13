import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import sicetAward from "../assets/sicet-award.jpg";
import sicetConference from "../assets/sicet-conference.jpg";
import "../styles/story.css";

// Every entry needs a status. An unlabelled "under review" paper a reader
// cannot find reads as inflation, which costs more than the line gains.
const papers = [
  {
    title:
      "Enhancing Copyright Detection through Lyrics Analysis in Sinhala Song Audio",
    venue:
      "5th SLIIT International Conference on Engineering and Technology (SICET 2026) — Malabe, Sri Lanka, 1–4 September 2026",
    status: "Published — Scopus indexed",
    authors:
      "Vichaksha Geekiyanage, Basuru Jagadakshi, Tharusha Piumitha, Chinthanie Weerakoon",
    note:
      "Copyright detection over Sinhala song audio by transcribing lyrics and analysing them — the applied end of the same low-resource speech problem as the Whisper LoRA fine-tune, which supplies the Sinhala transcription this depends on.",
    link:
      "https://www.linkedin.com/posts/vichaksha-geekiyanage-a3b293227_sicet2026-ai-ml-activity-7501471986838122497-iXPs",
    images: [
      { src: sicetConference, alt: "Presenting at SICET 2026, SLIIT Faculty of Engineering" },
      { src: sicetAward, alt: "SICET 2026 author badge and certificate of participation" },
    ],
  },
];

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

export default function Research() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="research" className="story-section story-research" aria-labelledby="research-heading">
      <div className="page-shell">
        <div className="section-heading story-split-heading">
          <div>
            <p className="section-label">Research & writing</p>
            <h2 id="research-heading" className="section-title">Thinking beyond<br />the build.</h2>
          </div>
          <p className="story-heading-copy">Exploring low-resource languages, documenting decisions, and making the next version better.</p>
        </div>

        {papers.map((paper) => (
          <motion.article
            className="story-publication"
            key={paper.title}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <div className="story-publication-image">
              <img src={paper.images[0].src} alt={paper.images[0].alt} loading="lazy" width="731" height="1300" />
              <span className="story-photo-label">SICET 2026 · Malabe, Sri Lanka</span>
            </div>
            <div className="story-publication-content">
              <div className="story-publication-meta"><span className="section-label">Peer-reviewed publication</span><span className="story-publication-year">2026</span></div>
              <h3>{paper.title}</h3>
              <span className="story-publication-status"><span aria-hidden="true" />{paper.status}</span>
              <p className="story-publication-note">{paper.note}</p>
              <details className="story-publication-details">
                <summary>Publication details <Plus size={16} aria-hidden="true" /></summary>
                <div><p>{paper.venue}</p><p className="story-authors">{paper.authors}</p><a href={paper.images[1].src} target="_blank" rel="noopener noreferrer" className="text-link">View participation certificate <ArrowUpRight size={15} aria-hidden="true" /></a></div>
              </details>
              <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-link story-publication-link">Conference announcement <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </motion.article>
        ))}

        <div className="story-writing-heading"><h3>From the engineering notebook.</h3><span className="section-label">Selected internal writing</span></div>
        <div className="story-writing-list">
          {writing.map((doc, index) => (
            <details className="story-writing-item" key={doc.title}>
              <summary>
                <span className="story-writing-number" aria-hidden="true">0{index + 1}</span>
                <span className="story-writing-title">{doc.title}</span>
                <span className="story-writing-date">{doc.date}</span>
                <Plus className="story-writing-plus" size={19} aria-hidden="true" />
              </summary>
              <div className="story-writing-content"><p>{doc.summary}</p><div className="story-writing-tags">{doc.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
            </details>
          ))}
        </div>
        <p className="story-private-note">These documents live in private client repositories. Happy to walk through the thinking in an interview.</p>
      </div>
    </section>
  );
}
