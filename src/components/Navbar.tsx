
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
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors duration-300">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">./Nicola</span>
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
          className="md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
              {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 md:hidden animate-fade-in">
          <nav className="container flex flex-col space-y-4 p-6">
            <MobileNavLink to="/" label="Home" currentPath={location.pathname} />
            <MobileNavLink to="/about" label="About" currentPath={location.pathname} />
            <MobileNavLink to="/portfolio" label="Portfolio" currentPath={location.pathname} />
            <MobileNavLink to="/contact" label="Contact" currentPath={location.pathname} />
            
            <div className="flex justify-center pt-4 border-t border-muted">
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
      className={`text-gray-700 hover:text-primary transition-colors duration-200 font-medium ${isActive ? 'text-primary' : ''}`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink = ({ to, label, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`py-2 text-lg font-medium transition-colors duration-200 ${
        isActive ? 'text-primary font-semibold' : 'text-gray-700'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
