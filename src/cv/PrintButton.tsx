import type { ReactNode } from 'react';

export function PrintButton({ children }: { children: ReactNode; }) {
  return (
    <button type="button" onClick={() => window.print()}>
      {children}
    </button>
  );
}
