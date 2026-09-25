import { Hero } from './Hero';
import { Projects } from './Projects';
import { Qualifications } from './Qualifications';

import '../theme.css';
import './portfolio.css';

export function Portfolio() {
  return (
    <main className='theme portfolio'>
      <Hero />
      <Projects />
      <Qualifications />
    </main>
  );
}
