import React from "react";
import { motion } from "framer-motion";
import meImage from "../assets/me1.png";
import { Mic, MessageSquare } from "lucide-react";

// lucide-react deprecated its brand icons, so the GitHub mark is inline.
const GithubMark = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-24 lg:py-0"
      id="home"
    >
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left flex-1">
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2.5 mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span className="text-purple-500 text-sm font-medium tracking-[0.08em] uppercase">
                AI Engineer — production conversational agents
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-purple-500">Vichaksha</span> Viduranga
            </motion.h1>

            <motion.p
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I build LLM agents that run in front of real customers and are not
              allowed to be wrong.
            </motion.p>

            <motion.p
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 mb-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              A WhatsApp order agent on Meta's official Cloud API with structural
              hallucination prevention and 603 passing tests. A multilingual
              voice agent live on Cloud Run serving four configured personas. A
              Whisper LoRA fine-tune for Sinhala, a low-resource language.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href="https://voice-agent-frontend-5mtolu2zcq-uc.a.run.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-7 rounded-full font-medium transition-colors duration-300 inline-flex items-center gap-2"
              >
                <Mic size={18} />
                Talk to my voice agent
              </a>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new Event("open-ask-my-work"))
                }
                className="border border-gray-800 bg-gray-900/90 hover:border-purple-500 text-white py-3 px-7 rounded-full font-medium transition-colors duration-300 inline-flex items-center gap-2"
              >
                <MessageSquare size={18} />
                Ask my work anything
              </button>

              <a
                href="https://github.com/devvicha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 py-3"
              >
                <GithubMark width={17} height={17} />
                github.com/devvicha
              </a>
            </motion.div>
          </div>

          {/* Right side - Photo */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden border border-gray-800 bg-black">
                <img
                  src={meImage}
                  alt="Vichaksha Viduranga"
                  className="w-full h-full object-contain object-center p-4 mt-8 -ml-3"
                />
              </div>

              <div className="absolute inset-0 rounded-full ring-1 ring-purple-600/40 pointer-events-none" />

            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
