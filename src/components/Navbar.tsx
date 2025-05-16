
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
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container flex items-center justify-between px-4">
        <Link to="/" className="font-montserrat text-xl font-bold text-foreground">
          ./Nicola
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 md:flex">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/about" label="About" currentPath={location.pathname} />
          <NavLink to="/portfolio" label="Portfolio" currentPath={location.pathname} />
          <NavLink to="/blog" label="Blog" currentPath={location.pathname} />
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
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden animate-fade-in">
          <nav className="container flex flex-col space-y-4 p-4">
            <MobileNavLink to="/" label="Home" currentPath={location.pathname} />
            <MobileNavLink to="/about" label="About" currentPath={location.pathname} />
            <MobileNavLink to="/portfolio" label="Portfolio" currentPath={location.pathname} />
            <MobileNavLink to="/blog" label="Blog" currentPath={location.pathname} />
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
      className={`nav-link ${isActive ? 'active text-accent' : ''}`}
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
      className={`py-2 text-lg font-montserrat transition-colors duration-200 ${
        isActive ? 'text-accent font-semibold' : 'text-foreground'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
