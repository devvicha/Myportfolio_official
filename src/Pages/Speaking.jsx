import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from "lucide-react";
import sp1 from "../assets/speaking-1.jpg";
import sp2 from "../assets/speaking-2.jpg";
import sp3 from "../assets/speaking-3.jpg";
import sp4 from "../assets/speaking-4.jpg";
import ev1 from "../assets/event-1.jpg";
import ev2 from "../assets/event-2.jpg";
import "../styles/story.css";

const photos = [
  { src: sp1, alt: "Delivering an IEEE tech talk at UoK Robotics 2024", caption: "UoK Robotics — Tech Talk (2024)" },
  { src: sp2, alt: "Robotics Club team group photo at Robot Battles event", caption: "Robot Battles — Team Photo" },
  { src: sp3, alt: "IEEE AGM 2024 executive committee formal photo", caption: "IEEE AGM 2024 — Executive Committee" },
  { src: sp4, alt: "Workshop cohort group shot on academy steps", caption: "Hands-on Workshop — Cohort" },
  { src: ev1, alt: "Industrial Electronics event banner in the hallway", caption: "Industrial Electronics — Event Poster" },
  { src: ev2, alt: "Group photo after IEEE EELS DLP campus session", caption: "IEEE EELS DLP — Campus Session" },
];

const roles = [
  { role: "Secretary", org: "IEEE Industrial Electronics Society, SB Chapter — University of Kelaniya", year: "2024" },
  { role: "Coordinator", org: "IEEE Robot Battle UOK", year: "2024" },
  { role: "Webinar Host", org: "IEEE Computer Society, SB Chapter", year: "2023" },
  { role: "Team Lead", org: "AIESEC — Incoming Global Volunteer", year: "2023" },
  { role: "Content Writing Lead", org: "Electronic & Computer Science Club, UOK", year: "2023" },
  { role: "Webinar Speaker", org: "ECSC TechnoSymphony", year: "2022" },
];

export default function Speaking() {
  const reducedMotion = useReducedMotion();
  const galleryRef = useRef(null);
  const dialogRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [galleryEdges, setGalleryEdges] = useState({ start: true, end: false });
  const isViewerOpen = openIndex !== null;

  useEffect(() => {
    const gallery = galleryRef.current;
    const updateEdges = () => setGalleryEdges({ start: gallery.scrollLeft < 8, end: gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 8 });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(gallery);
    gallery.addEventListener("scroll", updateEdges, { passive: true });
    updateEdges();
    return () => {
      observer.disconnect();
      gallery.removeEventListener("scroll", updateEdges);
    };
  }, []);

  useEffect(() => {
    if (!isViewerOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isViewerOpen]);

  const moveGallery = (direction) => {
    const gallery = galleryRef.current;
    const card = gallery.querySelector("figure");
    const gap = Number.parseFloat(getComputedStyle(gallery).columnGap) || 24;
    gallery.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reducedMotion ? "instant" : "smooth" });
  };

  const moveViewer = (direction) => setOpenIndex((index) => (index + direction + photos.length) % photos.length);
  const currentPhoto = photos[openIndex ?? 0];

  return (
    <section id="speaking" className="story-section story-speaking" aria-labelledby="speaking-heading">
      <div className="page-shell">
        <motion.div
          className="section-heading story-split-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="section-label">Speaking & community</p>
            <h2 id="speaking-heading" className="section-title">Good work happens<br />with people.</h2>
          </div>
          <p className="story-heading-copy">Sharing what I learn. Building things together. A few moments from tech talks, workshops and the communities I’ve been part of.</p>
        </motion.div>

        <div className="story-gallery" ref={galleryRef} role="region" aria-roledescription="carousel" aria-label="Community photo gallery" tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              moveGallery(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {photos.map((photo, index) => (
            <figure className="story-gallery-item" key={photo.caption} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photos.length}`}>
              <button type="button" onClick={() => setOpenIndex(index)} className="story-gallery-photo" aria-label={`Enlarge photo: ${photo.caption}`} aria-haspopup="dialog">
                <img src={photo.src} alt={photo.alt} loading="lazy" width="1400" height={index === 0 ? 1051 : index === 5 ? 787 : 933} />
                <span className="story-gallery-expand" aria-hidden="true"><ArrowUpRight size={20} /></span>
              </button>
              <figcaption><span>{photo.caption}</span><span className="story-gallery-number" aria-hidden="true">0{index + 1}</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="story-gallery-toolbar"><span>Small moments. Shared progress.</span><div className="story-gallery-controls"><button className="story-circle-button" type="button" onClick={() => moveGallery(-1)} disabled={galleryEdges.start} aria-label="Previous community photos"><ArrowLeft size={20} /></button><button className="story-circle-button" type="button" onClick={() => moveGallery(1)} disabled={galleryEdges.end} aria-label="Next community photos"><ArrowRight size={20} /></button></div></div>

        <details className="story-leadership">
          <summary><span><span className="section-label">Community roles · 2022–2024</span><span className="story-leadership-title">A little of the work behind these moments.</span></span><Plus size={22} aria-hidden="true" /></summary>
          <div className="story-leadership-list">{roles.map((item) => <div className="story-leadership-role" key={item.role + item.org}><span className="story-leadership-year">{item.year}</span><h3>{item.role}</h3><p>{item.org}</p></div>)}</div>
        </details>
      </div>

      <dialog ref={dialogRef} className="story-lightbox" aria-labelledby="story-photo-caption" aria-describedby="story-photo-instructions"
        onCancel={(event) => { event.preventDefault(); setOpenIndex(null); }}
        onClick={(event) => { if (event.target === event.currentTarget) setOpenIndex(null); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            moveViewer(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="story-lightbox-inner">
          <div className="story-lightbox-top"><span>{String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span><button type="button" className="story-lightbox-close" onClick={() => setOpenIndex(null)} aria-label="Close photo viewer" autoFocus><X size={23} /></button></div>
          <img src={currentPhoto.src} alt={currentPhoto.alt} />
          <div className="story-lightbox-footer"><button type="button" className="story-circle-button" aria-label="Previous photo" onClick={() => moveViewer(-1)}><ArrowLeft size={20} /></button><p id="story-photo-caption" aria-live="polite">{currentPhoto.caption}</p><button type="button" className="story-circle-button" aria-label="Next photo" onClick={() => moveViewer(1)}><ArrowRight size={20} /></button></div>
          <p id="story-photo-instructions" className="story-visually-hidden">Use the left and right arrow keys to browse photos. Press Escape to close.</p>
        </div>
      </dialog>
    </section>
  );
}
