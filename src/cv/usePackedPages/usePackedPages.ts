import { useLayoutEffect, useState, type RefObject } from 'react';

import { findBestPacking } from './findBestPacking';
import type { Page, Rules } from './types';
import { COLUMN_HEIGHT, PAGE_PADDING } from './values';

export function usePackedPages(ref: RefObject<HTMLElement | null>, keys: string[], rules: Rules = {}): Page[] {
  const [pages, setPages] = useState<Page[]>(() => [[keys, []]]);
  
  const serializedKeys = keys.join('\n');
  const serializedRules = JSON.stringify(rules);

  useLayoutEffect(() => {
    const cv = ref.current;
    if (!cv) return;

    const rules = JSON.parse(serializedRules);
    const keys = serializedKeys.split('\n');

    const measure = () => {
      
      cv.classList.add('measuring');

      const sections = new Map(
        [...cv.querySelectorAll<HTMLElement>('[data-section]')]
          .map(section => [section.dataset.section, section.getBoundingClientRect().height])
      );
      const columns = cv.querySelector('.columns');
      const page = columns?.parentElement;
      const pageOneColumnHeight = columns && page
        ? COLUMN_HEIGHT - (columns.getBoundingClientRect().top - page.getBoundingClientRect().top - PAGE_PADDING)
        : COLUMN_HEIGHT;

      cv.classList.remove('measuring');

      const measured = keys.filter(key => sections.has(key));
      const unmeasured = keys.filter(key => !sections.has(key));
      const { order, columns: placed } = findBestPacking(measured, measured.map(key => sections.get(key) ?? 0), pageOneColumnHeight, rules);

      const next: Page[] = [[[], []]];
      order.forEach((index, n) => {
        const pageIndex = Math.floor(placed[n] / 2);
        while (next.length <= pageIndex)
          next.push([[], []]);
        next[pageIndex][placed[n] % 2].push(measured[index]);
      });
      
      next.at(-1)![0].push(...unmeasured);

      setPages(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(cv);
    return () => observer.disconnect();
  }, [ref, serializedKeys, serializedRules]);

  return pages;
}
