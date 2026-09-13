import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import mycv from "../assets/CV.pdf";
import "../styles/story.css";

export default function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="story-section story-about" aria-labelledby="about-heading">
      <motion.div
        className="page-shell story-about-grid"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
      >
        <div className="story-about-statement">
          <p className="section-label">A little context</p>
          <h2 id="about-heading" className="section-title">Curious by nature.<br />Engineer by practice.</h2>
          <div className="story-about-note">
            <span className="story-note-line" aria-hidden="true" />
            <p>“The model chooses the words.<br />Code decides the facts.”</p>
          </div>
        </div>

        <div className="story-about-copy">
          <p className="story-lead">I build agents that have to be right.</p>
          <p>I’m an Associate AI/ML Engineer, following an internship at Surge Robotics. I build conversational agents with LangChain, alongside WhatsApp order agents on Meta’s official Cloud API and voice agents on Gemini Live. My users speak Sinhala, Tamil and English, often in the same sentence.</p>
          <p>My focus is robust, cost-efficient chatbots that reduce hallucinations: let the model handle the conversation, and let code verify the facts. I work with SQL tables for context, monitoring tools and recommendation systems for chat agents.</p>
          <p>I’ve tested RAG systems, agent workflows, tool calling and MCP server integrations for order management and tracking, connecting them with dashboards and backend databases.</p>
          <p>My research background includes model and LLM fine-tuning and quantization, with work on Whisper LoRA for Sinhala speech. I also work with YOLO pose estimation for garment measurement, ESP32 sensors and industrial PLC protocols.</p>
          <div className="story-about-actions">
            <a href="#contact" className="button button-dark">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href={mycv} download="Vichaksha-Geekiyanage-CV.pdf" className="text-link">Download CV <ArrowDownToLine size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
