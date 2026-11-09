import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { projectCategories, projectsData } from '../../data/projects';
import { Project } from '../../types';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { SearchInput } from '../ui/SearchInput';
import { Modal } from '../ui/Modal';
import { Reveal } from '../ui/Reveal';
import { useDebounce } from '../../hooks/useDebounce';
import {
  ExternalLink,
  Github,
  Info,
  Star,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearch = useDebounce(searchQuery, 250);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Tabs structure
  const tabs = useMemo(() => {
    return projectCategories.map((cat) => ({
      id: cat,
      label: cat,
      count:
        cat === 'All'
          ? projectsData.length
          : projectsData.filter((p) => p.category === cat).length,
    }));
  }, []);

  // Filter & Search Logic
  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((project) => {
        // Category check
        const matchesCategory =
          selectedCategory === 'All' || project.category === selectedCategory;

        // Search check
        const query = debouncedSearch.toLowerCase().trim();
        const matchesSearch =
          !query ||
          project.title.toLowerCase().includes(query) ||
          project.shortDescription.toLowerCase().includes(query) ||
          project.fullDescription.toLowerCase().includes(query) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(query)) ||
          project.category.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        // Featured projects shown first
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
  }, [selectedCategory, debouncedSearch]);

  // Modal Navigation within currently filtered items
  const currentProjectIndex = useMemo(() => {
    if (!selectedProject) return -1;
    return filteredProjects.findIndex((p) => p.id === selectedProject.id);
  }, [selectedProject, filteredProjects]);

  const handleNextProject = useCallback(() => {
    if (filteredProjects.length <= 1 || currentProjectIndex === -1) return;
    const nextIdx = (currentProjectIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIdx]);
  }, [currentProjectIndex, filteredProjects]);

  const handlePrevProject = useCallback(() => {
    if (filteredProjects.length <= 1 || currentProjectIndex === -1) return;
    const prevIdx =
      (currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIdx]);
  }, [currentProjectIndex, filteredProjects]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextProject();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handleNextProject, handlePrevProject]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-20 bg-bg-secondary/40">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Engineering Projects"
          description="A selection of web applications, design systems, and developer tools built with high performance and accessibility in mind."
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <Tabs
            tabs={tabs}
            activeTab={selectedCategory}
            onChange={setSelectedCategory}
            label="Filter projects by category"
          />

          <div className="w-full md:w-72">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by title, tech, keyword..."
            />
          </div>
        </div>

        {/* Live Region for Screen Readers announcing result count */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {filteredProjects.length === 1
            ? '1 project found'
            : `${filteredProjects.length} projects found`}
        </div>

        {/* Project Results or Empty State */}
        {filteredProjects.length === 0 ? (
          <Card className="text-center py-16 px-6 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-bg-secondary border border-border flex items-center justify-center mx-auto text-text-muted mb-4">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">No projects found</h3>
            <p className="text-sm text-text-muted mb-6 leading-relaxed">
              We couldn't find any projects matching your current filters. Try searching with a
              different keyword or reset your filters.
            </p>
            <Button variant="secondary" onClick={handleClearFilters}>
              Clear All Filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 40} direction="up">
                <Card
                  padding="none"
                  className="h-full flex flex-col justify-between border-border hover:border-brand/40 group"
                >
                  <div>
                    {/* Thumbnail Image Container (Fixed aspect ratio to prevent CLS) */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-secondary border-b border-border">
                      <img
                        src={project.thumbnailUrl}
                        alt={`${project.title} preview screenshot`}
                        loading="lazy"
                        width="640"
                        height="360"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand text-brand-foreground shadow-sm">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute bottom-3 right-3">
                        <span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded bg-bg-card/90 backdrop-blur text-text-secondary border border-border">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-brand transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {project.shortDescription}
                      </p>

                      {/* Technologies Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-border flex items-center justify-between gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                      leftIcon={<Info className="w-4 h-4" />}
                    >
                      Details
                    </Button>

                    <div className="flex items-center gap-2">
                      {project.sourceUrl ? (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-border bg-bg-card hover:bg-bg-card-hover text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      ) : (
                        <span
                          className="p-2 rounded-lg border border-border/40 text-text-muted/40 cursor-not-allowed"
                          title="Source code is private or closed-source"
                          aria-disabled="true"
                        >
                          <Github className="w-4 h-4" />
                        </span>
                      )}

                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-brand/30 bg-brand/5 hover:bg-brand/10 text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
                          aria-label={`Open live demonstration for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span
                          className="p-2 rounded-lg border border-border/40 text-text-muted/40 cursor-not-allowed"
                          title="Live demonstration not configured or offline"
                          aria-disabled="true"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        )}

        {/* Accessible Project Details Modal with Next/Prev Controls */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title || 'Project Details'}
          description={selectedProject?.category}
          maxWidth="2xl"
        >
          {selectedProject && (
            <div className="space-y-6">
              {/* Modal Image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-bg-secondary border border-border">
                <img
                  src={selectedProject.thumbnailUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  Overview & Scope
                </h4>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Role & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-bg-secondary border border-border text-sm">
                <div>
                  <span className="text-xs uppercase font-semibold text-text-muted block">
                    Role & Responsibility
                  </span>
                  <span className="font-medium text-text-primary mt-0.5 block">
                    {selectedProject.role}
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-text-muted block">
                    Category
                  </span>
                  <span className="font-medium text-text-primary mt-0.5 block">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Challenges & Outcomes (if available) */}
              {(selectedProject.challenges || selectedProject.outcomes) && (
                <div className="space-y-4">
                  {selectedProject.challenges && (
                    <div className="space-y-1">
                      <h4 className="text-xs uppercase font-semibold text-brand tracking-wider">
                        Key Engineering Challenge
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>
                  )}
                  {selectedProject.outcomes && (
                    <div className="space-y-1">
                      <h4 className="text-xs uppercase font-semibold text-status-success tracking-wider">
                        Measurable Impact & Result
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {selectedProject.outcomes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-text-muted tracking-wider mb-2">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Links & Carousel Next/Prev Nav */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* External Links */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedProject.demoUrl && (
                    <Button
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      leftIcon={<ExternalLink className="w-4 h-4" />}
                    >
                      Visit Live Demo
                    </Button>
                  )}
                  {selectedProject.sourceUrl && (
                    <Button
                      href={selectedProject.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      leftIcon={<Github className="w-4 h-4" />}
                    >
                      View Code
                    </Button>
                  )}
                </div>

                {/* Filter-aware Prev/Next Controls */}
                {filteredProjects.length > 1 && (
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <span className="text-xs text-text-muted mr-1">
                      {currentProjectIndex + 1} of {filteredProjects.length}
                    </span>
                    <button
                      type="button"
                      onClick={handlePrevProject}
                      className="p-1.5 rounded-lg border border-border bg-bg-card hover:bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                      aria-label="Previous project in filtered list"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextProject}
                      className="p-1.5 rounded-lg border border-border bg-bg-card hover:bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                      aria-label="Next project in filtered list"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal>
      </Container>
    </section>
  );
};

