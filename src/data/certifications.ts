import { CertificationItem } from '../types';

/**
 * Certifications and Achievements Data
 *
 * NOTE ON REAL DATA INTEGRITY:
 * As specified in the project requirements, this array ships EMPTY so that no
 * fabricated certifications are displayed. The UI automatically hides the
 * Certifications section when this array is empty.
 *
 * TO ADD YOUR REAL CERTIFICATIONS:
 * Uncomment and populate the example shape below, or add your own items.
 * Once at least one item is present, the Certifications section will automatically render.
 */
export const certificationsData: CertificationItem[] = [
  /*
  {
    id: 'aws-certified-solutions-architect',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2024',
    credentialUrl: 'https://aws.amazon.com/verification',
    imageUrl: '/images/certifications/aws-csa.svg',
    description:
      'Demonstrated expertise in designing resilient, high-performing, and cost-optimized cloud architectures.',
  },
  {
    id: 'meta-frontend-developer',
    title: 'Meta Frontend Developer Professional Certificate',
    issuer: 'Meta / Coursera',
    issueDate: '2023',
    credentialUrl: 'https://coursera.org/verify/example',
    imageUrl: '/images/certifications/meta-frontend.svg',
    description:
      'Comprehensive curriculum covering advanced React, UI design principles, accessibility, and modern test-driven development.',
  },
  */
];

