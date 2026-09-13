import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Check, Code2, Linkedin, Loader2, MapPin } from "lucide-react";
import "../styles/integrations.css";

// Keep the deployed EmailJS integration and its template field names intact.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_fyxpyhr";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_agels3r";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "rE_fkaioi-bmm-GPe";
const EMPTY_FORM = { your_name: "", your_email: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const submittingRef = useRef(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setFormStatus(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return;
    const nextErrors = {};
    if (!formData.your_name.trim()) nextErrors.your_name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.your_email.trim())) nextErrors.your_email = "Please enter a valid email address.";
    if (!formData.message.trim()) nextErrors.message = "Tell me a little about what you have in mind.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      formRef.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setFormStatus(null);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setFormStatus({ type: "success", text: "Message sent. Thanks for getting in touch — I’ll get back to you by email." });
      setFormData(EMPTY_FORM);
    } catch {
      setFormStatus({ type: "error", text: "Your message couldn’t be sent. Please try again, or email me directly using the address alongside this form." });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="portfolio-contact" aria-labelledby="portfolio-contact-title">
      <div className="page-shell">
        <div className="portfolio-contact-top"><span className="section-label">LET’S TALK</span><span className="portfolio-contact-location"><MapPin size={13} aria-hidden="true" />Colombo, Sri Lanka</span></div>
        <div className="portfolio-contact-grid">
          <div className="portfolio-contact-copy">
            <h2 id="portfolio-contact-title">Good things start<br />with a conversation<span>.</span></h2>
            <p>Have a problem worth solving, an idea to explore, or a role in mind? I’d like to hear about it.</p>
            <a className="portfolio-contact-email" href="mailto:vichakshaviduranga@gmail.com"><span>vichakshaviduranga@gmail.com</span><ArrowUpRight size={22} aria-hidden="true" /></a>
            <div className="portfolio-contact-links">
              <a href="https://www.linkedin.com/in/vichaksha-geekiyanage-a3b293227/" target="_blank" rel="noopener noreferrer"><Linkedin size={15} aria-hidden="true" />LinkedIn<ArrowUpRight size={13} aria-hidden="true" /></a>
              <a href="https://github.com/devvicha" target="_blank" rel="noopener noreferrer"><Code2 size={16} aria-hidden="true" />GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>
              <a href="tel:+94771121545">+94 77 112 1545<ArrowUpRight size={13} aria-hidden="true" /></a>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="portfolio-contact-form" aria-label="Send Vichaksha a message" aria-busy={isSubmitting}>
            <div className="portfolio-contact-form-heading"><span>A NOTE TO MY INBOX</span><ArrowUpRight size={19} aria-hidden="true" /></div>
            <div className="portfolio-contact-field-row">
              <div className="portfolio-contact-field">
                <label htmlFor="contact-name">Your name</label>
                <input id="contact-name" name="your_name" autoComplete="name" value={formData.your_name} onChange={handleChange} maxLength={120} readOnly={isSubmitting} required placeholder="Alex Morgan" aria-invalid={Boolean(errors.your_name)} aria-describedby={errors.your_name ? "contact-name-error" : undefined} />
                {errors.your_name && <p className="portfolio-contact-error" id="contact-name-error">{errors.your_name}</p>}
              </div>
              <div className="portfolio-contact-field">
                <label htmlFor="contact-email">Email address</label>
                <input id="contact-email" name="your_email" type="email" autoComplete="email" value={formData.your_email} onChange={handleChange} maxLength={254} readOnly={isSubmitting} required placeholder="alex@company.com" aria-invalid={Boolean(errors.your_email)} aria-describedby={errors.your_email ? "contact-email-error" : undefined} />
                {errors.your_email && <p className="portfolio-contact-error" id="contact-email-error">{errors.your_email}</p>}
              </div>
            </div>
            <div className="portfolio-contact-field">
              <label htmlFor="contact-message">What do you have in mind?</label>
              <textarea id="contact-message" name="message" rows={4} value={formData.message} onChange={handleChange} maxLength={5000} readOnly={isSubmitting} required placeholder="A little about your project, team, or idea…" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
              {errors.message && <p className="portfolio-contact-error" id="contact-message-error">{errors.message}</p>}
            </div>
            <div className="portfolio-contact-form-bottom"><span>Straight to my inbox.</span><button type="submit" className="button button-dark" disabled={isSubmitting}>{isSubmitting ? <>Sending<Loader2 size={17} className="portfolio-spin" aria-hidden="true" /></> : <>Send message<ArrowUpRight size={18} aria-hidden="true" /></>}</button></div>
            {formStatus && <p className={`portfolio-contact-status ${formStatus.type === "error" ? "is-error" : ""}`} role={formStatus.type === "error" ? "alert" : "status"}>{formStatus.type === "success" && <Check size={16} aria-hidden="true" />}{formStatus.text}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
