import React from 'react';
import { siteConfig } from '../../data/site';
import { navigationLinks } from '../../data/navigation';
import { Icon } from '../ui/Icon';
import { Container } from '../ui/Container';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-bg-secondary border-t border-border mt-20 pt-16 pb-12 text-sm text-text-secondary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="#hero"
              className="text-xl font-bold tracking-tight text-text-primary hover:text-text-primary transition-colors inline-block"
            >
              <span className="text-text-muted">&lt;</span>
              {siteConfig.name}
              <span className="text-text-muted"> /&gt;</span>
            </a>
            <p className="text-text-muted text-sm max-w-md leading-relaxed">
              {siteConfig.bioShort}
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-bg-card hover:bg-bg-card-hover hover:border-brand/50 text-text-secondary hover:text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary uppercase tracking-wider text-xs mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {navigationLinks.slice(0, 5).map((link) => (
                <li key={link.sectionId}>
                  <a
                    href={link.href}
                    className="hover:text-brand transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Status */}
          <div>
            <h3 className="font-semibold text-text-primary uppercase tracking-wider text-xs mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-brand transition-colors break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-text-muted">{siteConfig.location}</li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full bg-status-success/10 text-status-success border border-status-success/20">
                  <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                  {siteConfig.availability.label}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            &copy; {currentYear} {siteConfig.name}. Designed & Built with clean architecture, React & Tailwind CSS.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand rounded p-1"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
};

