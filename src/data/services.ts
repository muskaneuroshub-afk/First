import { ServiceItem } from '../types';

/**
 * Services Data
 *
 * IMPORTANT PLACEHOLDER POLICY:
 * All entries default to `confirmed: false`.
 * As required by the specification, unconfirmed services are visibly tagged with
 * an "Unconfirmed Placeholder" badge in the UI.
 *
 * To confirm an offering you genuinely provide:
 * 1. Customize the title, description, and deliverables.
 * 2. Set `confirmed: true`.
 * 3. Set `isPlaceholder: false`.
 */
export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Website Development',
    category: 'Engineering',
    icon: 'Code2',
    description:
      'End-to-end full-stack web applications built with modern tools, clean architecture, and SEO best practices.',
    deliverables: [
      'Responsive, mobile-first layouts',
      'Clean TypeScript codebase with strict typing',
      'Production deployment and domain setup',
      'SEO & Open Graph meta configuration',
    ],
    confirmed: false, // Set to true once confirmed by the owner
    isPlaceholder: true,
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    category: 'Engineering',
    icon: 'Layout',
    description:
      'High-performance, interactive user interfaces crafted with React, Vite, Tailwind CSS, and accessible primitives.',
    deliverables: [
      'Pixel-perfect Figma-to-code translation',
      'WCAG 2.1 AA accessibility compliance',
      'Custom animations and micro-interactions',
      'Sub-second page speeds and zero CLS',
    ],
    confirmed: false,
    isPlaceholder: true,
  },
  {
    id: 'website-design',
    title: 'Website Design & UI/UX',
    category: 'Design',
    icon: 'Palette',
    description:
      'Intuitive, user-focused wireframes, design systems, and high-fidelity mockups crafted in Figma.',
    deliverables: [
      'Interactive design prototypes in Figma',
      'Comprehensive design token specification',
      'Light & dark theme design palettes',
      'Component states (hover, focus, active, disabled)',
    ],
    confirmed: false,
    isPlaceholder: true,
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    category: 'Marketing',
    icon: 'Share2',
    description:
      'Strategic brand storytelling, content calendar coordination, and audience community engagement.',
    deliverables: [
      'Content planning and scheduling',
      'Visual asset creation and copywriting',
      'Audience growth and feedback monitoring',
      'Monthly performance and reach analytics',
    ],
    confirmed: false,
    isPlaceholder: true,
  },
  {
    id: 'content-creation',
    title: 'Content Creation & Technical Writing',
    category: 'Marketing',
    icon: 'PenTool',
    description:
      'Clear, developer-friendly documentation, blog articles, case studies, and release announcements.',
    deliverables: [
      'Technical guides and API documentation',
      'In-depth architecture breakdown articles',
      'SEO-optimized technical content',
      'Markdown-ready publication files',
    ],
    confirmed: false,
    isPlaceholder: true,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Support',
    category: 'Marketing',
    icon: 'TrendingUp',
    description:
      'Conversion rate optimization, search engine optimization (SEO), and technical web audit consulting.',
    deliverables: [
      'Comprehensive Core Web Vitals audit',
      'Keyword and search visibility roadmap',
      'Landing page conversion rate enhancements',
      'Structured schema markup implementation',
    ],
    confirmed: false,
    isPlaceholder: true,
  },
];

