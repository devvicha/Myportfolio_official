// src/Pages/Speaking.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

import sp1 from "../assets/speaking-1.jpg";
import sp2 from "../assets/speaking-2.jpg";
import sp3 from "../assets/speaking-3.jpg";
import sp4 from "../assets/speaking-4.jpg";
import ev1 from "../assets/event-1.jpg";
import ev2 from "../assets/event-2.jpg";

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
  const [openIndex, setOpenIndex] = useState(null);

  // Lightbox keyboard control + scroll lock
  useEffect(() => {
    const onKey = (e) => {
      if (openIndex == null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = openIndex == null ? "" : "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <section id="speaking" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            Speaking & <span className="text-purple-500">Community</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Six years of running events, hosting webinars and leading student
            chapters — the part of engineering that happens in front of people.
          </p>
        </motion.div>

        {/* Leadership record */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-2.5 mb-6">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-semibold text-white">Leadership</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {roles.map((item, i) => (
              <motion.div
                key={item.role + item.org}
                className="bg-gray-900/90 border border-gray-800 rounded-xl p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              >
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h4 className="text-white font-semibold">{item.role}</h4>
                  <span className="text-gray-500 text-sm shrink-0">{item.year}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.org}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <motion.figure
              key={p.caption}
              className="group rounded-xl overflow-hidden border border-gray-800 bg-gray-900/90 m-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                aria-label={`Open photo: ${p.caption}`}
              >
                <div className="relative">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-72 md:h-80 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </button>
              <figcaption className="p-3 text-sm text-gray-400">{p.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openIndex != null && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
          aria-modal="true"
          role="dialog"
          aria-label="Photo viewer"
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setOpenIndex(null)}
                aria-label="Close photo viewer"
                className="rounded-full border border-gray-800 bg-gray-900/90 text-gray-300 px-4 py-1.5 text-sm hover:text-white hover:border-purple-500 transition-colors"
              >
                Close
              </button>
            </div>

            <img
              src={photos[openIndex].src}
              alt={photos[openIndex].alt}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="mt-3 text-center text-gray-400">{photos[openIndex].caption}</p>

            <div className="mt-4 flex justify-between text-sm">
              <button
                onClick={() => setOpenIndex((openIndex - 1 + photos.length) % photos.length)}
                className="px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/90 text-gray-300 hover:text-white hover:border-purple-500 transition-colors"
              >
                ‹ Prev
              </button>
              <button
                onClick={() => setOpenIndex((openIndex + 1) % photos.length)}
                className="px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/90 text-gray-300 hover:text-white hover:border-purple-500 transition-colors"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
