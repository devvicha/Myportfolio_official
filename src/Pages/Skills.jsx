import React, { useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("all");

  // --- Data ----------------------------------------------------
  const skills = [
    // Backend (primary)
    { name: "Spring Boot", category: "backend", proficiency: 80 },
    { name: "MongoDB", category: "backend", proficiency: 70 },
    { name: "API Development (REST)", category: "backend", proficiency: 75 },

    // AI / ML & NLP (second)
    { name: "Python (ML/AI)", category: "ai-ml", proficiency: 85 },
    { name: "PyTorch / TensorFlow", category: "ai-ml", proficiency: 75 },
    { name: "HuggingFace Transformers", category: "ai-ml", proficiency: 70 },
    { name: "LLM Fine-tuning (LoRA/PEFT)", category: "ai-ml", proficiency: 68 },
    { name: "Whisper ASR / Speech", category: "ai-ml", proficiency: 62 },
    { name: "LangChain / OpenAI API", category: "ai-ml", proficiency: 60 },

    // IoT & Embedded
    { name: "Raspberry Pi / ESP32", category: "iot", proficiency: 75 },
    { name: "Computer Vision for IoT", category: "iot", proficiency: 70 },
    { name: "RFID / Face Recognition", category: "iot", proficiency: 65 },

    // Frontend (supporting)
    { name: "HTML/CSS", category: "frontend", proficiency: 90 },
    { name: "JavaScript", category: "frontend", proficiency: 80 },
    { name: "React", category: "frontend", proficiency: 70 },
    { name: "Tailwind CSS", category: "frontend", proficiency: 70 },

    // Tools & Platforms
    { name: "Git/GitHub", category: "tools", proficiency: 85 },
    { name: "VS Code", category: "tools", proficiency: 95 },
    { name: "Figma", category: "tools", proficiency: 90 },
    { name: "Docker", category: "tools", proficiency: 65 },
  ];

  // Tab order (as requested)
  const tabs = ["all", "backend", "ai-ml", "iot", "frontend", "tools"];
  const tabLabels = {
    all: "All",
    backend: "Backend",
    "ai-ml": "AI/ML & NLP",
    iot: "IoT & Embedded",
    frontend: "Frontend",
    tools: "Tools",
  };

  // --- Filtering ------------------------------------------------
  const filteredSkills =
    activeTab === "all" ? skills : skills.filter((s) => s.category === activeTab);

  // --- Animations ----------------------------------------------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // --- Render ---------------------------------------------------
  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="text-purple-500">Skills</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-900/50 backdrop-blur-sm p-1 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                className={`py-2 px-5 rounded-full text-sm md:text-base transition-colors duration-300 ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={`${skill.category}-${skill.name}`}
              className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              variants={itemVariants}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">{skill.name}</h3>
                <span className="text-sm text-gray-400">{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
