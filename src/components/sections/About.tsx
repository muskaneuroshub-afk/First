import React from 'react';
import { aboutData } from '../../data/about';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2, Compass, Target, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 bg-bg-secondary/50">
      <Container>
        <SectionHeading
          eyebrow="About Me"
          title="Background & Engineering Philosophy"
          description="Crafting resilient digital products that balance aesthetic beauty, robust architecture, and user delight."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Story & Goals (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
              {aboutData.intro}
            </h3>

            {aboutData.background.map((paragraph, index) => (
              <p
                key={index}
                className="text-text-secondary leading-relaxed text-base sm:text-lg"
              >
                {paragraph}
              </p>
            ))}

            {/* Professional Goals Card */}
            <div className="p-5 rounded-xl border border-brand/20 bg-brand/5 space-y-2">
              <div className="flex items-center gap-2 text-brand font-semibold text-sm">
                <Target className="w-4 h-4" />
                <span>Primary Goal</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {aboutData.goals}
              </p>
            </div>

            {/* Key Technical & Design Interests */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-brand" />
                <span>Core Areas of Curiosity & Focus</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {aboutData.interests.map((interest, i) => (
                  <Badge key={i} variant="secondary" size="md">
                    <Sparkles className="w-3.5 h-3.5 text-brand mr-1" />
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Highlights Dashboard (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {aboutData.highlights.map((highlight, idx) => (
              <Card key={idx} padding="md" className="border-border/80">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand/10 text-brand shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-semibold text-brand tracking-wider">
                      {highlight.label}
                    </span>
                    <h4 className="text-base font-bold text-text-primary mt-0.5">
                      {highlight.value}
                    </h4>
                    <p className="text-xs sm:text-sm text-text-muted mt-1 leading-normal">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

