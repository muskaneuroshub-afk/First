import React from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, id, required, maxLength, value, className, ...props },
    ref
  ) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-1.5">
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-primary"
          >
            {label}
            {required && <span className="text-status-error ml-1">*</span>}
          </label>
          {maxLength && (
            <span
              className={cn(
                'text-xs',
                currentLength >= maxLength ? 'text-status-error font-medium' : 'text-text-muted'
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          maxLength={maxLength}
          value={value}
          rows={5}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            'w-full px-3.5 py-2.5 bg-bg-card border rounded-lg text-sm text-text-primary transition-colors placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-y',
            error
              ? 'border-status-error focus:ring-status-error'
              : 'border-border-strong hover:border-border-hover',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-status-error font-medium" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mt-1.5 text-xs text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

