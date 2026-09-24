import { useProfile } from '../context/profile';

export function Header() {
  const profile = useProfile();

  return (
    <header>
      <h1>{profile?.name ?? ''}</h1>
    </header>
  );
}
