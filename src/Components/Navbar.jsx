import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [{ id: "projects", label: "Work" }, { id: "about", label: "About" }, { id: "experience", label: "Experience" }, { id: "research", label: "Research" }];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 16);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => { window.removeEventListener("scroll", scroll); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const dismiss = (e) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (e.type === "pointerdown" && !navRef.current?.contains(e.target)) setOpen(false);
    };
    const resize = () => { if (window.innerWidth > 800) setOpen(false); };
    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("keydown", dismiss); window.removeEventListener("pointerdown", dismiss); window.removeEventListener("resize", resize); };
  }, [open]);
  return (
    <header ref={navRef} className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="page-shell nav-inner" aria-label="Main navigation">
        <a href="#home" className="wordmark" aria-label="Vichaksha, home" onClick={() => setOpen(false)}>vichaksha<span className="wordmark-dot">.</span></a>
        <div id="main-nav-links" className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="#contact" className="nav-contact" onClick={() => setOpen(false)}>Let’s connect <ArrowUpRight size={15} /></a>
        </div>
        <button ref={toggleRef} className="mobile-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-nav-links" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </nav>
    </header>
  );
}
