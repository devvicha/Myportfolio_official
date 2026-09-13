// src/Pages/Projects.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import { PROJECT_GROUPS, byCategory } from "../assets/projects";

const AUTOPLAY_MS = 6000;

const variants = {
  center: { x: 0, scale: 1, opacity: 1, zIndex: 10, pointerEvents: "auto", transition: { duration: 0.5 } },
  left: { x: -300, scale: 0.85, opacity: 0.5, zIndex: 5, pointerEvents: "none", transition: { duration: 0.5 } },
  right: { x: 300, scale: 0.85, opacity: 0.5, zIndex: 5, pointerEvents: "none", transition: { duration: 0.5 } },
  hidden: { x: 0, scale: 0, opacity: 0, zIndex: 0, pointerEvents: "none", transition: { duration: 0.5 } },
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProjectCard = ({ project, isActive }) => {
  // Links on off-screen cards must not be reachable by keyboard.
  const tab = isActive ? 0 : -1;

  return (
    <div className="w-96 bg-gray-900/90 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
      <div className="relative h-56 overflow-hidden bg-gray-800">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center px-8 text-center">
            <span className="text-gray-500 text-sm">{project.title}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm bg-gray-800 text-gray-300 px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-white mb-1">{project.title}</h3>

        {project.tagline && (
          <p className="text-purple-400 text-sm mb-3">{project.tagline}</p>
        )}

        <p className="text-gray-400 text-base mb-4">{project.description}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="text-xs text-purple-400 border border-purple-900 px-2 py-1 rounded-md tabular-nums"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tab}
              className="text-purple-400 hover:text-white flex items-center gap-1 transition-colors duration-200"
              aria-label={`Open ${project.title} demo`}
            >
              Demo <ExternalLink size={16} />
            </a>
          )}

          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tab}
              className="text-purple-400 hover:text-white flex items-center gap-1 transition-colors duration-200"
              aria-label={`View ${project.title} code`}
            >
              Code <ExternalLink size={16} />
            </a>
          )}

          {project.tryLink && (
            <a
              href={project.tryLink}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tab}
              className="text-purple-400 hover:text-white flex items-center gap-1 transition-colors duration-200"
              aria-label={`${project.tryLabel} — ${project.title}`}
            >
              {project.tryLabel} <MessageCircle size={16} />
            </a>
          )}
        </div>

        {project.tryNote && (
          <p className="text-gray-500 text-xs mt-3">{project.tryNote}</p>
        )}
      </div>
    </div>
  );
};

const ProjectCarousel = ({ items, label }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const rootRef = useRef(null);

  // Rotation starts when the carousel is actually on screen and stops when it
  // leaves, so nothing is spinning in a section nobody is looking at.
  const inView = useInView(rootRef, { amount: 0.35 });

  const total = items.length;

  const next = useCallback(
    () => setCurrent((i) => (i === total - 1 ? 0 : i + 1)),
    [total]
  );
  const prev = useCallback(
    () => setCurrent((i) => (i === 0 ? total - 1 : i - 1)),
    [total]
  );

  // Autoplay runs only while in view, pauses on hover/focus, and is off
  // entirely under prefers-reduced-motion.
  useEffect(() => {
    if (!inView || paused || total < 2 || prefersReducedMotion()) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [inView, paused, total, next]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const positionOf = (index) => {
    if (index === current) return "center";
    if (total < 3) return "hidden";
    if (index === (current === 0 ? total - 1 : current - 1)) return "left";
    if (index === (current === total - 1 ? 0 : current + 1)) return "right";
    return "hidden";
  };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative flex flex-col items-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
    >
      <div className="relative flex items-center justify-center w-full">
        <button
          onClick={prev}
          className="absolute left-0 z-20 p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
          aria-label={`Previous project in ${label}`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-full max-w-6xl min-h-[560px] relative overflow-visible flex justify-center py-4">
          {items.map((project, index) => {
            const position = positionOf(index);
            return (
              <motion.div
                key={project.id}
                className="absolute"
                variants={variants}
                initial="hidden"
                animate={position}
                aria-hidden={position !== "center"}
              >
                <ProjectCard project={project} isActive={position === "center"} />
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={next}
          className="absolute right-0 z-20 p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
          aria-label={`Next project in ${label}`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-6">
        {items.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setCurrent(index)}
            aria-label={`Show ${project.title}`}
            aria-current={index === current}
            className={`h-2 rounded-full transition-all duration-200 ${
              index === current
                ? "w-6 bg-purple-500"
                : "w-2 bg-gray-700 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {items[current].title}, {current + 1} of {total}
      </p>
    </div>
  );
};

const Projects = () => (
  <section id="projects" className="py-24 bg-black">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">
          Featured <span className="text-purple-500">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Production systems first — the ones with live users, real failure
          modes and tests behind them.
        </p>
      </motion.div>

      <div className="flex flex-col gap-24">
        {PROJECT_GROUPS.map((group) => {
          const items = byCategory(group.key);
          if (items.length === 0) return null;
          return (
            <div key={group.key}>
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {group.heading.replace(group.accent, "").trim()}{" "}
                  <span className="text-purple-500">{group.accent}</span>
                </h3>
                <p className="text-gray-400">{group.blurb}</p>
              </div>
              <ProjectCarousel items={items} label={group.heading} />
            </div>
          );
        })}
      </div>

      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <a
          href="https://github.com/devvicha"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-full transition-all duration-300 text-lg font-medium"
        >
          Check My GitHub
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default Projects;
