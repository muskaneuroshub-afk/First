import { SiteConfig } from '../types';

/**
 * Site Configuration & Identity Data
 *
 * REPLACE PLACEHOLDERS WITH YOUR ACTUAL DETAILS:
 * Update your name, roles, bio, contact email, social links, and SEO settings here.
 * Set `isPlaceholder: false` once you have replaced the placeholder values.
 */
export const siteConfig: SiteConfig = {
  isPlaceholder: true,
  name: 'Muskan Waseem',
  title: '[Your Professional Title]',
  roles: [
    'Frontend Engineer',
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Software Architect',
  ],
  bioShort:
    'I build fast, accessible, and user-centric web applications with clean architecture and modern tools.',
  email: 'your.email@example.com',
  whatsappNumber: '', // Set your international WhatsApp number (e.g. '1234567890'), or leave empty to hide
  location: '[Your City, Country]',
  availability: {
    status: 'available', // 'available' | 'busy' | 'unavailable'
    label: 'Available for new opportunities',
  },
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com',
      label: 'Visit GitHub Profile',
      icon: 'Github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com',
      label: 'Connect on LinkedIn',
      icon: 'Linkedin',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com',
      label: 'Follow on Twitter / X',
      icon: 'Twitter',
    },
  ],
  seo: {
    title: 'Muskan Waseem | Portfolio',
    description:
      'Portfolio of Muskan Waseem: projects, skills, experience and contact information.',
    ogImage: '/og-image.svg',
    canonicalUrl: 'https://your-domain.com',
  },
  featureFlags: {
    // When true, testimonials will display if there are entries in src/data/testimonials.ts
    showTestimonials: true,
    // When true, certifications will display if there are entries in src/data/certifications.ts
    showCertifications: true,
  },
};

