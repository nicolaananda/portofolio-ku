import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="max-w-2xl w-full text-center">
        <AnimatedSection>
          <div className="relative">
            {/* Animated 404 Text */}
            <h1 className="text-9xl font-bold text-primary/20 select-none">
              404
            </h1>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative">
                  <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Oops! The page you're looking for seems to have vanished into the digital void.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/" className="flex items-center gap-2">
                <Home size={20} className="group-hover:scale-110 transition-transform" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" className="group">
              <Link to="/contact" className="flex items-center gap-2">
                Contact Support
                <ArrowLeft size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 space-y-4">
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/20 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Don't worry, you can always find your way back home
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default NotFoundPage; 