import React from "react";
import { motion } from "framer-motion";
import meImage from "../assets/me1.png";
import { ChevronDown } from "lucide-react"; // Lucide icon import

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
      id="home"
    >
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left flex-1">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I'm <span className="text-purple-500">Vichaksha</span> Viduranga
            </motion.h1>

            <motion.p
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I build intelligent, end-to-end web and AI-powered systems using modern 
              full-stack technologies. From designing intuitive user interfaces in React 
              to architecting scalable microservices in Spring Boot or Node.js, I thrive on 
              solving real-world problems with clean, maintainable, and high-performance
              solutions. With experience spanning from NLP research with Whisper and 
              LoRA to IoT automation with Firebase and embedded systems, I’m passionate 
              about bridging the gap between hardware and software to create tech 
              that truly matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#projects">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full font-medium transition-colors duration-300">
                  View My Work
                </button>
              </a>
            </motion.div>
          </div>

          {/* Right side - Photo */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-[-10px] lg:ml-1">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 1, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                duration: 1,
                delay: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.0, rotate: 2 }}
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse"></div>

              {/* Photo container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl bg-black">
             <img
              src={meImage}
              alt="Vichaksha Viduranga"
              className="w-full h-full object-contain object-center p-4 mt-8 -ml-3 -rotate-5 hover:scale-110 transition-transform duration-500"
            />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                animate={{
                  y: [0, -15, 0],
                  x: [0, 5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />

              <motion.div
                className="absolute top-1/4 -left-8 w-6 h-6 bg-pink-500 rounded-full opacity-40"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              <motion.div
                className="absolute bottom-1/4 -right-8 w-4 h-4 bg-purple-300 rounded-full opacity-50"
                animate={{
                  y: [0, -12, 0],
                  x: [0, -8, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Icon */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p className="text-gray-400 mb-2">Scroll</p>
        <div className="animate-bounce text-gray-400">
          <ChevronDown className="w-6 h-6 mx-auto" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;