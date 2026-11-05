import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';

import { useIntroPlaying } from '../context/brand';
import { useProfile } from '../context/profile';
import { useWelcome } from '../context/welcome';

import { CloseButton } from '../CloseButton';

import '../theme.css';
import './welcome.css';

const DELAY = 300;

export function Welcome() {
  const welcome = useWelcome();
  const profile = useProfile();
  const introPlaying = useIntroPlaying();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [closed, setClosed] = useState(false);

  // The profile decides whether there's an intro at all, and the hero only reports
  // it as playing once that has loaded
  const ready = !!welcome && profile !== undefined && !introPlaying && !closed;

  // Lets the photo land first. Also means an intro starting in the same commit as
  // the profile arrives cancels this before it opens
  useEffect(() => {
    if (!ready)
      return;
    const timer = window.setTimeout(() => dialogRef.current?.showModal(), DELAY);
    return () => clearTimeout(timer);
  }, [ready]);

  if (!welcome || closed)
    return null;

  return (
    <dialog
      ref={dialogRef}
      className='theme welcome screen-only'
      aria-label={welcome.heading ?? 'Welcome'}
      onClose={() => setClosed(true)}
      // The dialog is only its own target when the backdrop is clicked. Links may
      // lead to another page, which shouldn't be left behind the dialog
      onClick={event => {
        if (event.target === event.currentTarget || (event.target as Element).closest('a'))
          event.currentTarget.close();
      }}
    >
      <CloseButton onClick={() => dialogRef.current?.close()} />
      <div className='welcome-body'>
        {welcome.heading && <h2>{welcome.heading}</h2>}
        <div className='welcome-text'>
          <Markdown>{welcome.text}</Markdown>
        </div>
      </div>
    </dialog>
  );
}
