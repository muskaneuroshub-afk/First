import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const stored = localStorage.getItem('portfolio-theme') as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // Fallback on storage errors
    }
    // Default to dark mode for every first-time visitor regardless of OS setting
    return 'dark';
  });

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Keep mobile browser theme-color aligned
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#000000' : '#ffffff');
    }

    try {
      localStorage.setItem('portfolio-theme', newTheme);
    } catch {
      // Ignore local storage quota or permission errors
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  return { theme, toggleTheme, setTheme: setThemeState };
}
