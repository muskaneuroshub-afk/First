import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface CarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
  ariaLabel?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoplay = false,
  autoplayInterval = 6000,
  className,
  ariaLabel = 'Content carousel',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const total = children.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay management: off by default, pauses on hover/focus, respects reduced motion
  useEffect(() => {
    if (!autoplay || prefersReducedMotion || isPaused || total <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, prefersReducedMotion, isPaused, total, autoplayInterval, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left -> next
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  if (total === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={cn('relative w-full overflow-hidden select-none', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide viewport */}
      <div className="relative min-h-[220px] flex items-center justify-center">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}`}
            aria-hidden={index !== currentIndex}
            className={cn(
              'w-full transition-all duration-300',
              index === currentIndex
                ? 'opacity-100 relative translate-x-0'
                : 'opacity-0 absolute pointer-events-none'
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {total > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <button
            type="button"
            onClick={prevSlide}
            className="p-2 rounded-lg border border-border bg-bg-card hover:bg-bg-card-hover text-text-primary focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: total }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : undefined}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand',
                  idx === currentIndex
                    ? 'w-7 bg-brand'
                    : 'w-2.5 bg-border hover:bg-border-hover'
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="p-2 rounded-lg border border-border bg-bg-card hover:bg-bg-card-hover text-text-primary focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

