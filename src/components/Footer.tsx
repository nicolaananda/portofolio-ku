
import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-slate-950 py-16 border-t border-cyan-500/10">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
      
      <div className="container px-4 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                {'<'}Nicola{' />'}
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-6">
              Data Analyst & Full Stack Developer crafting data-driven solutions and exceptional digital experiences.
            </p>
            <SocialIcons />
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">Home</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">About</Link></li>
              <li><Link to="/portfolio" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">Portfolio</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="text-slate-400 font-medium">Malang, Indonesia</li>
              <li><a href="mailto:gmail@nicola.id" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">gmail@nicola.id</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-semibold">
              © {currentYear} Nicola Ananda. All rights reserved.
            </p>
            <p className="text-slate-600 text-sm">
              Built with <span className="text-cyan-400">❤️</span> and <span className="text-purple-400">React</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
