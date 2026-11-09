import React from 'react';
import { certificationsData } from '../../data/certifications';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Award, ExternalLink, Calendar } from 'lucide-react';

export const Certifications: React.FC = () => {
  // Auto-hide section when data array is empty or feature flag is disabled
  if (
    !siteConfig.featureFlags.showCertifications ||
    certificationsData.length === 0
  ) {
    return null;
  }

  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="py-20 bg-bg-secondary/40">
      <Container>
        <SectionHeading
          eyebrow="Accreditations"
          title="Certifications & Honors"
          description="Formal industry credentials and specialized certifications verifying engineering competence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert) => (
            <Card key={cert.id} padding="lg" className="border-border hover:border-brand/40 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-brand/10 text-brand shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted bg-bg-secondary px-2.5 py-1 rounded-md border border-border">
                    <Calendar className="w-3.5 h-3.5 text-brand" />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs uppercase font-semibold text-brand tracking-wider mb-3">
                  {cert.issuer}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {cert.credentialUrl && (
                <div className="pt-4 mt-4 border-t border-border">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline focus:outline-none focus:ring-1 focus:ring-brand rounded"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

