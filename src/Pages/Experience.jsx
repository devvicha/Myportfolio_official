import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import "../styles/story.css";

const roles = [
  {
    title: "AI Engineer",
    org: "Idea8 Pvt Ltd",
    period: "2025 — present",
    points: [
      "Build and operate conversational agents for SME clients across food retail, cosmetics, banking, automotive and facilities.",
      "Largest contributor on the flagship WhatsApp order agent — structural hallucination prevention, a multi-provider LLM failover chain with per-provider circuit breakers, and a 603-test regression suite.",
      "Sole author of the FastAPI voice-agent backend now serving four configured personas on Cloud Run.",
      "Led the garment-measurement computer-vision system: YOLO pose estimation, segmentation and Charuco calibration to a 1mm target.",
      "Migrated the WhatsApp platform off an unofficial client to Meta's official Cloud API following a production ban, and wrote the postmortem.",
    ],
  },
  {
    title: "Software Engineering Intern",
    org: "NAITA",
    period: "2025",
    points: [
      "Built a Sinhala bank voice-agent simulator with a strict JSON response contract, intent and entity extraction, and domain safety rules for a regulated vertical.",
      "Wrote the production-bug resolution plan for a live cosmetics WhatsApp bot — four bugs traced to a single root cause, with a reversible remediation plan.",
      "Onboarded OPC UA and Snap7 PLC loading on an industrial SCADA control panel.",
    ],
  },
  {
    title: "Teller & Administrative Co-helper",
    org: "People's Bank — Nugegoda",
    period: "2021 — 2022",
    points: [
      "Front-line retail banking. The reason the banking agents I build know not to ask a customer for a full card number.",
    ],
  },
];

const education = [
  {
    title: "BSc (Hons) Electronic & Computer Science",
    org: "University of Kelaniya",
    period: "expected Jan 2026",
  },
  {
    title: "G.C.E. Advanced Level — Physical Science",
    org: "Nalanda College, Colombo 10",
    period: "2020",
  },
];

export default function Experience() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="experience" className="story-section story-experience" aria-labelledby="experience-heading">
      <div className="page-shell">
        <motion.div
          className="section-heading story-split-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="section-label">Experience & education</p>
            <h2 id="experience-heading" className="section-title">The work behind<br />the work.</h2>
          </div>
          <p className="story-heading-copy">From the bank counter to production AI. Every role has shaped how I build for the people on the other side of the screen.</p>
        </motion.div>

        <div className="story-timeline" aria-label="Professional experience">
          {roles.map((role, index) => (
            <details className="story-role" key={role.title + role.org}>
              <summary className="story-role-summary">
                <span className="story-role-period"><span className={`story-timeline-dot ${index === 0 ? "story-dot-current" : ""}`} aria-hidden="true" />{role.period}</span>
                <span className="story-role-main"><span className="story-role-title">{role.title}</span><span className="story-role-org">{role.org}</span></span>
                <span className="story-detail-control"><span className="story-role-view">View role</span><Plus size={20} aria-hidden="true" /></span>
              </summary>
              <div className="story-role-detail">
                <ul>{role.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
            </details>
          ))}
        </div>

        <div className="story-education">
          <h3 className="section-label">The foundations</h3>
          <div className="story-education-list">
            {education.map((item) => (
              <div className="story-education-item" key={item.title}>
                <p className="story-education-period">{item.period}</p>
                <h4>{item.title}</h4>
                <p>{item.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
