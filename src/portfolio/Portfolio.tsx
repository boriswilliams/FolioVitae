import { Hero } from './Hero';
import { Projects } from './Projects';
import { Qualifications } from './Qualifications';

import './portfolio.css';

export function Portfolio() {
  return (
    <main className='portfolio'>
      <Hero />
      <Projects />
      <Qualifications />
    </main>
  );
}
