import React from "react";
import { m, motion } from "framer-motion";
import { Bot, BrainCircuit, Cpu, Download } from "lucide-react";
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
              I build agents that have to be right
            </h3>

            <p className="text-gray-300 mb-4 text-center lg:text-left">
              Most of what I do is conversational AI that runs in production
              for real businesses — WhatsApp order agents on Meta&#39;s official
              Cloud API, and real-time voice agents on Gemini Live. Multilingual
              by necessity: my users speak Sinhala, Tamil and English, often in
              the same sentence.
            </p>

            <p className="text-gray-300 mb-6 text-center lg:text-left">
              The interesting problem in this work is not making a model talk.
              It is stopping it being confidently wrong about a price, a phone
              number or an order — in front of a paying customer. I solve that
              structurally rather than by prompting harder: the model chooses the
              words, code decides the facts.
            </p>

            <p className="text-gray-300 mb-6 text-center lg:text-left">
              Alongside that I train models rather than only calling them — a
              Whisper LoRA fine-tune for Sinhala, YOLO pose estimation for
              millimetre-accurate garment measurement — and I still enjoy the
              hardware end, from ESP32 sensors to industrial PLC protocols.
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
    icon: <Bot className="w-6 h-6 text-purple-500" />,
    title: "Production Conversational Agents",
    desc: "LLM agents on Meta's WhatsApp Cloud API and Gemini Live \u2014 grounded, multilingual, and built so a wrong fact cannot reach a customer.",
    bg: "bg-purple-500/20",
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-purple-500" />,
    title: "Model Training & Fine-Tuning",
    desc: "Parameter-efficient fine-tuning for low-resource languages, and computer-vision models trained on datasets I collected and annotated myself.",
    bg: "bg-purple-500/20",
  },
  {
    icon: <Cpu className="w-6 h-6 text-purple-500" />,
    title: "Systems & Hardware",
    desc: "The infrastructure underneath: FastAPI on Cloud Run, Docker, CI/CD \u2014 through to ESP32 sensors and industrial PLC protocols.",
    bg: "bg-purple-500/20",
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