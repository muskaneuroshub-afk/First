import React, { useState } from 'react';
import { detectPlaceholders } from '../../lib/placeholders';
import { AlertCircle, ChevronDown, ChevronUp, X } from 'lucide-react';

export const DevPlaceholderBanner: React.FC = () => {
  // Never show in production builds
  if (!import.meta.env.DEV) {
    return null;
  }

  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const placeholderFiles = detectPlaceholders();

  if (isDismissed || placeholderFiles.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Development placeholder notice"
      className="fixed bottom-4 left-4 z-40 max-w-sm sm:max-w-md w-full bg-bg-card border border-amber-500/30 rounded-xl shadow-elevated text-xs overflow-hidden backdrop-blur"
    >
      <div className="p-3 bg-amber-500/10 flex items-center justify-between gap-2 border-b border-amber-500/20">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Placeholder content detected ({placeholderFiles.length} files)</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-text-muted hover:text-text-primary rounded focus:outline-none focus:ring-1 focus:ring-brand"
            aria-label={isExpanded ? 'Collapse placeholder details' : 'Expand placeholder details'}
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 text-text-muted hover:text-text-primary rounded focus:outline-none focus:ring-1 focus:ring-brand"
            aria-label="Dismiss placeholder banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-3 max-h-48 overflow-y-auto space-y-2 bg-bg-card">
          <p className="text-text-muted text-[11px]">
            The following files currently contain placeholder strings or unconfirmed data. Replace them with your real info as detailed in <code className="bg-bg-secondary px-1 py-0.5 rounded text-brand">docs/CONTENT_GUIDE.md</code>:
          </p>
          <ul className="space-y-1.5 pt-1">
            {placeholderFiles.map((item) => (
              <li key={item.file} className="flex flex-col text-[11px] border-b border-border/40 pb-1 last:border-0">
                <span className="font-semibold text-text-primary font-mono">{item.file}</span>
                <span className="text-text-muted">{item.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

