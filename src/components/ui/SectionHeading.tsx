import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 sm:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs uppercase tracking-widest font-semibold text-brand px-3 py-1 bg-brand/10 rounded-full inline-block mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
      <div
        className={cn(
          'mt-4 h-1 w-12 rounded-full bg-brand',
          align === 'center' ? 'mx-auto' : 'mr-auto'
        )}
        aria-hidden="true"
      />
    </div>
  );
};

