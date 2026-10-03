import { Projects } from './Projects';
import { ScrollHint } from './ScrollHint';

import '../theme.css';
import './portfolio.css';

export function Portfolio() {
  return (
    <main className='theme portfolio'>
      <Projects />
      <ScrollHint />
    </main>
  );
}
