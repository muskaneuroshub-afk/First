import { siteConfig } from '../data/site';
import { aboutData } from '../data/about';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { servicesData } from '../data/services';
import { certificationsData } from '../data/certifications';
import { testimonialsData } from '../data/testimonials';

export interface PlaceholderStatus {
  file: string;
  hasPlaceholder: boolean;
  reason: string;
}

export function detectPlaceholders(): PlaceholderStatus[] {
  const statuses: PlaceholderStatus[] = [];

  // Check site.ts
  if (siteConfig.isPlaceholder || siteConfig.name.includes('[') || siteConfig.email.includes('[')) {
    statuses.push({
      file: 'src/data/site.ts',
      hasPlaceholder: true,
      reason: 'Contains placeholder name, title, or contact details.',
    });
  }

  // Check about.ts
  if (aboutData.isPlaceholder || aboutData.intro.includes('[')) {
    statuses.push({
      file: 'src/data/about.ts',
      hasPlaceholder: true,
      reason: 'Contains placeholder background or biography.',
    });
  }

  // Check skills.ts
  if (skillsData.some((s) => s.isPlaceholder || s.name.includes('['))) {
    statuses.push({
      file: 'src/data/skills.ts',
      hasPlaceholder: true,
      reason: 'Contains placeholder skill items.',
    });
  }

  // Check projects.ts
  if (projectsData.some((p) => p.isPlaceholder || p.title.includes('['))) {
    statuses.push({
      file: 'src/data/projects.ts',
      hasPlaceholder: true,
      reason: 'Contains placeholder project entries or mock repositories.',
    });
  }

  // Check experience.ts
  if (experienceData.some((e) => e.isPlaceholder || e.company.includes('['))) {
    statuses.push({
      file: 'src/data/experience.ts',
      hasPlaceholder: true,
      reason: 'Contains placeholder companies or job roles.',
    });
  }

  // Check services.ts
  if (servicesData.some((s) => !s.confirmed || s.isPlaceholder || s.title.includes('['))) {
    statuses.push({
      file: 'src/data/services.ts',
      hasPlaceholder: true,
      reason: 'Contains unconfirmed services (marked confirmed: false).',
    });
  }

  // Check certifications.ts
  if (certificationsData.length === 0) {
    // Empty is expected for clean start, but we track if any entry has placeholder
  } else if (certificationsData.some((c) => c.title.includes('['))) {
    statuses.push({
      file: 'src/data/certifications.ts',
      hasPlaceholder: true,
      reason: 'Contains placeholder certification records.',
    });
  }

  // Check testimonials.ts
  if (testimonialsData.some((t) => t.clientName.includes('['))) {
    statuses.push({
      file: 'src/data/testimonials.ts',
      hasPlaceholder: true,
      reason: 'Contains placeholder testimonial records.',
    });
  }

  return statuses;
}

