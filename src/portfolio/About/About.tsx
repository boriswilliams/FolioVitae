import { useProfile } from '../../context/profile';
import { Paragraphs } from '../Paragraphs';

import './about.css';

export function About() {
  const about = useProfile()?.about;

  if (!about?.trim())
    return null;

  return (
    <section className='about'>
      <h2 className='reveal'>About me</h2>
      <div className='about-text reveal'>
        <Paragraphs text={about} />
      </div>
    </section>
  );
}
