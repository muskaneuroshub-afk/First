import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant =
  | 'brand'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  className,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    brand: 'bg-brand/10 text-brand border border-brand/20 font-medium',
    secondary: 'bg-bg-secondary text-text-secondary border border-border',
    outline: 'bg-transparent text-text-muted border border-border',
    success: 'bg-green-500/10 text-status-success border border-status-success/20 font-medium',
    warning: 'bg-amber-500/10 text-status-warning border border-status-warning/20 font-medium',
    danger: 'bg-red-500/10 text-status-error border border-status-error/20 font-medium',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 rounded-md gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium tracking-wide transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

