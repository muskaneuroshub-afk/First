import { TestimonialItem } from '../types';

/**
 * Client Testimonials Data
 *
 * NOTE ON TESTIMONIAL INTEGRITY:
 * In strict adherence to the project specification, this array ships EMPTY.
 * No fake testimonials or artificial endorsements are fabricated.
 * The Testimonials section is automatically hidden when this array has 0 items
 * or when `siteConfig.featureFlags.showTestimonials` is set to false.
 *
 * TO ADD GENUINE TESTIMONIALS:
 * Uncomment and fill out the shape below with authentic endorsements from colleagues or clients.
 */
export const testimonialsData: TestimonialItem[] = [
  /*
  {
    id: 'testimonial-1',
    clientName: 'Alex Morgan',
    role: 'Engineering Director',
    company: 'Nexus Tech Labs',
    feedback:
      'An exceptional engineer who bridges architectural precision with pixel-perfect design. Delivered our customer portal with remarkable speed and flawless accessibility.',
    avatarUrl: '/images/testimonials/alex-morgan.svg',
  },
  {
    id: 'testimonial-2',
    clientName: 'Sarah Jenkins',
    role: 'Product Lead',
    company: 'Apex Digital Solutions',
    feedback:
      'Working together was a breath of fresh air. Thorough communication, clean code reviews, and deep expertise in React performance optimization.',
    avatarUrl: '/images/testimonials/sarah-jenkins.svg',
  },
  */
];

