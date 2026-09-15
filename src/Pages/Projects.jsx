import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, Check, Code2, Cpu, MessageCircle, Plus, X } from "lucide-react";
import { projects } from "../assets/projects";
import "../styles/projects.css";

const filters = [{ id: "featured", label: "Selected work" }, { id: "ai", label: "AI & agents" }, { id: "systems", label: "Systems & hardware" }, { id: "web", label: "Web experiences" }];
const featured = ["whatsapp-agent", "voice-agent", "whisper-lora", "smart-desk"];
const shortTitles = { "whatsapp-agent": "Conversations to commerce.", "voice-agent": "A voice that understands.", "whisper-lora": "Giving Sinhala a voice.", "smart-desk": "A workspace that listens." };
const categories = { ai: "APPLIED AI", systems: "CONNECTED SYSTEMS", web: "WEB DEVELOPMENT" };

function ProjectVisual({ project }) {
  if (project.id === "whatsapp-agent") return (
    <div className="project-visual visual-commerce" aria-hidden="true">
      <div className="commerce-brand"><MessageCircle size={16} /><span>client project</span></div>
      <div className="commerce-flow"><div className="flow-message"><span className="flow-avatar"><MessageCircle size={15} /></span><div><strong>Every conversation.<br />A little more capable.</strong><span>Sinhala · Tamil · English</span></div></div><div className="flow-connector" /><div className="flow-verified"><span><Check size={15} /></span><div>Language from the model.<br /><strong>Facts from the code.</strong></div><span className="flow-mini-lines"><i /><i /><i /></span></div></div>
      <span className="visual-footnote">CONVERSATIONAL COMMERCE / SYSTEM OVERVIEW</span>
    </div>
  );
  if (project.id === "voice-agent") return (
    <div className="project-visual visual-voice" aria-hidden="true"><div className="voice-visual-label"><AudioLines size={17} /><span>Natural by design.</span></div><div className="voice-wave">{Array.from({ length: 45 }, (_, i) => <i key={i} style={{ "--height": `${12 + Math.pow(Math.sin(i * 0.42), 2) * (83 - Math.abs(22 - i) * 2.9)}px`, "--delay": `${i * 35}ms` }} />)}</div><div className="voice-languages"><span>ආයුබෝවන්</span><span>Hello</span><span>வணக்கம்</span></div><span className="visual-footnote">FOUR PERSONAS. ONE CONVERSATION ENGINE.</span></div>
  );
  if (project.id === "whisper-lora") return (
    <div className="project-visual visual-speech" aria-hidden="true"><span className="speech-kicker">LOW-RESOURCE LANGUAGE. HIGH POTENTIAL.</span><span className="speech-type">සිංහල<span>.</span></span><div className="speech-bottom"><span>Whisper × LoRA</span><span>Sound → understanding <ArrowUpRight size={13} /></span></div></div>
  );
  if (project.image) return <div className="project-visual visual-image"><img src={project.image} alt={`${project.title} project preview`} loading="lazy" width="600" height="350" /></div>;
  return <div className={`project-visual visual-system ${project.category === "web" ? "visual-web" : ""}`} aria-hidden="true"><span className="system-kicker">{categories[project.category]}</span><div className="system-symbol">{project.category === "systems" ? <Cpu strokeWidth={.7} /> : <Code2 strokeWidth={.7} />}</div><span className="system-caption">{project.technologies.slice(0, 3).join(" / ")}</span></div>;
}

