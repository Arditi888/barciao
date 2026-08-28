import { NavLink } from 'react-router-dom';
import { t } from '../../data/strings';
import { useScrolled } from '../../hooks/useScrolled';
import { cx } from '../../utils/format';
import { OpeningStatus } from '../ui/OpeningStatus';
import { Wordmark } from '../ui/Wordmark';
import { topBarItems } from './navItems';

/** Fixed top bar. Transparent over the hero, then settles into a
 *  solid band with a hairline rule as soon as the page moves. */
export function Navigation() {
  const scrolled = useScrolled(20);

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
        'ease-[var(--ease-soft)] border-b',
        scrolled
          ? 'border-royal-light/20 bg-deeper/90 backdrop-blur-md supports-[backdrop-filter]:bg-deeper/75'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label={t.nav.primary}
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-12"
      >
        <NavLink to="/" className="tap -m-2 p-2" aria-label={`${t.nav.home} — CIAO`}>
          <Wordmark className="text-[1.375rem] lg:text-2xl" />
        </NavLink>

        <ul className="hidden items-center gap-9 lg:flex">
          {topBarItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    'relative py-2 text-[0.8125rem] tracking-[0.06em] transition-colors duration-300',
                    'after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-royal',
                    'after:transition-[width] after:duration-400 after:ease-[var(--ease-out-expo)]',
                    isActive
                      ? 'text-white after:w-full'
                      : 'text-mist/70 hover:text-cream after:w-0 hover:after:w-full',
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <OpeningStatus variant="inline" className="shrink-0" />
      </nav>
    </header>
  );
}
