import React from "react";
import { motion } from "framer-motion";

// Every number here is checkable against a real artifact — that is the point of
// the section. Do not add one that cannot be pointed at.
const proof = [
  { value: "603", label: "tests passing on the production order agent" },
  { value: "4", label: "agent personas live on Cloud Run" },
  { value: "20,244", label: "training steps, Whisper LoRA Sinhala fine-tune" },
  { value: "3", label: "languages — Sinhala, Tamil, English" },
];

const ProofStrip = () => (
  <section className="py-12 bg-black border-y border-gray-900" aria-label="Key numbers">
    <div className="container mx-auto px-6">
      <p className="text-gray-500 text-xs tracking-[0.1em] uppercase mb-7">
        Verifiable, not adjectives
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {proof.map((item, i) => (
          <motion.div
            key={item.value + item.label}
            className="bg-gray-900/90 border border-gray-800 rounded-xl px-6 py-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="w-6 h-px bg-purple-500 mb-4" />
            <div className="text-4xl md:text-[2.75rem] font-bold text-white tabular-nums tracking-tight leading-none mb-2.5">
              {item.value}
            </div>
            <p className="text-gray-400 text-[0.8125rem] leading-snug">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProofStrip;
