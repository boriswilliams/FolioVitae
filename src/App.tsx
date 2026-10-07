import { useLayoutEffect } from 'react';
import { HashRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router';

import { useProfile } from './context/profile';
import { Provider } from './context/provider';

import { Nav } from './Nav';

import { About } from './About';
import { Contact } from './Contact';
import { CV } from './CV';
import { Portfolio } from './Portfolio';

function Title() {
  const profile = useProfile();

  return <title>{profile?.name ?? 'Folio Vitae'}</title>;
}

function Layout() {
  const { pathname } = useLocation();

  // Each page starts at the top rather than inheriting the previous page's scroll
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return <>
    <Nav />
    <Outlet />
  </>;
}

export function App() {
  return (
    <Provider>
      <Title />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}
