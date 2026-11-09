import { ExperienceItem } from '../types';

/**
 * Work Experience Timeline Data
 *
 * REPLACE PLACEHOLDERS WITH YOUR REAL CAREER HISTORY:
 * Entries are sorted chronologically with the most recent position first.
 * Set `isPlaceholder: false` once updated with your genuine history.
 */
export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-current',
    company: '[Placeholder Tech Company / Client]',
    companyUrl: 'https://example.com',
    jobTitle: '[Senior Software Engineer / Frontend Lead]',
    employmentType: 'Full-time',
    startDate: '2023',
    endDate: 'Present',
    responsibilities: [
      'Lead architectural decisions and modernization of customer-facing web applications.',
      'Collaborate with product managers and designers to refine UX flows and design token standards.',
      'Mentor junior and mid-level engineers through structured code reviews and architectural RFCs.',
    ],
    achievements: [
      'Modernized core web performance scores, cutting initial load latency across low-bandwidth connections.',
      'Standardized component library documentation and accessibility guidelines across engineering pods.',
    ],
    isPlaceholder: true,
  },
  {
    id: 'exp-previous',
    company: '[Placeholder Digital Studio / Agency]',
    companyUrl: 'https://example.com',
    jobTitle: '[Frontend Developer / UI Engineer]',
    employmentType: 'Full-time',
    startDate: '2021',
    endDate: '2023',
    responsibilities: [
      'Built responsive web applications, design systems, and client marketing portals.',
      'Implemented automated accessibility auditing into continuous deployment workflows.',
      'Integrated third-party APIs, analytics platforms, and headless content management systems.',
    ],
    achievements: [
      'Delivered multiple client web platforms on schedule with zero critical production defects.',
      'Created reusable template patterns that reduced subsequent client turnaround times.',
    ],
    isPlaceholder: true,
  },
  {
    id: 'exp-early',
    company: '[Placeholder Startup / Open Source Contributor]',
    companyUrl: 'https://example.com',
    jobTitle: '[Junior Web Developer]',
    employmentType: 'Contract / Internship',
    startDate: '2020',
    endDate: '2021',
    responsibilities: [
      'Developed modular React UI components based on Figma design specifications.',
      'Wrote comprehensive unit and integration tests to ensure cross-browser compatibility.',
      'Assisted in bug triaging, performance profiling, and documentation updates.',
    ],
    achievements: [
      'Refactored legacy CSS into modular Tailwind styling, reducing stylesheet bundle overhead.',
      'Recognized for exceptional attention to detail and proactive problem solving.',
    ],
    isPlaceholder: true,
  },
];

