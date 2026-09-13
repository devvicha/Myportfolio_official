import { motion, useReducedMotion } from "framer-motion";
import "../styles/story.css";

// Grouped by evidence strength, not by invented percentages. A bar claiming
// "LLM fine-tuning 68%" invites the question "68% of what?" — and a technical
// interviewer reads the answer as naive.
const groups = [
  {
    key: "production-ai",
    title: "Production AI",
    blurb: "What I do daily, in front of real users.",
    items: [
      "LLM agents",
      "Prompt engineering",
      "RAG & knowledge grounding",
      "Hallucination prevention",
      "Function / tool calling",
      "Token-cost optimisation",
      "Human escalation design",
    ],
  },
  {
    key: "ml",
    title: "Machine Learning",
    blurb: "Models I have trained, not only called.",
    items: [
      "PyTorch",
      "HuggingFace Transformers",
      "PEFT / LoRA",
      "Whisper ASR",
      "YOLO pose & detection",
      "OpenCV",
      "FAISS",
    ],
  },
  {
    key: "platforms",
    title: "AI Platforms",
    blurb: "Shipped on all of these.",
    items: [
      "Google Vertex AI",
      "Gemini Live API",
      "Azure AI Speech",
      "OpenAI API",
      "Meta WhatsApp Cloud API",
    ],
  },
  {
    key: "backend",
    title: "Backend & Infrastructure",
    blurb: "Where the agents actually run.",
    items: [
      "Python / FastAPI",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Google Cloud Run",
      "GitHub Actions",
      "REST APIs",
    ],
  },
  {
    key: "frontend",
    title: "Frontend",
    blurb: "Interfaces for the systems above.",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "React Native"],
  },
  {
    key: "hardware",
    title: "Embedded & Industrial",
    blurb: "Where software meets hardware.",
    items: ["ESP32", "Raspberry Pi", "OPC UA", "Snap7 (Siemens S7)", "Charuco calibration"],
  },
];

export default function Skills() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="skills" className="story-section story-skills" aria-labelledby="skills-heading">
      <div className="page-shell">
        <div className="section-heading story-split-heading">
          <div>
            <p className="section-label">Tools & expertise</p>
            <h2 id="skills-heading" className="section-title">A practical toolkit.</h2>
          </div>
          <p className="story-heading-copy">From model to interface, with the infrastructure to make it useful. Ordered by the work I’ve shipped.</p>
        </div>
        <div className="story-skill-groups">
          {groups.map((group, index) => (
            <motion.div
              className="story-skill-group"
              key={group.key}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
            >
              <span className="story-skill-number" aria-hidden="true">0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.blurb}</p>
              <ul className="story-skill-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
