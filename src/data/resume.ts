import { ResumeData } from '../types';

/**
 * Resume Configuration & Summary
 *
 * HOW TO UPDATE YOUR CV:
 * 1. Place your actual resume PDF into `public/resume/your-cv-name.pdf`.
 * 2. Update `pdfPath` below to match your filename (e.g. '/resume/your-cv-name.pdf').
 * 3. Set `pdfAvailable: true`.
 *
 * If `pdfAvailable` is false, the UI will display a helpful, honest "CV coming soon"
 * disabled button with tooltip instructions.
 */
export const resumeConfig: ResumeData = {
  pdfPath: '/resume/placeholder-cv.pdf',
  pdfAvailable: true, // Set to true when your PDF is placed in public/resume/
  lastUpdated: 'November 2026',
  summary:
    'Experienced engineer with a focus on modern web architecture, accessibility (WCAG AA), scalable design systems, and resilient user interfaces.',
  highlights: [
    {
      title: 'Bachelor of Science in Computer Science / Software Engineering',
      subtitle: '[Your University / Educational Institution]',
      period: '2017 – 2021',
    },
    {
      title: 'Senior Software Engineer / Frontend Lead',
      subtitle: '[Placeholder Company / Tech Team]',
      period: '2023 – Present',
    },
    {
      title: 'Frontend Developer',
      subtitle: '[Digital Agency / Studio]',
      period: '2021 – 2023',
    },
  ],
};

