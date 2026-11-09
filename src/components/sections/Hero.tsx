import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../data/site';
import { resumeConfig } from '../../data/resume';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Container } from '../ui/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArrowDown, Download, Eye, Mail, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const roles = siteConfig.roles;

  useEffect(() => {
    if (prefersReducedMotion || roles.length <= 1) return;

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, roles.length]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction & Overview"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background radial gradient glow (subtle monochrome white blur, ~6% opacity) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-white/[0.06] dark:bg-white/[0.06] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-card border border-border shadow-subtle text-xs sm:text-sm font-medium text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span>{siteConfig.availability.label}</span>
            </div>

            {/* Title & Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
                <span className="text-text-secondary font-bold">Hi, I'm</span>{' '}
                <span className="text-text-primary">{siteConfig.name}</span>
              </h1>

              {/* Animated Rotating Role */}
              <div
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-text-secondary flex items-center justify-center lg:justify-start gap-2 h-10"
                aria-live="polite"
                aria-atomic="true"
              >
                <Sparkles className="w-5 h-5 text-text-muted shrink-0" aria-hidden="true" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-secondary to-text-muted transition-all duration-300">
                  {roles[roleIndex]}
                </span>
              </div>
            </div>

            {/* Introduction Bio */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              {siteConfig.bioShort}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Button
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                variant="primary"
                size="lg"
                leftIcon={<Eye className="w-4 h-4" />}
              >
                View My Work
              </Button>

              <Button
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                variant="secondary"
                size="lg"
                leftIcon={<Mail className="w-4 h-4" />}
              >
                Contact Me
              </Button>

              {resumeConfig.pdfAvailable ? (
                <Button
                  href={resumeConfig.pdfPath}
                  download
                  variant="outline"
                  size="lg"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download CV
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  disabled
                  leftIcon={<Download className="w-4 h-4" />}
                  title="CV PDF will be available soon"
                >
                  CV Coming Soon
                </Button>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs uppercase tracking-wider text-text-muted font-semibold mr-1">
                Connect:
              </span>
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-bg-card hover:bg-bg-card-hover hover:border-border-hover text-text-secondary hover:text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Visual / Avatar */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl p-2 bg-gradient-to-tr from-text-primary/70 via-border-strong to-bg-card shadow-elevated">
              <div className="w-full h-full rounded-xl overflow-hidden bg-bg-card border border-border flex items-center justify-center relative">
                <img
                  src="/images/avatar-placeholder.svg"
                  alt={`Portrait of ${siteConfig.name}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="320"
                  height="320"
                />
              </div>

              {/* Decorative Floater Tag */}
              <div className="absolute -bottom-4 -left-4 bg-bg-card border border-border py-2 px-3.5 rounded-xl shadow-elevated flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                <span className="text-xs font-semibold text-text-primary">
                  100% Accessible & Modern
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, 'about')}
            className="flex flex-col items-center gap-2 text-text-muted hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand rounded p-1"
            aria-label="Scroll down to About section"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </Container>
    </section>
  );
};
