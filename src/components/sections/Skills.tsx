import React, { useState, useMemo } from 'react';
import { skillCategories, skillsData } from '../../data/skills';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Tabs } from '../ui/Tabs';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter categories that actually contain at least one skill item
  const validCategories = useMemo(() => {
    return skillCategories.filter((cat) =>
      skillsData.some((skill) => skill.category === cat.id)
    );
  }, []);

  const tabs = useMemo(() => {
    const allTab = { id: 'all', label: 'All Disciplines', count: skillsData.length };
    const categoryTabs = validCategories.map((cat) => ({
      id: cat.id,
      label: cat.name,
      count: skillsData.filter((s) => s.category === cat.id).length,
    }));
    return [allTab, ...categoryTabs];
  }, [validCategories]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skillsData;
    return skillsData.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Technical Tooling"
          description="Technologies, frameworks, and modern tools applied across frontend architecture, design, and developer workflows."
        />

        {/* Category Filters */}
        <div className="flex justify-center mb-10">
          <Tabs
            tabs={tabs}
            activeTab={activeCategory}
            onChange={setActiveCategory}
            label="Filter skills by discipline"
          />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill, index) => {
            const hasProficiency = typeof skill.level === 'number';

            return (
              <Reveal key={skill.name} delay={index * 30} direction="up">
                <Card
                  padding="md"
                  className="h-full flex flex-col justify-between border-border hover:border-brand/40"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="p-2.5 rounded-lg bg-bg-secondary border border-border text-brand shrink-0">
                      <Icon name={skill.icon} size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-text-primary text-sm sm:text-base truncate">
                        {skill.name}
                      </h3>
                      <span className="text-xs text-text-muted capitalize">
                        {skillCategories.find((c) => c.id === skill.category)?.name ||
                          skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Optional Proficiency Meter (Only rendered when level is provided) */}
                  {hasProficiency ? (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-text-muted">Proficiency</span>
                        <span className="font-semibold text-brand font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="w-full h-1.5 rounded-full bg-bg-secondary border border-border overflow-hidden"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} proficiency level`}
                      >
                        <div
                          className="h-full bg-brand rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between text-xs text-text-muted">
                      <span>Proficiency</span>
                      <span className="italic">Self-directed</span>
                    </div>
                  )}
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

