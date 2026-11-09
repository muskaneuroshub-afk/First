import { AboutData } from '../types';

/**
 * About Me Section Data
 *
 * REPLACE PLACEHOLDERS WITH YOUR ACTUAL DETAILS:
 * Update your background story, core milestones/highlights, interests, and career goals here.
 * Set `isPlaceholder: false` once updated.
 */
export const aboutData: AboutData = {
  isPlaceholder: true,
  intro:
    'Hello! I am a passionate engineer dedicated to building resilient, accessible, and delightful digital experiences.',
  background: [
    'My journey in software started with a deep curiosity about how systems interact and how thoughtful design transforms complex workflows into intuitive software. Over the years, I have worked across the stack, crafting scalable frontend architectures and robust backend services.',
    'I believe that great engineering is not just about clean code—it is about empathy for the end user, adherence to web standards, and delivering measurable business value. Whether prototyping an interactive UI or architecting a design system, I focus on performance, accessibility, and maintainability.',
  ],
  highlights: [
    {
      label: 'Focus',
      value: 'Modern Web & UI/UX',
      description: 'Specializing in React, TypeScript, and responsive interfaces',
    },
    {
      label: 'Philosophy',
      value: 'Accessibility First',
      description: 'Adhering to WCAG AA/AAA standards and inclusive interactions',
    },
    {
      label: 'Approach',
      value: 'Clean Architecture',
      description: 'Modular, maintainable, and thoroughly tested codebases',
    },
    {
      label: 'Collaboration',
      value: 'Agile & Async',
      description: 'Effective cross-functional communication and documentation',
    },
  ],
  interests: [
    'Design Systems & Tokens',
    'Web Performance & Web Vitals',
    'Open Source Software',
    'Human-Computer Interaction',
    'AI-Assisted Workflows',
  ],
  goals:
    'Currently seeking ambitious projects where I can leverage modern frontend technologies and thoughtful architecture to create meaningful user experiences.',
  avatarUrl: '/images/avatar-placeholder.svg',
  avatarAlt: 'Portrait photo of Muskan Waseem',
};

