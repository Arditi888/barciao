import { CalendarDays, Home, MapPin, Sparkles, UtensilsCrossed } from 'lucide-react';
import type { ComponentType } from 'react';
import { t } from '../../data/strings';

export interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Excluded from the mobile tab bar, which is capped at four. */
  desktopOnly?: boolean;
}

/** One list, consumed by the top bar, the tab bar and the footer. */
export const navItems: NavItem[] = [
  { to: '/', label: t.nav.home, icon: Home },
  { to: '/menu', label: t.nav.menu, icon: UtensilsCrossed },
  { to: '/events', label: t.nav.events, icon: CalendarDays },
  { to: '/find-your-drink', label: t.nav.findDrink, icon: Sparkles, desktopOnly: true },
  { to: '/visit', label: t.nav.visit, icon: MapPin },
];

export const tabBarItems = navItems.filter((item) => !item.desktopOnly);
export const topBarItems = navItems.filter((item) => item.to !== '/');
