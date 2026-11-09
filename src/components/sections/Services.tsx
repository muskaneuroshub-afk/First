import React from 'react';
import { servicesData } from '../../data/services';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { ArrowRight, Check, AlertTriangle } from 'lucide-react';

export const Services: React.FC = () => {
  const handleSelectService = (serviceTitle: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to prefill subject in contact form
      window.dispatchEvent(
        new CustomEvent('prefill-contact-subject', {
          detail: { subject: `Inquiry regarding ${serviceTitle}` },
        })
      );
    }
  };

  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 bg-bg-secondary/40">
      <Container>
        <SectionHeading
          eyebrow="Offerings"
          title="Services & Capabilities"
          description="High-impact technical and creative solutions designed to elevate your web presence and developer velocity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => (
            <Reveal key={service.id} delay={index * 40} direction="up">
              <Card
                padding="lg"
                className="h-full flex flex-col justify-between border-border hover:border-brand/40"
              >
                <div>
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-brand/10 text-brand shrink-0">
                      <Icon name={service.icon} size={24} />
                    </div>

                    {/* Unconfirmed placeholder notice if confirmed is false */}
                    {!service.confirmed ? (
                      <Badge variant="warning" size="sm">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Unconfirmed Offering
                      </Badge>
                    ) : (
                      <Badge variant="brand" size="sm">
                        {service.category}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs uppercase font-semibold text-text-muted tracking-wider">
                      Included Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm text-text-secondary flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => handleSelectService(service.title)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Inquire About This Service
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

