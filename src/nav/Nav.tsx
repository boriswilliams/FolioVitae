import { NavLink, useMatch } from 'react-router';

import { useProfile } from '../context/profile';
import { PrintButton } from '../cv/PrintButton';

import { ContactIcon, CvIcon, DownloadIcon, PortfolioIcon } from './icons';
import { useAutoHide } from './useAutoHide';
import { useCompact } from './useCompact';

import './nav.css';

export function Nav() {
  const isCv = useMatch('/cv') !== null;
  const hasContact = !!useProfile()?.['contact-form'];

  const { ref, hidden } = useAutoHide<HTMLElement>(!isCv);
  const compact = useCompact(ref, `${isCv} ${hasContact}`);

  return (
    <nav
      ref={ref}
      className={`nav screen-only${isCv ? '' : ' nav-overlay'}`}
      data-hidden={hidden}
      data-compact={compact}
    >
      <NavLink to="/portfolio">
        <PortfolioIcon />
        <span className="nav-label">Portfolio</span>
      </NavLink>
      <NavLink to="/cv">
        <CvIcon />
        <span className="nav-label">CV</span>
      </NavLink>
      {hasContact && (
        <NavLink to="/contact">
          <ContactIcon />
          <span className="nav-label">Contact</span>
        </NavLink>
      )}
      {isCv && (
        <div className="nav-actions">
          <PrintButton>
            <DownloadIcon />
            <span className="nav-label">Download CV</span>
          </PrintButton>
        </div>
      )}
    </nav>
  );
}
