import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import { toHref } from '../../../utils/href';

import { Paragraphs } from '../../../Paragraphs';

import { Media } from './Media';

import './project.css';

type Project = {
  heading: string;
  text: string;
  start?: string;
  media?: string;
  'media-shadow'?: boolean;
  link?: string;
  technologies?: string[];
  ai?: 'free' | 'search' | 'tools';
}

const aiLabels = {
  free: 'AI free',
  search: 'AI assisted search',
  tools: 'AI tools used'
};

const EASING = 'cubic-bezier(0.2, 0, 0, 1)';

// Pins the card to a box on screen, so it can move between its place in the
// page and the middle of the screen
function box(rect: DOMRect, shadow: string): Keyframe {
  return {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    maxHeight: 'none',
    right: 'auto',
    bottom: 'auto',
    margin: '0',
    overflow: 'hidden',
    boxShadow: shadow
  };
}

export function Project({ project }: { project: Project}) {
  const slotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animations = useRef<Animation[]>([]);
  const closing = useRef(false);
  // The size of the text preview and media on the collapsed card, to shrink back to
  const preview = useRef<{ text: Keyframe; media: Keyframe }>({ text: {}, media: {} });
  const [open, setOpen] = useState(false);

  // With media, only a preview of the text fits on the card, so it opens to show
  // the rest, unless the whole text already fits
  const [overflowing, setOverflowing] = useState(false);
  const expandable = !!project.media && overflowing;

  useLayoutEffect(() => {
    const text = textRef.current;
    if (!project.media || open || !text)
      return;
    const measure = () => setOverflowing(text.scrollHeight > text.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(text);
    return () => observer.disconnect();
  }, [project.media, open]);

  const textFrame = (text: HTMLElement): Keyframe => ({
    height: `${text.getBoundingClientRect().height}px`,
    '--preview-fade': getComputedStyle(text).getPropertyValue('--preview-fade')
  });

  const mediaFrame = (): Keyframe => {
    const rect = mediaRef.current?.firstElementChild?.getBoundingClientRect();
    return rect ? { width: `${rect.width}px`, height: `${rect.height}px` } : {};
  };

  // Moves the card between two boxes, growing or shrinking the text and media and fading the backdrop and close button to match
  const animate = (card: HTMLElement, from: Keyframe, to: Keyframe, text: Keyframe[], media: Keyframe[], fade: number[]) => {
    const options: KeyframeAnimationOptions = {
      duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400,
      easing: EASING,
      fill: 'forwards'
    };
    animations.current.forEach(animation => animation.cancel());
    animations.current = [
      card.animate([from, to], options),
      ...textRef.current ? [textRef.current.animate(text.map(frame => ({ ...frame, flex: 'none', overflow: 'hidden' })), options)] : [],
      ...mediaRef.current?.firstElementChild ? [mediaRef.current.firstElementChild.animate(media.map(frame => ({ ...frame, maxWidth: 'none', maxHeight: 'none' })), options)] : [],
      ...[backdropRef.current, closeRef.current].filter(element => element !== null)
        .map(element => element.animate({ opacity: fade, visibility: ['visible', 'visible'] }, options))
    ];
    return animations.current[0].finished;
  };

  const clearAnimations = () => {
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
  };

  const openCard = (event: MouseEvent) => {
    const card = cardRef.current;
    const slot = slotRef.current;
    const text = textRef.current;
    if (open || !card || !slot || !text || (event.target as Element).closest('a'))
      return;

    // Hold the card's place in the page while it's lifted out
    const from = card.getBoundingClientRect();
    preview.current = { text: textFrame(text), media: mediaFrame() };
    slot.style.height = `${from.height}px`;
    flushSync(() => setOpen(true));

    const to = card.getBoundingClientRect();
    animate(card, box(from, 'none'), box(to, getComputedStyle(card).boxShadow), [preview.current.text, textFrame(text)], [preview.current.media, mediaFrame()], [0, 1])
      .then(clearAnimations, () => {});
    card.focus({ preventScroll: true });
  };

  // Focus goes back to the card's title when closed from the keyboard
  const closeCard = useCallback((refocus: boolean) => {
    const card = cardRef.current;
    const slot = slotRef.current;
    const text = textRef.current;
    if (!card || !slot || !text || closing.current)
      return;
    closing.current = true;

    // Start from wherever the opening animation had got to
    const from = box(card.getBoundingClientRect(), getComputedStyle(card).boxShadow);
    const fade = Number(getComputedStyle(backdropRef.current ?? card).opacity);

    animate(card, from, box(slot.getBoundingClientRect(), 'none'), [textFrame(text), preview.current.text], [mediaFrame(), preview.current.media], [fade, 0])
      .then(() => {
        flushSync(() => setOpen(false));
        slot.style.height = '';
        clearAnimations();
        closing.current = false;
        if (refocus)
          card.querySelector<HTMLElement>('h3 button')?.focus({ preventScroll: true });
      }, () => {});
  }, []);

  useEffect(() => {
    if (!open)
      return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        closeCard(true);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeCard]);

  return (
    <div ref={slotRef} className='project-slot'>
      {open && <div ref={backdropRef} className='project-backdrop' onClick={() => closeCard(false)} />}
      <article
        ref={cardRef}
        className={`project reveal${project.media ? ' project-preview' : ''}${expandable ? ' project-expandable' : ''}${open ? ' project-open' : ''}`}
        role={open ? 'dialog' : undefined}
        aria-modal={open || undefined}
        aria-label={open ? project.heading : undefined}
        tabIndex={open ? -1 : undefined}
        onClick={expandable ? openCard : undefined}
      >
        {expandable && (
          // Keyboard presses come through as clicks with no detail
          <button ref={closeRef} type='button' className='project-close' aria-label='Close' onClick={event => closeCard(event.detail === 0)}>
            <svg viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' aria-hidden='true'>
              <path d='M6 6l12 12M18 6L6 18' />
            </svg>
          </button>
        )}
        <div className='project-body'>
          {project.media && (
            <div ref={mediaRef} className={project['media-shadow'] === false ? 'project-media project-media-flat' : 'project-media'}>
              <Media src={project.media} alt={project.heading} />
            </div>
          )}
          <div className='project-text'>
            <h3>
              {expandable
                ? <button type='button' aria-expanded={open}>{project.heading}</button>
                : project.heading}
            </h3>
            {project.ai && <span className={`project-ai project-ai-${project.ai}`}>{aiLabels[project.ai]}</span>}
            {project.start && <time className='project-start'>{project.start}</time>}
            <div ref={textRef} className='project-description'>
              <Paragraphs text={project.text} />
            </div>
            {!!project.technologies?.length && (
              <ul className='project-tech' aria-label='Technologies'>
                {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
              </ul>
            )}
            {project.link && (
              <a className='project-link button' href={toHref(project.link)}>View project</a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
