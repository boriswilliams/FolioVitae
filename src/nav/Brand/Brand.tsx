import { brandTargets, useIntroPlaying } from '../../context/brand';
import { useProfile } from '../../context/profile';

import './brand.css';

export function Brand({ shown }: { shown: boolean; }) {
  const profile = useProfile();
  const introPlaying = useIntroPlaying();

  if (!profile?.name && !profile?.photo)
    return null;

  const { name, description, photo } = profile;

  return (
    <div className={`nav-brand${shown ? '' : ' nav-brand-away'}${introPlaying ? ' nav-brand-waiting' : ''}`}>
      {photo && (
        <div
          ref={element => { brandTargets.avatar = element; }}
          className='nav-brand-avatar'
          role='img'
          aria-label={name ? `Photo of ${name}` : 'Photo'}
          style={{ backgroundImage: `url(${JSON.stringify(photo)})` }}
        />
      )}
      <div className='nav-brand-text'>
        {name && <span ref={element => { brandTargets.name = element; }} className='nav-brand-name'>{name}</span>}
        {description && <span ref={element => { brandTargets.title = element; }} className='nav-brand-title'>{description}</span>}
      </div>
    </div>
  );
}
