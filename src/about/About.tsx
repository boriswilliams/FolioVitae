import { Bio } from './Bio';
import { GetInTouch } from './GetInTouch';
import { Hero } from './Hero';
import { Qualifications } from './Qualifications';

import '../theme.css';
import './about.css';

export function About() {
  return (
    <main className='theme about-page'>
      <Hero />
      <Bio />
      <Qualifications />
      <GetInTouch />
    </main>
  );
}
