import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface LazyGoogleMapProps {
  src: string;
  title?: string;
  className?: string;
  height?: string;
}

const LazyGoogleMap = ({
  src,
  title = "Google Map",
  className = "",
  height = "450"
}: LazyGoogleMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleClick = () => {
    if (!isLoaded) {
      setIsInView(true);
    }
  };

  return (
    <div 
      ref={mapRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {!isInView ? (
        <div 
          className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-colors"
          onClick={handleClick}
        >
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Interactive Map</h3>
            <p className="text-gray-500 mb-4">Click to load Google Maps</p>
            <button 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              onClick={handleClick}
            >
              Load Map
            </button>
          </div>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          <iframe 
            src={src}
            width="100%" 
            height={height}
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
            onLoad={handleLoad}
            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </div>
  );
};

export default LazyGoogleMap; 