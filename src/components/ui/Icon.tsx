import React from 'react';
import {
  Atom,
  FileCode2,
  Palette,
  Layout,
  Layers,
  Code2,
  Binary,
  FileSpreadsheet,
  Figma,
  Component,
  TrendingUp,
  BarChart2,
  Share2,
  Users,
  GitBranch,
  Terminal,
  Sparkles,
  Bot,
  PenTool,
  Github,
  Linkedin,
  Mail,
  Award,
  Calendar,
  Briefcase,
  LucideProps,
} from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  Atom,
  FileCode2,
  Palette,
  Layout,
  Layers,
  Code2,
  Binary,
  FileSpreadsheet,
  Figma,
  Component,
  TrendingUp,
  BarChart2,
  Share2,
  Users,
  GitBranch,
  Terminal,
  Sparkles,
  Bot,
  PenTool,
  Github,
  Linkedin,
  Mail,
  Award,
  Calendar,
  Briefcase,
};

interface IconProps extends LucideProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  // Handle Twitter / X custom SVG
  if (name.toLowerCase() === 'twitter' || name.toLowerCase() === 'x') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={props.size || 20}
        height={props.size || 20}
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <Sparkles className={className} {...props} />;
  }

  return <IconComponent className={className} {...props} />;
};
