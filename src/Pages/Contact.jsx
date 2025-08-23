import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Loader2,
} from "lucide-react";

/**
 * EmailJS (v4) notes:
 * - Either call emailjs.init({ publicKey }) once OR pass { publicKey } as the 4th arg of sendForm.
 * - Below we pass the publicKey via the options object (recommended for React apps).
 * - Ensure your EmailJS template variables match the input `name` attributes:
 *   your_name, your_email, message
 */

const SERVICE_ID = "service_fyxpyhr";
const TEMPLATE_ID = "template_agels3r";
const PUBLIC_KEY = "rE_fkaioi-bmm-GPe";

const Contact = () => {
  const [formData, setFormData] = useState({
    your_name: "",
    your_email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // "success" | "error" | null
  const formRef = useRef(null);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/vichaksha-geekiyanage-a3b293227/",
    },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com" },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://www.instagram.com/vichaksha_vi/?hl=en",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: "https://www.facebook.com/vithaksha.viduranga",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.your_name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.your_email))
      return "Please enter a valid email.";
    if (!formData.message.trim()) return "Please enter a message.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setFormStatus({ type: "error", text: err });
      setTimeout(() => setFormStatus(null), 4000);
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        { publicKey: PUBLIC_KEY } // <-- v4 requires options object
      );

      setFormStatus({ type: "success", text: "Message sent successfully!" });
      setFormData({ your_name: "", your_email: "", message: "" });
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      console.error("Email send failed:", error?.text || error);
      setFormStatus({
        type: "error",
        text: "Failed to send message. Please try again.",
      });
      setTimeout(() => setFormStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Get In <span className="text-purple-500">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out. I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <motion.div
            className="lg:w-5/12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a
                    href="mailto:vichakshaviduranga@gmail.com"
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    vichakshaviduranga@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <a
                    href="tel:+94771121545"
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    +94 77 112 1545
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-white">Athurugiriya,Colombo,Sri Lanka</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="text-xl font-semibold mb-4 text-white">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:w-7/12 bg-gray-900/30 backdrop-blur-md p-8 rounded-xl border border-gray-800"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>

            <form onSubmit={handleSubmit} ref={formRef} noValidate>
              <div className="mb-6">
                <label htmlFor="your_name" className="block text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="your_name"
                  name="your_name"
                  value={formData.your_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="your_email" className="block text-gray-400 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="your_email"
                  name="your_email"
                  value={formData.your_email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Hello, I'd like to talk about..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center text-white transition-colors duration-300 ${
                  isSubmitting
                    ? "bg-purple-800 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-3 h-5 w-5" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {formStatus?.type === "success" && (
              <motion.p
                className="mt-4 text-green-400 font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ {formStatus.text}
              </motion.p>
            )}
            {formStatus?.type === "error" && (
              <motion.p
                className="mt-4 text-red-400 font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ❌ {formStatus.text}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
