import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { t } from '../../data/strings';
import { BottomNavigation } from './BottomNavigation';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

/** Resets scroll on navigation. Router 7 keeps the position by
 *  default, which reads as a broken page when moving between routes. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'instant' });
  }, [pathname]);

  return null;
}

export function Layout() {
  return (
    <div className="grain flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-xs focus:bg-royal focus:px-4 focus:py-2 focus:text-sm focus:text-deep"
      >
        {t.common.skipToContent}
      </a>

      <ScrollToTop />
      <Navigation />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
}
