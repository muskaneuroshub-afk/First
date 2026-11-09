import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { BackToTop } from '../components/layout/BackToTop';
import { DevPlaceholderBanner } from '../components/layout/DevPlaceholderBanner';

import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Experience } from '../components/sections/Experience';
import { Services } from '../components/sections/Services';
import { Resume } from '../components/sections/Resume';
import { Certifications } from '../components/sections/Certifications';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Navigation Header */}
      <Navbar />

      {/* Development-Only Placeholder Detector Banner */}
      <DevPlaceholderBanner />

      {/* Main Landmark */}
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Resume />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top floating button */}
      <BackToTop />
    </div>
  );
};