function ProjectDetails({ project, close }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    const before = document.activeElement;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => { node.close(); document.body.style.overflow = overflow; before?.focus(); };
  }, []);
  return (
    <dialog className="project-dialog" ref={dialog} aria-labelledby="project-dialog-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
      <button className="project-dialog-close" onClick={close} aria-label="Close project details" autoFocus><X size={20} /></button>
      <ProjectVisual project={project} />
      <div className="project-dialog-body"><p className="section-label">{categories[project.category]} / PROJECT NOTES</p><h2 id="project-dialog-title">{project.title}</h2><p className="project-dialog-tagline">{project.tagline}</p><p className="project-dialog-description">{project.description}</p>
        <div className="project-metrics">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
        <div className="project-tech"><span>BUILT WITH</span><div>{project.technologies.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div></div>
        <div className="project-dialog-links">{project.demoLink && <a className="button button-dark" href={project.demoLink} target="_blank" rel="noopener noreferrer">{"Open project"}<ArrowUpRight size={16} /></a>}{project.codeLink && <a className="button button-light" href={project.codeLink} target="_blank" rel="noopener noreferrer">View source <Code2 size={16} /></a>}{project.tryLink && <a className="text-link" href={project.tryLink} target="_blank" rel="noopener noreferrer">{project.tryLabel}<ArrowUpRight size={15} /></a>}</div>
        {project.tryNote && <p className="project-private-note">{project.tryNote}</p>}
        {!project.demoLink && !project.codeLink && !project.tryLink && <p className="project-private-note">This work lives in a private repository. <a href="#contact" onClick={close}>Get in touch for a walkthrough <ArrowUpRight size={13} /></a></p>}
      </div>
    </dialog>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("featured");
  const [selected, setSelected] = useState(null);
  const [position, setPosition] = useState({ start: true, end: false });
  const track = useRef(null);
  const reduced = useReducedMotion();
  const items = filter === "featured" ? featured.map((id) => projects.find((p) => p.id === id)) : projects.filter((p) => p.category === filter);
  useEffect(() => {
    const node = track.current;
    const measure = () => setPosition({ start: node.scrollLeft < 8, end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 8 });
    node.scrollTo({ left: 0, behavior: "instant" });
    measure();
    node.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => { node.removeEventListener("scroll", measure); observer.disconnect(); };
  }, [filter]);
  const step = (direction) => {
    const card = track.current.querySelector("article");
    track.current.scrollBy({ left: direction * ((card?.offsetWidth || 440) + 24), behavior: reduced ? "instant" : "smooth" });
  };
  return (
    <section id="projects" className="work-section">
      <div className="page-shell">
        <motion.div className="work-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }}>
          <div><p className="section-label">01 / SELECTED WORK</p><h2 className="section-title">Built with purpose.<br /><span>Tested by the real world.</span></h2></div>
          <div className="work-heading-aside"><p>From the first conversation to the last line of code. A few things I’ve helped bring to life.</p><a className="text-link" href="https://github.com/devvicha" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={16} /></a></div>
        </motion.div>
        <div className="work-toolbar"><div className="work-filters" role="group" aria-label="Filter projects">{filters.map(({ id, label }) => <button key={id} aria-pressed={id === filter} onClick={() => setFilter(id)}>{label}<span>{id === "featured" ? featured.length : projects.filter((p) => p.category === id).length}</span></button>)}</div><span className="work-index">DRAG OR SCROLL ↘</span></div>
        <div className="project-track" key={filter} ref={track} tabIndex={0} role="region" aria-roledescription="carousel" aria-label={`${filters.find((f) => f.id === filter).label} projects`} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1); } }}>
          {items.map((project, index) => <article className="project-card" key={project.id}>
            <button className="project-card-button" onClick={() => setSelected(project)} aria-label={`Explore ${project.title}`}><ProjectVisual project={project} /><div className="project-card-copy"><div className="project-card-topline"><span>{categories[project.category]}</span><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{shortTitles[project.id] || project.title}</h3><p>{shortTitles[project.id] ? project.title : project.tagline}</p><div className="project-card-bottom"><span>{project.technologies.slice(0, 3).join(" · ")}</span><span className="project-open-icon"><Plus size={19} /></span></div></div></button>
          </article>)}
        </div>
        <div className="work-bottom"><p><span className="status-dot" /> Real projects. Actual code. Lessons included.</p><div className="carousel-controls"><span>{String(items.length).padStart(2, "0")} PROJECTS</span><button className="carousel-arrow" disabled={position.start} onClick={() => step(-1)} aria-label="Previous projects"><ArrowLeft size={19} /></button><button className="carousel-arrow" disabled={position.end} onClick={() => step(1)} aria-label="Next projects"><ArrowRight size={19} /></button></div></div>
        <span className="sr-only" aria-live="polite">{items.length} projects in {filters.find((f) => f.id === filter).label}</span>
      </div>
      {selected && <ProjectDetails project={selected} close={() => setSelected(null)} />}
    </section>
  );
}
