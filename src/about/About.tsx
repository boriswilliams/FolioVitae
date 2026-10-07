import { NextPage } from '../NextPage';

import { Bio } from './Bio';
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
      <NextPage heading='See my work' to='/portfolio' label='Open portfolio' />
    </main>
  );
}
