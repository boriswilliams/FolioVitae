import { useProfile } from '../context/profile';

export function Portfolio() {
  const profile = useProfile();

  return <main>Portfolio{profile?.name ? ` of ${profile.name}` : ''}</main>;
}
