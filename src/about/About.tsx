import { Bio } from './Bio';
import { Hero } from './Hero';
import { Qualifications } from './Qualifications';
import { SeePortfolio } from './SeePortfolio';

import '../theme.css';
import './about.css';

export function About() {
  return (
    <main className='theme about-page'>
      <Hero />
      <Bio />
      <Qualifications />
      <SeePortfolio />
    </main>
  );
}
