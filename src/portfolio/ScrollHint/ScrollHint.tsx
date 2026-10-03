import { useEffect, useState } from 'react';

import { ScrollArrow } from '../../ScrollArrow';

import './scroll-hint.css';

export function ScrollHint() {
  const [scrollable, setScrollable] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const measure = () => setScrollable(root.scrollHeight > root.clientHeight);
    const onScroll = () => {
      if (window.scrollY > 0)
        setScrolled(true);
    };

    onScroll();
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <ScrollArrow className='scroll-hint' data-hidden={scrolled || !scrollable} />;
}
