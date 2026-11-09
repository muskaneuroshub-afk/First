import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        'relative p-2 rounded-lg border border-border bg-bg-card hover:bg-bg-card-hover text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-text-primary animate-fade-in" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-text-secondary animate-fade-in" aria-hidden="true" />
      )}
    </button>
  );
};

