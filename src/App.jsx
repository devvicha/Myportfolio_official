import { MotionConfig } from "framer-motion";
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
export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero /><Projects /><About /><Experience /><Skills /><Research /><Speaking /><Contact />
      </main>
      <Footer /><AskMyWork />
    </MotionConfig>
  );
}
