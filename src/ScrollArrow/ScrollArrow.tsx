import type { ComponentProps } from 'react';

import './scroll-arrow.css';

export function ScrollArrow({ className, ...props }: ComponentProps<'span'>) {
  return <span className={`scroll-arrow ${className ?? ''}`} aria-hidden='true' {...props} />;
}
