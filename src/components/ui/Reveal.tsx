import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 350,
  className,
  ...props
}) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ triggerOnce: true, threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return isInView ? 'translateY(0)' : 'translateY(24px)';
      case 'down':
        return isInView ? 'translateY(0)' : 'translateY(-24px)';
      case 'left':
        return isInView ? 'translateX(0)' : 'translateX(24px)';
      case 'right':
        return isInView ? 'translateX(0)' : 'translateX(-24px)';
      case 'none':
      default:
        return 'none';
    }
  };

  const style: React.CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} style={style} className={cn('w-full', className)} {...props}>
      {children}
    </div>
  );
};

