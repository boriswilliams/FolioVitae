import { NextPage } from '../NextPage';

import { Projects } from './Projects';
import { ScrollHint } from './ScrollHint';

import '../theme.css';
import './portfolio.css';

export function Portfolio() {
  return (
    <main className='theme portfolio'>
      <Projects />
      <NextPage heading='Read my CV' to='/cv' label='Open CV' />
      <ScrollHint />
    </main>
  );
}
