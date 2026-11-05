import type { ComponentProps } from 'react';

import './close-button.css';

export function CloseButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button type='button' className={`close-button ${className ?? ''}`} aria-label='Close' {...props}>
      <svg viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' aria-hidden='true'>
        <path d='M6 6l12 12M18 6L6 18' />
      </svg>
    </button>
  );
}
