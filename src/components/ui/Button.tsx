import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export type ButtonProps = BaseButtonProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; disabled?: boolean })
  );

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none';

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-brand text-brand-foreground hover:bg-brand-hover shadow-sm hover:shadow active:bg-brand-hover',
      secondary:
        'bg-bg-card hover:bg-bg-card-hover text-text-primary border border-border hover:border-border-hover shadow-sm',
      outline:
        'border border-brand text-brand hover:bg-brand hover:text-brand-foreground',
      ghost:
        'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover',
      danger:
        'bg-status-error text-white hover:bg-red-700 shadow-sm',
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px]',
      md: 'text-sm px-4 py-2 gap-2 min-h-[44px]', // 44px min touch target
      lg: 'text-base px-6 py-3 gap-2.5 min-h-[48px]',
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const isActuallyDisabled = disabled || isLoading;

    if ('href' in props && props.href) {
      const { href, ...anchorProps } = props;
      if (isActuallyDisabled) {
        return (
          <span
            className={cn(combinedClassName, 'cursor-not-allowed opacity-50')}
            aria-disabled="true"
            role="link"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />}
            {!isLoading && leftIcon && <span className="mr-1">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="ml-1">{rightIcon}</span>}
          </span>
        );
      }
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...anchorProps}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />}
          {!isLoading && leftIcon && <span className="mr-1">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-1">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isActuallyDisabled}
        aria-busy={isLoading}
        className={combinedClassName}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />}
        {!isLoading && leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-1">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

