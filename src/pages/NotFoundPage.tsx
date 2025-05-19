import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement search functionality here
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background px-4">
      <div className="max-w-2xl w-full text-center">
        <AnimatedSection>
          <motion.div 
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated 404 Text */}
            <motion.h1 
              className="text-9xl font-bold text-primary/20 select-none"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              404
            </motion.h1>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative">
                  <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Oops! The page you're looking for seems to have vanished into the digital void.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.form 
            onSubmit={handleSearch}
            className="max-w-md mx-auto mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for something else..."
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </motion.form>

          {/* Navigation Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link to="/" className="flex items-center gap-2">
                <Home size={20} className="group-hover:scale-110 transition-transform" />
                Back to Home
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="group"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Contact Support
                <ArrowLeft size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Auto-redirect Notice */}
          <motion.div 
            className="mt-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>Redirecting to home page in 10 seconds...</p>
            <motion.div 
              className="h-1 w-full bg-primary/20 rounded-full mt-2"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            className="mt-16 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/20"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Don't worry, you can always find your way back home
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default NotFoundPage; 