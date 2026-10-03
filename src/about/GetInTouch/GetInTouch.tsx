import { Link } from 'react-router';

import { useProfile } from '../../context/profile';

import './get-in-touch.css';

export function GetInTouch() {
  const hasContact = !!useProfile()?.['contact-form'];

  if (!hasContact)
    return null;

  return (
    <section className='get-in-touch'>
      <h2 className='reveal'>Get in touch</h2>
      <Link className='button reveal' to='/contact'>Send a message</Link>
    </section>
  );
}
