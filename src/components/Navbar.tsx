import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Work' },
    { to: '/blog', label: 'Journal' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 pointer-events-none`}>
        <div className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isScrolled
            ? 'w-auto rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg py-2 px-2'
            : 'w-full max-w-7xl rounded-none bg-transparent border-none py-4 px-0'
          }`}>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className={`group relative z-10 flex items-center gap-2 font-black text-xl tracking-tighter transition-all duration-300 ${isScrolled ? 'pl-4' : ''}`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-black/70 dark:from-white dark:to-white/70">
                NICOLA
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white group-hover:scale-150 transition-transform duration-300"></div>
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center gap-1 ${isScrolled ? '' : 'absolute left-1/2 -translate-x-1/2'}`}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  isActive={location.pathname === link.to}
                  isScrolled={isScrolled}
                />
              ))}
            </nav>

            {/* Right Actions */}
            <div className={`flex items-center gap-2 ${isScrolled ? 'pr-2' : ''}`}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </Button>

              <Button
                asChild
                className={`hidden md:flex rounded-full font-medium transition-all duration-300 ${isScrolled
                    ? 'h-9 px-4 text-xs'
                    : 'h-10 px-6'
                  }`}
              >
                <Link to="/contact">
                  Let's Talk <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white dark:bg-black transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
        <div className="h-full flex flex-col justify-center items-center p-4">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-4xl md:text-6xl font-black tracking-tighter transition-all duration-500 hover:text-gray-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={`mt-12 flex gap-4 transition-all duration-500 delay-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <div className="text-sm text-gray-500">
              Based in Malang, Indonesia
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ to, label, isActive, isScrolled }: { to: string; label: string; isActive: boolean; isScrolled: boolean }) => (
  <Link
    to={to}
    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:text-black dark:hover:text-white ${isActive
        ? 'text-black dark:text-white bg-black/5 dark:bg-white/10'
        : 'text-gray-500 dark:text-gray-400'
      }`}
  >
    {label}
    {isActive && (
      <span className="absolute inset-0 rounded-full border border-black/5 dark:border-white/5 pointer-events-none"></span>
    )}
  </Link>
);

export default Navbar;
