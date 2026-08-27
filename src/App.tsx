import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';

/* The two entry points — a shared link and a QR scan — are bundled
   with the shell. Everything else loads on demand. */
const EventsPage = lazy(() =>
  import('./pages/EventsPage').then((module) => ({ default: module.EventsPage })),
);
const FindDrinkPage = lazy(() =>
  import('./pages/FindDrinkPage').then((module) => ({ default: module.FindDrinkPage })),
);
const VisitPage = lazy(() =>
  import('./pages/VisitPage').then((module) => ({ default: module.VisitPage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);

/** Holds the page height while a route chunk arrives, so the tab bar
 *  and footer do not jump. */
function RouteFallback() {
  return <div className="min-h-[70svh]" aria-hidden="true" />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route
            path="events"
            element={
              <Suspense fallback={<RouteFallback />}>
                <EventsPage />
              </Suspense>
            }
          />
          <Route
            path="find-your-drink"
            element={
              <Suspense fallback={<RouteFallback />}>
                <FindDrinkPage />
              </Suspense>
            }
          />
          <Route
            path="visit"
            element={
              <Suspense fallback={<RouteFallback />}>
                <VisitPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}
