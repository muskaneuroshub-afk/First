import { SkillCategory, SkillItem } from '../types';

/**
 * Skill Categories
 * Add, remove, or modify categories to match your expertise.
 */
export const skillCategories: SkillCategory[] = [
  { id: 'frontend', name: 'Frontend Development' },
  { id: 'languages', name: 'Programming Languages' },
  { id: 'design', name: 'Design Tools' },
  { id: 'marketing', name: 'Digital Marketing' },
  { id: 'social', name: 'Social Media Management' },
  { id: 'productivity', name: 'Productivity Tools' },
  { id: 'ai', name: 'AI Tools' },
];

/**
 * Skills Data
 *
 * NOTE ON PROFICIENCY LEVELS:
 * The `level` field (0-100) is completely OPTIONAL.
 * When omitted or undefined, the UI automatically hides the proficiency progress meter
 * to ensure no artificial or fabricated metrics are shown.
 */
export const skillsData: SkillItem[] = [
  // Frontend Development
  {
    name: 'React & React Ecosystem',
    category: 'frontend',
    icon: 'Atom',
    level: 90,
    isPlaceholder: true,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'FileCode2',
    level: 85,
    isPlaceholder: true,
  },
  {
    name: 'Tailwind CSS & Design Tokens',
    category: 'frontend',
    icon: 'Palette',
    level: 90,
    isPlaceholder: true,
  },
  {
    name: 'HTML5 Semantic & WCAG AA/AAA',
    category: 'frontend',
    icon: 'Layout',
    level: 95,
    isPlaceholder: true,
  },
  {
    name: 'Next.js & Modern SSR',
    category: 'frontend',
    icon: 'Layers',
    // No level specified to demonstrate optional proficiency meter hiding
    isPlaceholder: true,
  },

  // Programming Languages
  {
    name: 'JavaScript (ESNext)',
    category: 'languages',
    icon: 'Code2',
    level: 90,
    isPlaceholder: true,
  },
  {
    name: 'TypeScript',
    category: 'languages',
    icon: 'Binary',
    level: 85,
    isPlaceholder: true,
  },
  {
    name: 'CSS3 / Modern CSS Architecture',
    category: 'languages',
    icon: 'FileSpreadsheet',
    level: 90,
    isPlaceholder: true,
  },

  // Design Tools
  {
    name: 'Figma (UI Design & Wireframing)',
    category: 'design',
    icon: 'Figma',
    level: 80,
    isPlaceholder: true,
  },
  {
    name: 'Design Systems & Component Libraries',
    category: 'design',
    icon: 'Component',
    // No level specified
    isPlaceholder: true,
  },

  // Digital Marketing
  {
    name: 'SEO & Core Web Vitals Optimization',
    category: 'marketing',
    icon: 'TrendingUp',
    level: 85,
    isPlaceholder: true,
  },
  {
    name: 'Analytics & Conversion Tracking',
    category: 'marketing',
    icon: 'BarChart2',
    isPlaceholder: true,
  },

  // Social Media Management
  {
    name: 'Brand Strategy & Content Calendars',
    category: 'social',
    icon: 'Share2',
    isPlaceholder: true,
  },
  {
    name: 'Audience Engagement & Growth',
    category: 'social',
    icon: 'Users',
    isPlaceholder: true,
  },

  // Productivity Tools
  {
    name: 'Git & GitHub Collaboration',
    category: 'productivity',
    icon: 'GitBranch',
    level: 90,
    isPlaceholder: true,
  },
  {
    name: 'VS Code & Advanced DevTools',
    category: 'productivity',
    icon: 'Terminal',
    level: 95,
    isPlaceholder: true,
  },

  // AI Tools
  {
    name: 'Antigravity & Agentic Pair Programming',
    category: 'ai',
    icon: 'Sparkles',
    level: 90,
    isPlaceholder: true,
  },
  {
    name: 'Prompt Engineering & Workflow Automation',
    category: 'ai',
    icon: 'Bot',
    isPlaceholder: true,
  },
];

