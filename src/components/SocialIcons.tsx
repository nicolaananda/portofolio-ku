
import { Github, Linkedin, Instagram, Twitter } from 'lucide-react';

const SocialIcons = () => {
  return (
    <div className="flex space-x-3">
      <a 
        href="https://github.com/nicolaananda" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="GitHub"
      >
        <Github size={20} />
      </a>
      <a 
        href="https://www.linkedin.com/in/nicola-ananda/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <a 
        href="https://instagram.com/noabsen13" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="Instagram"
      >
        <Instagram size={20} />
      </a>
      <a 
        href="https://twitter.com/NoAbsen13" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="Twitter"
      >
        <Twitter size={20} />
      </a>
    </div>
  );
};

export default SocialIcons;
