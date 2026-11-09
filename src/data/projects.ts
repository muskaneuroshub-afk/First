import { Project } from '../types';

/**
 * Projects Data
 *
 * REPLACE PLACEHOLDERS WITH YOUR REAL WORK:
 * Add your real projects with real screenshots (stored in `public/images/projects/`).
 * Set `isPlaceholder: false` once you replace these with your actual projects.
 */
export const projectCategories = [
  'All',
  'Web Applications',
  'Design Systems',
  'Open Source',
  'E-Commerce',
];

export const projectsData: Project[] = [
  {
    id: 'enterprise-dashboard',
    title: '[Placeholder Project: Analytics Dashboard]',
    shortDescription:
      'High-performance analytics platform with real-time telemetry, fluid charts, and accessible dark mode.',
    fullDescription:
      'A comprehensive telemetry and analytics dashboard built to monitor cloud infrastructure in real time. Designed with a modular design system, custom virtualization for high-throughput data tables, and full WCAG 2.1 AA keyboard navigation.',
    category: 'Web Applications',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    thumbnailUrl: '/images/projects/project-1.svg',
    demoUrl: 'https://example.com/demo-1',
    sourceUrl: 'https://github.com/example/analytics-dashboard',
    featured: true,
    role: 'Lead Frontend Architect',
    challenges:
      'Rendering thousands of telemetry data points without UI jank or dropping frames on mobile viewports.',
    outcomes:
      'Decreased client-side render times by 40% using memoized canvas rendering and state normalization.',
    isPlaceholder: true,
  },
  {
    id: 'design-tokens-system',
    title: '[Placeholder Project: Unified Design Tokens]',
    shortDescription:
      'Cross-platform token management engine bridging Figma variables and production CSS custom properties.',
    fullDescription:
      'An automated design token synchronization pipeline that exports design tokens from Figma and compiles them to JSON, CSS variables, and iOS/Android constants with zero human intervention.',
    category: 'Design Systems',
    technologies: ['TypeScript', 'Node.js', 'Figma API', 'CSS Variables'],
    thumbnailUrl: '/images/projects/project-2.svg',
    demoUrl: 'https://example.com/demo-2',
    sourceUrl: 'https://github.com/example/tokens-pipeline',
    featured: true,
    role: 'Design Systems Engineer',
    challenges:
      'Preserving semantic aliases and contrast validation while transforming tokens into multiple platform targets.',
    outcomes:
      'Eliminated manual token handoff discrepancies and achieved 100% automated contrast validation.',
    isPlaceholder: true,
  },
  {
    id: 'headless-storefront',
    title: '[Placeholder Project: Headless Storefront]',
    shortDescription:
      'Blazing-fast e-commerce shopping experience with instant cart updates and edge-computed discounts.',
    fullDescription:
      'A decoupled, modern storefront designed for seamless conversions. Implements optimistic UI cart mutations, accessible drawer checkout flows, and sub-second page transitions.',
    category: 'E-Commerce',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Vitals'],
    thumbnailUrl: '/images/projects/project-3.svg',
    demoUrl: 'https://example.com/demo-3',
    sourceUrl: 'https://github.com/example/headless-storefront',
    featured: true,
    role: 'Senior Frontend Developer',
    challenges:
      'Maintaining zero cumulative layout shift (CLS) across varied product image aspect ratios and dynamic reviews.',
    outcomes:
      'Achieved a 99 Lighthouse performance score and 0.00 CLS across desktop and mobile benchmarks.',
    isPlaceholder: true,
  },
  {
    id: 'developer-cli-suite',
    title: '[Placeholder Project: Developer Productivity CLI]',
    shortDescription:
      'Lightweight terminal toolkit for scaffolding clean architecture templates and generating automated tests.',
    fullDescription:
      'An interactive terminal CLI that accelerates developer onboarding. Generates typed API clients, unit test harnesses, and component boilerplate adhering to strict organizational standards.',
    category: 'Open Source',
    technologies: ['TypeScript', 'Node.js', 'commander', 'npm'],
    thumbnailUrl: '/images/projects/project-4.svg',
    demoUrl: undefined, // Example of project without demoUrl - UI honestly displays disabled/hidden demo link
    sourceUrl: 'https://github.com/example/dev-cli',
    featured: false,
    role: 'Open Source Maintainer',
    challenges:
      'Supporting cross-platform terminal formatting and graceful handling of filesystem permissions.',
    outcomes:
      'Adopted by internal teams to reduce repository setup time from 3 hours to 4 minutes.',
    isPlaceholder: true,
  },
  {
    id: 'content-management-hub',
    title: '[Placeholder Project: Minimalist Headless CMS]',
    shortDescription:
      'Content editing hub featuring live preview, localized assets, and role-based permissions.',
    fullDescription:
      'A responsive CMS interface focused on author experience and fast markdown composition. Includes inline asset tagging, keyboard-driven navigation, and instant preview rendering.',
    category: 'Web Applications',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    thumbnailUrl: '/images/projects/project-5.svg',
    demoUrl: 'https://example.com/demo-5',
    sourceUrl: undefined, // Example of private/closed-source project - UI honestly hides or disables source button
    featured: false,
    role: 'UI/UX & Frontend Engineer',
    challenges:
      'Providing responsive split-pane editing with synchronized cursor positioning and live markdown previews.',
    outcomes:
      'Streamlined editorial turnaround with instant validation and zero layout drift.',
    isPlaceholder: true,
  },
  {
    id: 'accessible-component-library',
    title: '[Placeholder Project: Accessible Primitives]',
    shortDescription:
      'Unstyled, accessible React primitives with focus management, WAI-ARIA patterns, and screen reader announcements.',
    fullDescription:
      'A library of head-less UI components emphasizing keyboard navigation, focus trap accuracy, and ARIA 1.2 adherence. Serves as the foundation for multi-brand design systems.',
    category: 'Open Source',
    technologies: ['React', 'TypeScript', 'A11y', 'WAI-ARIA'],
    thumbnailUrl: '/images/projects/project-6.svg',
    demoUrl: 'https://example.com/demo-6',
    sourceUrl: 'https://github.com/example/a11y-primitives',
    featured: false,
    role: 'Accessibility Specialist',
    challenges:
      'Ensuring consistent screen reader announcements across NVDA, VoiceOver, and JAWS for complex comboboxes.',
    outcomes:
      'Achieved 100% automated and manual accessibility audit scores across all tested screen readers.',
    isPlaceholder: true,
  },
];

