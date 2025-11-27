import { Link } from 'react-router-dom';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white pt-24 pb-12 px-4 border-t border-black/5 dark:border-white/10">
      <div className="container max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          {/* Brand - Large Typography */}
          <div className="md:col-span-5 lg:col-span-6">
            <Link to="/" className="inline-block mb-8 group">
              <span className="text-6xl md:text-8xl font-black tracking-tighter leading-none block group-hover:opacity-50 transition-opacity duration-500">
                NICOLA
              </span>
              <span className="text-6xl md:text-8xl font-black tracking-tighter leading-none block text-gray-300 dark:text-gray-800 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">
                ANANDA
              </span>
            </Link>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              Crafting digital experiences with data-driven precision and aesthetic excellence.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Sitemap</h3>
              <ul className="space-y-4">
                <li><Link to="/" className="text-lg font-medium hover:text-gray-500 transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-lg font-medium hover:text-gray-500 transition-colors">About</Link></li>
                <li><Link to="/portfolio" className="text-lg font-medium hover:text-gray-500 transition-colors">Work</Link></li>
                <li><Link to="/blog" className="text-lg font-medium hover:text-gray-500 transition-colors">Journal</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Socials</h3>
              <ul className="space-y-4">
                <li><a href="https://linkedin.com/in/nicola-ananda" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-500 transition-colors">LinkedIn</a></li>
                <li><a href="https://github.com/nicolaananda" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-500 transition-colors">GitHub</a></li>
                <li><a href="https://twitter.com/NoAbsen13" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-500 transition-colors">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gray-500 transition-colors">Instagram</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Contact</h3>
              <ul className="space-y-4">
                <li><a href="mailto:gmail@nicola.id" className="text-lg font-medium hover:text-gray-500 transition-colors">gmail@nicola.id</a></li>
                <li className="text-gray-500">Malang, Indonesia</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end pt-8 border-t border-black/5 dark:border-white/10">
          <div className="mb-4 md:mb-0">
            <p className="text-sm font-medium text-gray-400">
              &copy; {currentYear} Nicola Ananda.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-black dark:bg-white animate-pulse"></div>
            <p className="text-sm font-medium text-gray-400">
              All systems operational
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
