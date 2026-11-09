import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { navigationLinks } from '../../data/navigation';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { cn } from '../../lib/utils';
import { Container } from '../ui/Container';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionIds = navigationLinks.map((item) => item.sectionId);
  const activeSection = useScrollSpy(sectionIds, 90);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
      // Update hash without jumping
      window.history.pushState(null, '', href);
    }
  };

  return (
    <>
      {/* Skip to Content accessible link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-brand-foreground focus:rounded-lg focus:shadow-elevated focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'glass-header py-3.5 shadow-subtle'
            : 'bg-transparent py-5'
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Brand Logo / Wordmark */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="text-lg sm:text-xl font-extrabold tracking-tight text-text-primary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1"
              aria-label={`${siteConfig.name} - Back to top`}
            >
              <span className="text-text-muted">&lt;</span>
              {siteConfig.name}
              <span className="text-text-muted"> /&gt;</span>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center space-x-1"
              aria-label="Main navigation"
            >
              {navigationLinks.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <a
                    key={item.sectionId}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand relative',
                      isActive
                        ? 'text-text-primary font-semibold bg-bg-card shadow-subtle border border-border'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle />
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-lg bg-brand text-brand-foreground hover:bg-brand-hover transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg border border-border bg-bg-card hover:bg-bg-card-hover text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navigationLinks}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </>
  );
};

