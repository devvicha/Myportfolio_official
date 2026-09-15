import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, AudioLines, MoveUpRight } from "lucide-react";
import meImage from "../assets/me1-restored.webp";

export default function Hero() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 100, damping: 25 });
  const rotateY = useSpring(x, { stiffness: 100, damping: 25 });
  const move = (event) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * -5);
  };
  const entrance = { initial: { opacity: 0, y: reduced ? 0 : 20 }, animate: { opacity: 1, y: 0 } };
  return (
    <section id="home" className="hero-section">
      <div className="page-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.p {...entrance} transition={{ duration: 0.6 }} className="hero-eyebrow"><span className="status-dot" /> AI ENGINEER · PRODUCTION CONVERSATIONAL SYSTEMS</motion.p>
            <motion.h1 {...entrance} transition={{ duration: 0.7, delay: 0.08 }}>Intelligence.<br />Made <span className="hero-human">human<svg viewBox="0 0 360 18" aria-hidden="true"><path d="M4 12 Q162 -2 355 8" /></svg></span>.</motion.h1>
            <motion.div {...entrance} transition={{ duration: 0.7, delay: 0.16 }}>
              <p className="hero-intro">Hi, I’m Vichaksha.<span className="hello-mark" aria-hidden="true">✳</span></p>
              <p className="hero-description">I build conversational agents that run in production.<br className="desktop-break" /> WhatsApp and voice, in Sinhala, Tamil and English,<br className="desktop-break" /> with code that checks what the model says.</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#projects">Explore my work <ArrowUpRight size={18} /></a>
                <a className="hero-contact-link" href="#contact">Let’s talk <ArrowUpRight size={17} /></a>
              </div>
            </motion.div>
            <motion.div {...entrance} transition={{ duration: 0.7, delay: 0.24 }} className="hero-location"><span>BASED IN COLOMBO, SRI LANKA</span><span className="hero-location-line" /><span>BUILDING FOR SINHALA, TAMIL AND ENGLISH</span></motion.div>
          </div>
          <motion.div {...entrance} transition={{ duration: 0.9, delay: 0.14 }} className="hero-art-wrap" onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
            <motion.div className="hero-art" style={reduced ? {} : { rotateX, rotateY }}>
              <div className="portrait-meta"><span>WHATSAPP AND VOICE AGENTS,<br />LIVE IN PRODUCTION.</span><MoveUpRight size={24} strokeWidth={1.3} /></div>
              <div className="portrait-rings" aria-hidden="true"><i /><i /><i /></div>
              <span className="portrait-word" aria-hidden="true">hello.</span>
              <img className="hero-portrait" src={meImage} alt="Vichaksha Viduranga working on his laptop" width="760" height="820" fetchPriority="high" />
              <div className="portrait-caption"><span>Vichaksha Viduranga</span><span>AI Engineer, Surge Robotics</span></div>
            </motion.div>
            <a className="voice-preview" href="https://voice-agent-frontend-5mtolu2zcq-uc.a.run.app/" target="_blank" rel="noopener noreferrer">
              <span className="voice-preview-icon"><AudioLines size={23} /></span>
              <span><strong>Talk to one instead of reading about it.</strong><small>Try the multilingual voice agent <ArrowUpRight size={13} /></small></span>
            </a>
          </motion.div>
        </div>
        <div className="hero-bottom">
          <a href="#projects" className="scroll-hint"><span className="scroll-icon"><ArrowDown size={16} /></span>SCROLL TO EXPLORE</a>
          <div className="hero-specialties"><span>CONVERSATIONAL AI</span><span className="specialty-dot">/</span><span>APPLIED ML</span><span className="specialty-dot">/</span><span>FULL-STACK SYSTEMS</span></div>
          <span className="hero-edition">PORTFOLIO ’26</span>
        </div>
      </div>
    </section>
  );
}
