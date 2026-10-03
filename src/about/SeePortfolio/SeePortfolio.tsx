import { Link } from 'react-router';

import './see-portfolio.css';

export function SeePortfolio() {
  return (
    <section className='see-portfolio'>
      <h2 className='reveal'>See my work</h2>
      <Link className='button reveal' to='/portfolio'>View portfolio</Link>
    </section>
  );
}
