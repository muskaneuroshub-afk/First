import React from 'react';
import { resumeConfig } from '../../data/resume';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Download, FileText, GraduationCap, CheckCircle2 } from 'lucide-react';

export const Resume: React.FC = () => {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Credentials"
          title="Resume & Qualifications"
          description="A summary of academic milestones, engineering leadership, and verifiable background qualifications."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Resume Overview Header Card */}
          <Card padding="lg" className="border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand font-semibold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Curriculum Vitae</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Professional Profile Summary
                </h3>
                <p className="text-xs text-text-muted">
                  Document Version: {resumeConfig.lastUpdated}
                </p>
              </div>

              {/* Download Action */}
              <div>
                {resumeConfig.pdfAvailable ? (
                  <Button
                    href={resumeConfig.pdfPath}
                    download
                    variant="primary"
                    size="md"
                    leftIcon={<Download className="w-4 h-4" />}
                  >
                    Download CV (PDF)
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="md"
                    disabled
                    leftIcon={<Download className="w-4 h-4" />}
                    title="Please add your CV to public/resume/ and set pdfAvailable to true"
                  >
                    CV Coming Soon
                  </Button>
                )}
              </div>
            </div>

            {/* Narrative Summary */}
            <p className="mt-6 text-sm sm:text-base text-text-secondary leading-relaxed">
              {resumeConfig.summary}
            </p>

            {/* Highlights Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {resumeConfig.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-bg-secondary border border-border flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-brand uppercase tracking-wider block">
                      {item.period}
                    </span>
                    <h4 className="text-sm font-bold text-text-primary">
                      {item.title}
                    </h4>
                    <p className="text-xs text-text-muted">{item.subtitle}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-status-success font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Milestone</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Notice regarding PDF location for maintainers */}
            <div className="mt-8 p-3.5 rounded-lg bg-bg-secondary/60 border border-border/80 flex items-center gap-2.5 text-xs text-text-muted">
              <GraduationCap className="w-4 h-4 text-brand shrink-0" />
              <span>
                To customize the downloadable CV, drop your PDF into <code className="text-text-primary font-mono bg-bg-card px-1 py-0.5 rounded border border-border">public/resume/</code> and configure its filename in <code className="text-text-primary font-mono bg-bg-card px-1 py-0.5 rounded border border-border">src/data/resume.ts</code>.
              </span>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};

