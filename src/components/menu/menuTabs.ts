import type { CategoryId } from '../../types';

/** Shared between the tab strip and the panel it labels, so the two can
 *  never drift apart. */
export const MENU_PANEL_ID = 'menu-panel';

export function tabId(category: CategoryId): string {
  return `${MENU_PANEL_ID}-tab-${category}`;
}
