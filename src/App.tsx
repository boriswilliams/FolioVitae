import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router';

import { Nav } from './nav/Nav';

import { useProfile } from './context/profile';
import { Provider } from './context/provider';

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
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
          <Route element={<Layout />}>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/cv" element={<CV />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}
