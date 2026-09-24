import { useProfile } from '../../context/profile';

import './hero.css';

export function Hero() {
  const profile = useProfile();

  if (!profile)
    return null;

  const { name, description, photo } = profile;

  return (
    <header className='hero'>
      {photo && (
        <div
          className='hero-photo'
          role='img'
          aria-label={name ? `Photo of ${name}` : 'Photo'}
          style={{ backgroundImage: `url(${JSON.stringify(photo)})` }}
        />
      )}
      <div className='hero-text'>
        {name && <h1>{name}</h1>}
        {description && <p>{description}</p>}
      </div>
      {photo && <span className='hero-arrow' aria-hidden='true' />}
    </header>
  );
}
