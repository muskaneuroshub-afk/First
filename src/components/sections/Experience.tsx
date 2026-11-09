import React from 'react';
import { experienceData } from '../../data/experience';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Reveal } from '../ui/Reveal';
import { Briefcase, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Career Journey"
          title="Professional Experience"
          description="A track record of engineering leadership, scalable frontend architectures, and cross-functional collaboration."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central guide line */}
          <div
            className="absolute left-4 md:left-8 top-3 bottom-3 w-0.5 bg-border -z-0"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {experienceData.map((item, index) => (
              <Reveal key={item.id} delay={index * 50} direction="up">
                <div className="relative pl-12 md:pl-20">
                  {/* Timeline Node Badge */}
                  <div
                    className="absolute left-2 md:left-6 -translate-x-1/2 top-4 w-7 h-7 rounded-full bg-bg-card border-2 border-brand flex items-center justify-center text-brand shadow-sm z-10"
                    aria-hidden="true"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>

                  <Card padding="lg" className="border-border hover:border-brand/30">
                    {/* Header Details */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                          {item.jobTitle}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {item.companyUrl ? (
                            <a
                              href={item.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand font-semibold text-sm hover:underline inline-flex items-center gap-1"
                            >
                              <span>{item.company}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-text-primary font-semibold text-sm">
                              {item.company}
                            </span>
                          )}
                          <span className="text-text-muted text-xs">•</span>
                          <Badge variant="outline" size="sm">
                            {item.employmentType}
                          </Badge>
                        </div>
                      </div>

                      {/* Period Badge */}
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted bg-bg-secondary px-3 py-1.5 rounded-full border border-border w-fit">
                        <Calendar className="w-3.5 h-3.5 text-brand" />
                        <span>
                          {item.startDate} — {item.endDate}
                        </span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="mt-4 space-y-2">
                      <h4 className="text-xs uppercase font-semibold text-text-muted tracking-wider">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1.5">
                        {item.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="text-sm text-text-secondary leading-relaxed flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Milestones / Achievements */}
                    {item.achievements && item.achievements.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border/60 space-y-2">
                        <h4 className="text-xs uppercase font-semibold text-status-success tracking-wider">
                          Key Achievements & Impact
                        </h4>
                        <ul className="space-y-1.5">
                          {item.achievements.map((ach, i) => (
                            <li
                              key={i}
                              className="text-sm text-text-secondary leading-relaxed flex items-start gap-2"
                            >
                              <CheckCircle className="w-4 h-4 text-status-success mt-0.5 shrink-0" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

