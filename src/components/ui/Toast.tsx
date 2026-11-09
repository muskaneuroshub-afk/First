import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  type?: ToastType;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  className,
}) => {
  const icons = {
    info: <Info className="w-5 h-5 text-brand shrink-0" />,
    success: <CheckCircle className="w-5 h-5 text-status-success shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-status-error shrink-0" />,
  };

  const containerStyles = {
    info: 'bg-brand/10 border-brand/30 text-text-primary',
    success: 'bg-status-success/10 border-status-success/30 text-text-primary',
    warning: 'bg-status-warning/10 border-status-warning/30 text-text-primary',
    error: 'bg-status-error/10 border-status-error/30 text-text-primary',
  };

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border transition-all duration-200',
        containerStyles[type],
        className
      )}
    >
      {icons[type]}
      <div className="flex-1 text-sm">
        {title && <h4 className="font-semibold mb-0.5">{title}</h4>}
        <p className="text-text-secondary leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-text-muted hover:text-text-primary rounded p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

