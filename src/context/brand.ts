import { useSyncExternalStore } from 'react';

// The name and photo sit in the nav when it has room for them, otherwise the
// about page shows them underneath. Its intro lands on whichever is in
// use, so the nav's copy stays hidden while it plays and registers its elements
// here as the intro's targets.

const state = { inNav: true, introPlaying: false, introPlayed: false };
const listeners = new Set<() => void>();

function update(changes: Partial<typeof state>) {
  Object.assign(state, changes);
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const brandTargets: Record<'avatar' | 'name' | 'title', HTMLElement | null> = {
  avatar: null,
  name: null,
  title: null
};

export function useBrandInNav() {
  return useSyncExternalStore(subscribe, () => state.inNav);
}

export function setBrandInNav(inNav: boolean) {
  update({ inNav });
}

export function useIntroPlaying() {
  return useSyncExternalStore(subscribe, () => state.introPlaying);
}

export function setIntroPlaying(introPlaying: boolean) {
  update({ introPlaying });
}

// Kept in memory, so the intro plays on each load of the site but not when
// coming back to the about page from another page
export function introPlayed() {
  return state.introPlayed;
}

export function markIntroPlayed() {
  state.introPlayed = true;
}
