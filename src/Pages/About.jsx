import React from "react";
import { m, motion } from "framer-motion";
import { Zap, LayoutDashboard, Smartphone, Download } from "lucide-react";
import mycv from "../assets/CV.pdf";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            About <span className="text-purple-500">Me</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column - Text */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">
              Future-Ready Developer & Problem Solver
            </h3>

            <p className="text-gray-300 mb-4 text-center lg:text-left">
              I’m a Future-Ready Developer & Problem Solver passionate about building full-stack software solutions that seamlessly integrate with modern technologies. From crafting responsive web and mobile applications to developing scalable back-end systems, I focus on creating end-to-end products that deliver real impact.
            </p>

            <p className="text-gray-300 mb-6 text-center lg:text-left">
              I have a strong interest in Machine Learning and AI, particularly in fine-tuning Large Language Models (LLMs) to adapt them for domain-specific tasks. Alongside AI, I also pursue projects in IoT development, blending hardware and intelligent software to design systems that improve daily life—from smart automation to elder-care solutions.
            </p>

            <p className="text-gray-300 mb-6 text-center lg:text-left">
              Driven by curiosity and innovation, I aim to bridge full-stack engineering, AI, and IoT, building future-proof solutions that not only solve problems but also enhance user experience and accessibility.
            </p>

            <div className="flex justify-center lg:justify-start space-x-4">
              <button
                onClick={scrollToContact}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full transition-colors duration-300"
              >
                Get In Touch
              </button>
              <a
                href={mycv}
                download
                className="border border-gray-600 hover:border-purple-500 text-white py-2 px-6 rounded-full transition-colors duration-300 flex items-center"
              >
                Download CV
                <Download className="ml-2 w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column - Skills Grid */}
          <motion.div
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-6">
              {[
  {
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    title: "Fullstack Application Development",
    desc: "Building scalable, end-to-end software solutions using modern frontend and backend technologies.",
    bg: "bg-blue-500/20",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-purple-500" />,
    title: "AI/ML Integration & NLP",
    desc: "Specialized in fine-tuning LLMs for domain-specific NLP tasks and integrating intelligent models into applications.",
    bg: "bg-purple-500/20",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-pink-500" />,
    title: "IoT System Development",
    desc: "Designing smart systems with sensors, microcontrollers, and real-time communication for automation and accessibility.",
    bg: "bg-pink-500/20",
  },
].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 flex items-start"
                >
                  <div className={`mr-4 ${item.bg} p-3 rounded-lg`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;