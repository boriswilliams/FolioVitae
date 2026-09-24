import { NavLink, useMatch } from 'react-router';

import { PrintButton } from '../cv/PrintButton';

import './nav.css';

export function Nav() {
  const isCv = useMatch('/cv') !== null;

  return (
    <nav className="nav screen-only">
      <NavLink to="/portfolio">Portfolio</NavLink>
      <NavLink to="/cv">CV</NavLink>
      {isCv && (
        <div className="nav-actions">
          <PrintButton />
        </div>
      )}
    </nav>
  );
}
