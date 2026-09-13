import React from "react";
import { motion } from "framer-motion";

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

const Skills = () => (
  <section id="skills" className="py-24 bg-black">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
          My <span className="text-purple-500">Skills</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Ordered by how much of it is backed by something shipped.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {groups.map((group, i) => (
          <motion.div
            key={group.key}
            className="bg-gray-900/90 border border-gray-800 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <div className="w-7 h-0.5 bg-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-1">{group.title}</h3>
            <p className="text-gray-500 text-sm mb-5">{group.blurb}</p>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-sm bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
