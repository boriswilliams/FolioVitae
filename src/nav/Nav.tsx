import { NavLink, useMatch } from 'react-router';

import { useProfile } from '../context/profile';
import { PrintButton } from '../cv/PrintButton';

import { useAutoHide } from './useAutoHide';

import './nav.css';

export function Nav() {
  const isCv = useMatch('/cv') !== null;
  const hasContact = !!useProfile()?.['contact-form'];

  const { ref, hidden } = useAutoHide<HTMLElement>(!isCv);

  return (
    <nav ref={ref} className={`nav screen-only${isCv ? '' : ' nav-overlay'}`} data-hidden={hidden}>
      <NavLink to="/portfolio">Portfolio</NavLink>
      <NavLink to="/cv">CV</NavLink>
      {hasContact && <NavLink to="/contact">Contact</NavLink>}
      {isCv && (
        <div className="nav-actions">
          <PrintButton />
        </div>
      )}
    </nav>
  );
}
