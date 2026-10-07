import { Link } from 'react-router';

import './next-page.css';

type NextPageProps = {
  heading: string;
  to: string;
  label: string;
};

export function NextPage({ heading, to, label }: NextPageProps) {
  return (
    <section className='next-page'>
      <h2 className='reveal'>{heading}</h2>
      <Link className='button reveal' to={to}>{label}</Link>
    </section>
  );
}
