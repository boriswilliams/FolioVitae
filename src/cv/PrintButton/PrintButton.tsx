import './print-button.css';

export function PrintButton() {
  return (
    <button type='button' className='print-button screen-only' onClick={() => window.print()}>
      <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M12 4v11M7 10l5 5 5-5M5 20h14' />
      </svg>
      Download CV
    </button>
  );
}
