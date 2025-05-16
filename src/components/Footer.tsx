
import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 py-10">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link to="/" className="font-montserrat text-xl font-bold">
              ./Nicola
            </Link>
            <p className="text-muted-foreground text-center md:text-left">
              Data Analyst & Web Developer creating data-driven, responsive applications.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 md:items-end">
            <SocialIcons />
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mx-auto mt-8 flex justify-center space-x-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors duration-200">Home</Link>
          <Link to="/about" className="hover:text-accent transition-colors duration-200">About</Link>
          <Link to="/portfolio" className="hover:text-accent transition-colors duration-200">Portfolio</Link>
          <Link to="/blog" className="hover:text-accent transition-colors duration-200">Blog</Link>
          <Link to="/contact" className="hover:text-accent transition-colors duration-200">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
