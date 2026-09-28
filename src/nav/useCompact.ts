import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

// Switches to compact when the contents overflow, and back once there is room
// for the full-size contents again. `key` identifies the current set of items.
export function useCompact(ref: RefObject<HTMLElement | null>, key: string) {
  const [compact, setCompact] = useState(false);
  const needed = useRef({ key, width: 0 });

  useLayoutEffect(() => {
    const nav = ref.current;
    if (!nav) return;

    const check = () => {
      if (!compact) {
        if (nav.scrollWidth > nav.clientWidth) {
          needed.current = { key, width: nav.scrollWidth };
          setCompact(true);
        }
      } else if (needed.current.key !== key || nav.clientWidth > needed.current.width) {
        setCompact(false);
      }
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [ref, compact, key]);

  return compact;
}
