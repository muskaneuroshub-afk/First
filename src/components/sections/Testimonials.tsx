import React from 'react';
import { testimonialsData } from '../../data/testimonials';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Carousel } from '../ui/Carousel';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  // Auto-hide section when empty or feature flag disabled
  if (
    !siteConfig.featureFlags.showTestimonials ||
    testimonialsData.length === 0
  ) {
    return null;
  }

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Endorsements"
          title="Colleague & Client Testimonials"
          description="Authentic feedback and recommendations from collaborators, engineering peers, and product leaders."
        />

        <div className="max-w-3xl mx-auto">
          <Carousel autoplay={false} ariaLabel="Client testimonials">
            {testimonialsData.map((item) => (
              <Card
                key={item.id}
                padding="lg"
                className="border-border text-center flex flex-col items-center p-8 sm:p-12 relative"
              >
                <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6" />
                </div>

                <blockquote className="text-base sm:text-xl text-text-primary italic leading-relaxed max-w-2xl mb-8">
                  "{item.feedback}"
                </blockquote>

                <div className="flex flex-col items-center gap-1">
                  <cite className="font-bold text-base text-text-primary not-italic">
                    {item.clientName}
                  </cite>
                  <span className="text-xs sm:text-sm text-text-muted">
                    {item.role} &bull; {item.company}
                  </span>
                </div>
              </Card>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
};

