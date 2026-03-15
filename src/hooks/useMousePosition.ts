import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
    x: number;
    y: number;
}

/**
 * Hook to track mouse position relative to an element
 * Used for magnetic button effects and card tilts
 */
export const useMousePosition = (ref: RefObject<HTMLElement>) => {
    const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Normalize to -1 to 1 range
            const normalizedX = x / (rect.width / 2);
            const normalizedY = y / (rect.height / 2);

            setPosition({ x: normalizedX, y: normalizedY });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => {
            setIsHovering(false);
            setPosition({ x: 0, y: 0 });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref]);

    return { position, isHovering };
};
