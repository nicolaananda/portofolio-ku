
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SocialIcons from './SocialIcons';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/80 backdrop-blur-xl shadow-2xl border-b border-cyan-500/10 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container flex items-center justify-between px-4">
        <Link to="/" className="group text-2xl font-black transition-all duration-300">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-500">
            {'<'}Nicola{' />'}
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 md:flex">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/about" label="About" currentPath={location.pathname} />
          <NavLink to="/portfolio" label="Portfolio" currentPath={location.pathname} />
          <NavLink to="/contact" label="Contact" currentPath={location.pathname} />
        </nav>
        
        {/* Social Icons - Desktop */}
        <div className="hidden md:block">
          <SocialIcons />
        </div>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden hover:bg-cyan-500/10 text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
              {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-cyan-500/20 md:hidden animate-fade-in">
          <nav className="container flex flex-col space-y-4 p-6">
            <MobileNavLink to="/" label="Home" currentPath={location.pathname} />
            <MobileNavLink to="/about" label="About" currentPath={location.pathname} />
            <MobileNavLink to="/portfolio" label="Portfolio" currentPath={location.pathname} />
            <MobileNavLink to="/contact" label="Contact" currentPath={location.pathname} />
            
            <div className="flex justify-center pt-4 border-t border-slate-800">
              <SocialIcons />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
}

const NavLink = ({ to, label, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`relative text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-bold ${isActive ? 'text-cyan-400' : ''}`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></span>
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, label, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`py-3 text-lg font-black transition-all duration-200 rounded-xl px-4 ${
        isActive ? 'text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
