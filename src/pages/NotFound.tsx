import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Home, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../data/site';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary px-4 py-16">
      <Container size="sm" className="text-center space-y-6">
        <span className="text-6xl sm:text-8xl font-black text-brand tracking-tighter">
          404
        </span>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto leading-relaxed">
            The page or route you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="md"
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Go Back
          </Button>
        </div>

        <div className="pt-8 text-xs text-text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </div>
  );
};

