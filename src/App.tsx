import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router';

import { Nav } from './nav/Nav';

import { useProfile } from './context/profile';
import { Provider } from './context/provider';

import { About } from './about';
import { Contact } from './contact';
import { CV } from './cv';
import { Portfolio } from './portfolio';

function Title() {
  const profile = useProfile();

  return <title>{profile?.name ?? 'Folio Vitae'}</title>;
}

function Layout() {
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
