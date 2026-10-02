import { useLayoutEffect } from 'react';
import { NavLink, useMatch } from 'react-router';

import { setBrandInNav } from '../context/brand';
import { useProfile } from '../context/profile';

import { Brand } from './Brand';
import { ContactIcon, CvIcon, PortfolioIcon } from './icons';
import { useAutoHide } from './useAutoHide';
import { useFit } from './useFit';

import './nav.css';

export function Nav() {
  const isCv = useMatch('/cv') !== null;
  const profile = useProfile();
  const hasContact = !!profile?.['contact-form'];

  const { ref, hidden } = useAutoHide<HTMLElement>(!isCv);
  const level = useFit(ref, [hasContact, profile?.name, profile?.description, profile?.photo].join(' '), 4);
  const brandInNav = level < 2;
  const compact = level % 2 === 1;

  useLayoutEffect(() => setBrandInNav(brandInNav), [brandInNav]);

  return (
    <nav
      ref={ref}
      className={`nav screen-only${isCv ? '' : ' nav-overlay'}`}
      data-hidden={hidden}
      data-compact={compact}
    >
      <Brand shown={brandInNav} />
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
    </nav>
  );
}
