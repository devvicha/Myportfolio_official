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
          <p>Most of my work is conversational AI for real businesses: WhatsApp order agents on Meta’s official Cloud API and real-time voice agents on Gemini Live. My users speak Sinhala, Tamil and English, often in the same sentence.</p>
          <p>The interesting problem is keeping an agent from being confidently wrong about a price, a phone number or an order. I approach that through the system’s structure: let the model handle the conversation, and let code verify the facts.</p>
          <p>I also train models, from Whisper LoRA for Sinhala speech to YOLO pose estimation for garment measurement. And I still enjoy the hardware end: ESP32 sensors, industrial PLC protocols, and the space where software meets the physical world.</p>
          <div className="story-about-actions">
            <a href="#contact" className="button button-dark">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href={mycv} download="Vichaksha-Geekiyanage-CV.pdf" className="text-link">Download CV <ArrowDownToLine size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
