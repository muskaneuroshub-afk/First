import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset: number = 100): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    const handleScroll = () => {
      // 1. If at top of the page, select first section
      if (window.scrollY < offset) {
        setActiveId(sectionIds[0]);
        return;
      }

      // 2. If at bottom of the page, select last visible section
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 3. Otherwise find which section is currently crossing the viewport threshold
      let currentActive = activeId;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset + 50 && rect.bottom >= offset) {
            currentActive = id;
            break;
          }
        }
      }

      if (currentActive !== activeId) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset, activeId]);

  return activeId;
}

