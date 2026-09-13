import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import AskMyWork from "./Components/AskMyWork";
import About from "./Pages/About";
import Skills from "./Pages/Skills";
import Projects from "./Pages/Projects";
import Research from "./Pages/Research";
import Experience from "./Pages/Experience";
import Speaking from "./Pages/Speaking";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";

// Each section component renders its own <section id> and its own container,
// so nothing is wrapped here — a second wrapper would duplicate the ids and
// break the nav anchors.
//
// Order is deliberate: the work first, then the record behind it, then prose.
const App = () => (
  <div className="min-h-screen bg-black text-white scroll-smooth">
    <Navbar />
    <main>
      <Hero />
      <Projects />
      <Research />
      <Experience />
      <Speaking />
      <About />
      <Skills />
      <Contact />
    </main>
    <Footer />
    <AskMyWork />
  </div>
);

export default App;
