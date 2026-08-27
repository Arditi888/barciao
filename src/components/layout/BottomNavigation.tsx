import { NavLink } from 'react-router-dom';
import { t } from '../../data/strings';
import { cx } from '../../utils/format';
import { tabBarItems } from './navItems';

/** Mobile tab bar. Four destinations, thumb-height targets, and a
 *  gold rule that marks the active tab from the top edge. */
export function BottomNavigation() {
  return (
    <nav
      aria-label={t.nav.primary}
      className={cx(
        'fixed inset-x-0 bottom-0 z-50 lg:hidden',
        'border-t border-cream/10 bg-ink/92 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/80',
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {tabBarItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cx(
                  'relative flex h-[4.25rem] flex-col items-center justify-center gap-1.5',
                  'transition-colors duration-300',
                  isActive ? 'text-gold' : 'text-cream-dim/70 active:text-cream',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute top-0 h-px bg-gold transition-all duration-400 ease-[var(--ease-out-expo)]',
                      isActive ? 'w-10 opacity-100' : 'w-0 opacity-0',
                    )}
                  />
                  <item.icon className="h-[1.3rem] w-[1.3rem]" strokeWidth={1.5} />
                  <span className="text-[0.6875rem] tracking-[0.08em] uppercase">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
