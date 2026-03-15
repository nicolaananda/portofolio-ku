import { useState, useEffect } from 'react';

/**
 * Hook to track scroll position and provide parallax values
 */
export const useScrollParallax = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return {
        scrollY,
        // Different parallax speeds
        slow: scrollY * 0.3,
        medium: scrollY * 0.5,
        fast: scrollY * 0.7,
    };
};
