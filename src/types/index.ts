export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string; // Lucide icon identifier or standard slug
}

export interface SiteConfig {
  name: string;
  title: string;
  roles: string[];
  bioShort: string;
  email: string;
  whatsappNumber?: string;
  location: string;
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    label: string;
  };
  socialLinks: SocialLink[];
  seo: {
    title: string;
    description: string;
    ogImage: string;
    canonicalUrl: string;
  };
  featureFlags: {
    showTestimonials: boolean;
    showCertifications: boolean;
  };
  isPlaceholder: boolean;
}

export interface AboutHighlight {
  label: string;
  value: string;
  description: string;
}

export interface AboutData {
  intro: string;
  background: string[];
  highlights: AboutHighlight[];
  interests: string[];
  goals: string;
  avatarUrl: string;
  avatarAlt: string;
  isPlaceholder: boolean;
}

export interface SkillItem {
  name: string;
  category: string;
  icon: string;
  level?: number; // Optional 0-100. When absent, proficiency bar is hidden.
  isPlaceholder: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  technologies: string[];
  thumbnailUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  role: string;
  challenges?: string;
  outcomes?: string;
  isPlaceholder: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  jobTitle: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements: string[];
  isPlaceholder: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  deliverables: string[];
  confirmed: boolean; // false indicates an unconfirmed placeholder service
  isPlaceholder: boolean;
}

export interface ResumeData {
  pdfPath: string;
  pdfAvailable: boolean;
  lastUpdated: string;
  summary: string;
  highlights: Array<{
    title: string;
    subtitle: string;
    period: string;
  }>;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  imageUrl?: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  feedback: string;
  avatarUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  isConfigured: boolean;
}

