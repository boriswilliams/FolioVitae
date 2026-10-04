import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { brandTargets, introPlayed, markIntroPlayed, setIntroPlaying, useBrandInNav, useIntroPlaying } from '../../context/brand';
import { useProfile } from '../../context/profile';
import { ScrollArrow } from '../../ScrollArrow';

import './hero.css';

const INTRO_LENGTH = 1800;
const DURATION = 900;
const EASING = 'cubic-bezier(0.2, 0, 0, 1)';

function canPlayIntro() {
  return !introPlayed() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Where and how an element is drawn, so it can be flown between layouts above everything else
function placement(element: HTMLElement): Keyframe {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  return {
    position: 'fixed',
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    right: 'auto',
    bottom: 'auto',
    margin: '0',
    zIndex: 5,
    whiteSpace: 'nowrap',
    borderRadius: style.borderRadius,
    opacity: style.opacity,
    visibility: 'visible',
    color: style.color,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing
  };
}

export function Hero() {
  const profile = useProfile();
  const brandInNav = useBrandInNav();
  const introPlaying = useIntroPlaying();
  const [landing, setLanding] = useState(false);
  const [avatarHidden, setAvatarHidden] = useState(false);
  // The width the avatar and name needed side by side when the avatar was hidden
  const neededWidth = useRef(0);
  const heroRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [loadedPhoto, setLoadedPhoto] = useState<string>();

  const photo = profile?.photo;
  const photoLoaded = !photo || loadedPhoto === photo;
  const intro = introPlaying && !landing;

  // Holds the entrance back until the photo can be drawn whole, rather than it appearing part way through
  useEffect(() => {
    if (!photo)
      return;
    let current = true;
    const image = new Image();
    image.src = photo;
    const done = () => {
      if (current)
        setLoadedPhoto(photo);
    };
    image.decode().then(done, done);
    return () => {
      current = false;
    };
  }, [photo]);

  // Starts before the first paint, so the nav never shows its copy of the name first
  useLayoutEffect(() => {
    if (!photo || !canPlayIntro())
      return;
    setIntroPlaying(true);
    return () => setIntroPlaying(false);
  }, [photo]);

  // Under the nav, hide the avatar rather than let it push the name onto a line of its own
  useLayoutEffect(() => {
    const hero = heroRef.current;
    const slot = slotRef.current;
    const text = textRef.current;
    if (intro || brandInNav || !hero || !slot || !text)
      return;

    const check = () => {
      const style = getComputedStyle(hero);
      if (!avatarHidden) {
        if (text.offsetTop >= slot.offsetTop + slot.offsetHeight) {
          neededWidth.current = slot.offsetWidth + parseFloat(style.columnGap) + text.offsetWidth;
          setAvatarHidden(true);
        }
      } else if (hero.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) >= neededWidth.current) {
        setAvatarHidden(false);
      }
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(hero);
    return () => observer.disconnect();
  }, [profile, intro, brandInNav, avatarHidden]);

  useEffect(() => {
    if (!intro || !photoLoaded)
      return;

    let collapsed = false;

    // Flies the photo, name and title from the full-screen intro to wherever they're shown now:
    // the nav when it has room (handing over to its copy at the end), otherwise the header under it
    const collapse = () => {
      const hero = heroRef.current;
      if (collapsed || !hero)
        return;
      collapsed = true;

      // Drop the entrance animations (ending where they would have) so their transforms
      // can't become the frame the fixed positions are measured from
      hero.getAnimations({ subtree: true }).forEach(animation => {
        if (animation instanceof CSSAnimation && animation.animationName !== 'scroll-arrow-bob')
          animation.cancel();
      });

      const movers = [
        [photoRef.current, brandTargets.avatar],
        [nameRef.current, brandTargets.name],
        [titleRef.current, brandTargets.title]
      ].filter((pair): pair is [HTMLElement, HTMLElement | null] => pair[0] !== null);

      const before = {
        height: hero.getBoundingClientRect().height,
        background: getComputedStyle(hero).backgroundColor,
        movers: movers.map(([element]) => placement(element))
      };
      flushSync(() => setLanding(true));
      const after = {
        height: hero.getBoundingClientRect().height,
        background: getComputedStyle(hero).backgroundColor,
        movers: movers.map(([element, inNav]) => placement(brandInNav && inNav ? inNav : element))
      };

      const options: KeyframeAnimationOptions = { duration: DURATION, easing: EASING, fill: 'forwards' };
      const animations = [
        hero.animate({ height: [`${before.height}px`, `${after.height}px`], overflow: ['hidden', 'hidden'] }, options),
        // The black backdrop only matters behind the full-screen photo, so it clears quickly
        hero.animate({ backgroundColor: [before.background, after.background] }, { ...options, duration: DURATION / 4 }),
        ...movers.map(([element], i) => element.animate([before.movers[i], after.movers[i]], options)),
        ...photoRef.current ? [photoRef.current.animate({ opacity: [1, 0] }, { ...options, pseudoElement: '::after' })] : [],
        ...arrowRef.current ? [arrowRef.current.animate({ opacity: [0.8, 0], visibility: ['visible', 'visible'] }, { ...options, duration: DURATION / 3 })] : []
      ];

      animations[0].finished.then(() => {
        flushSync(() => {
          markIntroPlayed();
          setIntroPlaying(false);
          setLanding(false);
        });
        animations.forEach(animation => animation.cancel());
      }, () => {});
    };

    const timer = window.setTimeout(collapse, INTRO_LENGTH);
    const events = ['wheel', 'touchmove', 'keydown', 'pointerdown'] as const;
    events.forEach(event => window.addEventListener(event, collapse, { passive: true }));

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, collapse));
    };
  }, [intro, brandInNav, photoLoaded]);

  // Holds the intro's blank screen while the profile loads, so the rest of the page doesn't show first
  if (profile === undefined)
    return canPlayIntro() ? <header className='hero hero-intro' /> : null;

  if (!profile)
    return null;

  const { name, description } = profile;
  const classes = [
    'hero',
    intro && 'hero-intro',
    !intro && brandInNav && 'hero-spacer',
    landing && 'hero-landing',
    avatarHidden && 'hero-avatar-hidden',
    !photoLoaded && 'hero-loading'
  ].filter(Boolean).join(' ');

  return (
    <header ref={heroRef} className={classes}>
      {photo && (
        <div ref={slotRef} className='hero-avatar'>
          <div
            ref={photoRef}
            className='hero-photo'
            role='img'
            aria-label={name ? `Photo of ${name}` : 'Photo'}
            style={{ backgroundImage: `url(${JSON.stringify(photo)})` }}
          />
        </div>
      )}
      <div ref={textRef} className='hero-text'>
        {name && <h1 ref={nameRef}>{name}</h1>}
        {description && <p ref={titleRef}>{description}</p>}
      </div>
      {photo && <ScrollArrow ref={arrowRef} className='hero-arrow' />}
    </header>
  );
}
