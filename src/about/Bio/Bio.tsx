import { useProfile } from '../../context/profile';
import { Paragraphs } from '../../Paragraphs';

import './bio.css';

export function Bio() {
  const about = useProfile()?.about;

  if (!about?.trim())
    return null;

  return (
    <section className='bio'>
      <h2 className='reveal'>About me</h2>
      <div className='bio-text reveal'>
        <Paragraphs text={about} />
      </div>
    </section>
  );
}
