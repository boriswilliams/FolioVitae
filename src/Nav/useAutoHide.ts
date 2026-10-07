import { useEffect, useRef, useState } from 'react';

const HIDE_DELAY = 800;
const REVEAL_DISTANCE = 96;

export function useAutoHide<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let timer: number | undefined;
    let lastY = window.scrollY;

    const schedule = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (window.scrollY <= 0 || ref.current?.matches(':hover, :has(:focus-visible)')) {
          schedule();
        } else {
          setHidden(true);
        }
      }, HIDE_DELAY);
    };

    const show = () => {
      setHidden(false);
      schedule();
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY || y <= 0) show();
      lastY = y;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (event.clientY < REVEAL_DISTANCE) show();
    };

    const nav = ref.current;
    schedule();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    nav?.addEventListener('focusin', show);

    return () => {
      clearTimeout(timer);
      setHidden(false);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      nav?.removeEventListener('focusin', show);
    };
  }, [enabled]);

  return { ref, hidden: enabled && hidden };
}
