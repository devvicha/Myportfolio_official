// src/Pages/Speaking.jsx
import React, { useEffect, useRef, useState } from "react";

// Images
import sp1 from "../assets/speaking-1.jpg";
import sp2 from "../assets/speaking-2.jpg";
import sp3 from "../assets/speaking-3.jpg";
import sp4 from "../assets/speaking-4.jpg";
import ev1 from "../assets/event-1.jpg";
import ev2 from "../assets/event-2.jpg";

// captions
const photos = [
  { src: sp1, alt: "Delivering a IEEE tech talk at UoK Robotics 2024", caption: "UoK Robotics — Tech Talk (2024)" },
  { src: sp2, alt: "Robotics Club team group photo at Robot Battles event",   caption: "Robot Battles — Team Photo" },
  { src: sp3, alt: "IEEE AGM 2024 executive committee formal photo",           caption: "IEEE AGM 2024 — Executive Committee" },
  { src: sp4, alt: "Workshop cohort group shot on academy steps",              caption: "Hands-on Workshop — Cohort" },
  { src: ev1, alt: "Industrial Electronics event banner in the hallway",       caption: "Industrial Electronics — Event Poster" },
  { src: ev2, alt: "Group photo after IEEE EELS DLP campus session",           caption: "IEEE EELS DLP — Campus Session" },
];

export default function Speaking() {
  const [openIndex, setOpenIndex] = useState(null);
  const gridRef = useRef(null);

  // Scroll-reveal
  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    const targets = root.querySelectorAll(".reveal");
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lightbox keys + scroll lock
  useEffect(() => {
    const onKey = (e) => {
      if (openIndex == null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft")  setOpenIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = openIndex == null ? "" : "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  // six directions: 4 corners + left/right
  const dirs = ["from-tl", "from-tr", "from-bl", "from-br", "from-left", "from-right"];

  return (
    <div className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Stage &amp; Community</h2>
      <p className="text-white/70 mb-8 max-w-2xl">Moments from my talks and events at the university.</p>

      {/* Grid */}
      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => {
          const dir = dirs[i % dirs.length];
          return (
            <figure
              key={i}
              className={`group rounded-2xl overflow-hidden border border-white/10 bg-white/5 reveal ${dir}`}
              style={{ transitionDelay: `${(i % 6) * 90}ms` }} // slight stagger
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="block w-full focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <div className="relative">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-72 md:h-80 object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </button>
              <figcaption className="p-3 text-sm text-white/70">{p.caption}</figcaption>
            </figure>
          );
        })}
      </div>

      {/* Lightbox */}
      {openIndex != null && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
          onClick={() => setOpenIndex(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <button
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <img
              src={photos[openIndex].src}
              alt={photos[openIndex].alt}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="mt-2 text-center text-white/80">{photos[openIndex].caption}</p>

            <div className="mt-3 flex justify-between text-sm text-white/70">
              <button
                onClick={() => setOpenIndex((openIndex - 1 + photos.length) % photos.length)}
                className="px-3 py-1 rounded border border-white/20 hover:bg-white/10"
              >
                ‹ Prev
              </button>
              <button
                onClick={() => setOpenIndex((openIndex + 1) % photos.length)}
                className="px-3 py-1 rounded border border-white/20 hover:bg-white/10"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
