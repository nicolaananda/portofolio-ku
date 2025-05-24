import { useState, useEffect } from 'react';

interface UseDeferredComponentProps {
  delay?: number;
  fallback?: React.ReactNode;
}

export const useDeferredComponent = (delay: number = 100) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return shouldRender;
};

interface DeferredComponentProps extends UseDeferredComponentProps {
  children: React.ReactNode;
}

export const DeferredComponent = ({ 
  children, 
  delay = 100, 
  fallback = null 
}: DeferredComponentProps) => {
  const shouldRender = useDeferredComponent(delay);
  
  return shouldRender ? <>{children}</> : <>{fallback}</>;
}; 