import { ArrowUpRight, ArrowUp } from "lucide-react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <a href="#home" className="wordmark">vichaksha<span className="wordmark-dot">.</span></a>
        <p>Made with care. Built with curiosity.</p>
        <a className="text-link" href="https://github.com/devvicha" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /></a>
        <a className="text-link" href="https://www.linkedin.com/in/vichaksha-geekiyanage-a3b293227/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} /></a>
      </div>
      <div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} Vichaksha Viduranga</span><span>Sri Lanka · Open to the world</span><a href="#home">Back to top <ArrowUp size={14} /></a></div>
    </footer>
  );
}
