import { motion, useReducedMotion } from "framer-motion";
import "../styles/story.css";

// Keep production, research and tested workflows distinct; no proficiency scores.
const groups = [
  {
    key: "production-ai",
    title: "Conversational AI",
    blurb: "Production chatbots and tested agent workflows.",
    items: [
      "LLM agents",
      "LangChain",
      "Prompt engineering",
      "RAG & grounding (tested)",
      "Hallucination reduction",
      "Knowledge grounding",
      "Guardrails in code",
      "Function / tool calling",
      "Agent workflow testing",
      "Incident replay testing",
      "MCP integrations (tested)",
      "Token-cost optimisation",
      "Chat agent recommendations",
      "Human escalation design",
    ],
  },
  {
    key: "ml",
    title: "Machine Learning",
    blurb: "Model training and research experience.",
    items: [
      "PyTorch",
      "HuggingFace Transformers",
      "Model / LLM fine-tuning",
      "Quantization (research)",
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
    blurb: "Platforms used across speech and chat systems.",
    items: [
      "Google Vertex AI",
      "Gemini Live API",
      "Azure AI Speech",
      "OpenAI API",
      "Meta WhatsApp Cloud API",
      "LangSmith tracing",
    ],
  },
  {
    key: "backend",
    title: "Backend & Infrastructure",
    blurb: "Agent services, context and operational visibility.",
    items: [
      "Python / FastAPI",
      "Node.js",
      "PostgreSQL",
      "SQL context management",
      "Redis",
      "Docker",
      "Google Cloud Run",
      "GitHub Actions",
      "REST APIs",
      "Observability & dead-letter queues",
    ],
  },
  {
    key: "frontend",
    title: "Frontend",
    blurb: "Interfaces and dashboards connected to agent backends.",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "React Native"],
  },
  {
    key: "hardware",
    title: "Embedded & Industrial",
    blurb: "Sensors, controllers and industrial protocols.",
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
          <p className="story-heading-copy">Grouped by how I have actually used them: shipped in production, trained in research, or tested but not yet deployed.</p>
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
