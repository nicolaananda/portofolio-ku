import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  webpSrc?: string;
  sizes?: string;
  srcSet?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  // New responsive image props
  responsiveVariants?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = 'https://nicola.id/profile_optimized.jpg',
  webpSrc,
  sizes,
  srcSet,
  loading = 'lazy',
  width,
  height,
  priority = false,
  onLoad,
  onError,
  responsiveVariants
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If loading is eager or priority, show immediately
    if (loading === 'eager' || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '50px',
        // Use passive observation for better performance
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading, priority]);

  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      // Preload the image
      const img = new Image();
      
      img.onload = () => {
        setCurrentSrc(webpSrc || src);
        setIsLoaded(true);
        onLoad?.();
      };
      
      img.onerror = () => {
        setHasError(true);
        setIsLoaded(true);
        onError?.();
      };

      // Use WebP if available, fallback to original
      img.src = webpSrc || src;
      
      // Set srcset for responsive images
      if (srcSet) {
        img.srcset = srcSet;
      }
    }
  }, [isInView, src, webpSrc, srcSet, isLoaded, hasError, onLoad, onError]);

  // Generate responsive srcSet from variants
  const generateResponsiveSrcSet = () => {
    if (responsiveVariants) {
      const srcSetParts = [];
      if (responsiveVariants.mobile) {
        srcSetParts.push(`${responsiveVariants.mobile} 320w`);
      }
      if (responsiveVariants.tablet) {
        srcSetParts.push(`${responsiveVariants.tablet} 640w`);
      }
      if (responsiveVariants.desktop) {
        srcSetParts.push(`${responsiveVariants.desktop} 800w`);
      }
      return srcSetParts.join(', ');
    }
    return srcSet;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    onError?.();
  };

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Blurred placeholder */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-60"
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      {isInView && (
        <picture>
          {/* WebP source with responsive variants */}
          {(webpSrc || responsiveVariants) && (
            <source 
              srcSet={generateResponsiveSrcSet() || webpSrc} 
              type="image/webp" 
              sizes={sizes || "(max-width: 320px) 320px, (max-width: 640px) 640px, 800px"}
            />
          )}
          {/* Fallback source */}
          {srcSet && (
            <source 
              srcSet={srcSet} 
              sizes={sizes}
            />
          )}
          <img
            ref={imgRef}
            src={hasError ? placeholder : currentSrc}
            alt={alt}
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading={loading}
            sizes={sizes || "(max-width: 320px) 320px, (max-width: 640px) 640px, 800px"}
            width={width}
            height={height}
            decoding="async"
            // Add importance hint for LCP optimization
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </picture>
      )}
      
      {/* Loading state */}
      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg 
              className="w-8 h-8 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-xs">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage; 