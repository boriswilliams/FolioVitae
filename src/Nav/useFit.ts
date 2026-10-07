import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

// Steps through progressively more compact levels while the contents overflow,
// and back once there's room for the previous level again. `key` identifies the
// current contents, and changing it starts again from the roomiest level.
export function useFit(ref: RefObject<HTMLElement | null>, key: string, levels: number) {
  const [level, setLevel] = useState(0);
  const needed = useRef({ key, widths: [] as number[] });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element)
      return;

    // How far the contents run past the end padding (which scrollWidth doesn't always count)
    const overflow = () => {
      const last = element.lastElementChild;
      const style = getComputedStyle(element);
      const contentEnd = element.getBoundingClientRect().right - parseFloat(style.paddingRight) - parseFloat(style.borderRightWidth);
      return Math.max(element.scrollWidth - element.clientWidth, last ? last.getBoundingClientRect().right - contentEnd : 0);
    };

    const check = () => {
      if (needed.current.key !== key) {
        needed.current = { key, widths: [] };
        if (level > 0) {
          setLevel(0);
          return;
        }
      }
      const over = overflow();
      if (over > 0.5) {
        if (level < levels - 1) {
          needed.current.widths[level] = element.clientWidth + over;
          setLevel(level + 1);
        }
      } else if (level > 0 && element.clientWidth >= needed.current.widths[level - 1]) {
        setLevel(level - 1);
      }
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, key, level, levels]);

  return level;
}
