import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const roles = [
  {
    title: "AI Engineer",
    org: "Idea8 Pvt Ltd · Dialix",
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

const Experience = () => (
  <section id="experience" className="py-20 bg-black">
    <div className="container mx-auto px-6">
      <motion.div
        className="max-w-3xl mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
          Experience & <span className="text-purple-500">Education</span>
        </h2>
      </motion.div>

      <div className="max-w-4xl">
        <div className="flex items-center gap-2.5 mb-8">
          <Briefcase className="w-5 h-5 text-purple-500" />
          <h3 className="text-xl font-semibold text-white">Experience</h3>
        </div>

        <div className="flex flex-col gap-6 mb-16">
          {roles.map((role, i) => (
            <motion.div
              key={role.title + role.org}
              className="bg-gray-900/90 border border-gray-800 rounded-xl p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h4 className="text-xl font-semibold text-white">{role.title}</h4>
                <span className="text-gray-500 text-sm shrink-0">{role.period}</span>
              </div>
              <p className="text-purple-400 text-sm mb-4">{role.org}</p>
              <ul className="flex flex-col gap-2.5">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3 text-gray-400 leading-relaxed">
                    <span className="text-purple-500 shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2.5 mb-8">
          <GraduationCap className="w-5 h-5 text-purple-500" />
          <h3 className="text-xl font-semibold text-white">Education</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((item) => (
            <motion.div
              key={item.title}
              className="bg-gray-900/90 border border-gray-800 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-purple-400 text-sm mb-1">{item.org}</p>
              <p className="text-gray-500 text-sm">{item.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
