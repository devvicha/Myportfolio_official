import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import ProofStrip from "./Components/ProofStrip";
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
// Order is deliberate: proof before personality. A visitor gets a claim, then
// four numbers they can check, then an agent they can interrogate, before any
// prose about me.
const App = () => (
  <div className="min-h-screen bg-black text-white scroll-smooth">
    <Navbar />
    <main>
      <Hero />
      <ProofStrip />
      <AskMyWork />
      <Projects />
      <Research />
      <Experience />
      <Speaking />
      <About />
      <Skills />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default App;
