import React from 'react';
import { X } from 'lucide-react';
import { NavItem } from '../../types';
import { ThemeToggle } from './ThemeToggle';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { cn } from '../../lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onNavClick,
}) => {
  useLockBodyScroll(isOpen);
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        ref={containerRef}
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-bg-card border-l border-border shadow-elevated p-6 flex flex-col justify-between overflow-y-auto animate-fade-in"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <span className="font-bold text-lg text-text-primary tracking-tight">Navigation</span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-brand"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 flex flex-col space-y-1.5" aria-label="Mobile links">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.sectionId}
                  href={item.href}
                  onClick={(e) => {
                    onNavClick(e, item.href);
                    onClose();
                  }}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between',
                    isActive
                      ? 'bg-bg-secondary text-text-primary font-semibold border border-border'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-text-primary" />}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <span className="text-xs text-text-muted">Theme appearance</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

