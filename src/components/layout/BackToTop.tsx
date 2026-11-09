import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className={cn(
        'fixed bottom-6 right-6 z-40 p-3 rounded-full border border-border bg-bg-card/90 backdrop-blur text-text-primary shadow-elevated transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand hover:bg-bg-card-hover hover:-translate-y-1',
        isVisible
          ? 'opacity-100 pointer-events-auto scale-100'
          : 'opacity-0 pointer-events-none scale-90'
      )}
    >
      <ArrowUp className="w-5 h-5 text-brand" />
    </button>
  );
};

