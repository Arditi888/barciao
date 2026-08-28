import { Search } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AntipastoCard } from '../components/menu/AntipastoCard';
import { CategoryTabs } from '../components/menu/CategoryTabs';
import { MENU_PANEL_ID, tabId } from '../components/menu/menuTabs';
import { MenuItemRow } from '../components/menu/MenuItemRow';
import { MenuSearch } from '../components/menu/MenuSearch';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/ui/PageHeader';
import { antipastiByPairing, categories, itemsInCategory } from '../data/menu';
import { t } from '../data/strings';
import { useSessionState } from '../hooks/useSessionState';
import type { CategoryId } from '../types';
import { searchMenu } from '../utils/search';
import { useSeo } from '../hooks/useSeo';

const DEFAULT_CATEGORY: CategoryId = 'popular';

function isCategoryId(value: string | null): value is CategoryId {
  return categories.some((category) => category.id === value);
}

export function MenuPage() {
  useSeo(t.seo.menu.title, t.seo.menu.description);

  const [searchParams, setSearchParams] = useSearchParams();

  // The category the guest last chose survives navigating away and
  // back within a visit — which is what someone comparing the menu to
  // a friend's phone actually does.
  const [chosenCategory, setChosenCategory] = useSessionState<CategoryId>(
    'ciao:menu-category',
    DEFAULT_CATEGORY,
  );
  const [query, setQuery] = useState('');

  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // A deep link such as /menu?c=coffee wins for as long as it is in the
  // URL, which keeps the address shareable. Derived during render, so
  // there is no second render to correct a stale value.
  const requested = searchParams.get('c');
  const category: CategoryId = isCategoryId(requested) ? requested : chosenCategory;

  const results = useMemo(() => searchMenu(query), [query]);
  const searching = query.trim().length > 0;

  const items = useMemo(() => itemsInCategory(category), [category]);
  const boards = useMemo(() => antipastiByPairing(), []);
  const activeCategory = categories.find((entry) => entry.id === category);

  const selectCategory = (next: CategoryId) => {
    setChosenCategory(next);
    setQuery('');

    // Tapping a tab replaces any deep link, so the URL stops overriding
    // the choice the guest just made.
    if (searchParams.has('c')) {
      const params = new URLSearchParams(searchParams);
      params.delete('c');
      setSearchParams(params, { replace: true });
    }

    // Bring the top of the list back under the sticky bar, but only
    // when the change would otherwise happen off-screen.
    const panel = panelRef.current;
    if (!panel) return;

    const stickyOffset = window.innerWidth >= 1024 ? 148 : 124;
    const top = panel.getBoundingClientRect().top + window.scrollY - stickyOffset;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
  };

  const focusSearch = () => {
    const input = searchRef.current;
    if (!input) return;
    input.scrollIntoView({ block: 'center', behavior: 'smooth' });
    input.focus({ preventScroll: true });
  };

  return (
    <>
      <PageHeader title={t.menu.title} caption={t.menu.caption}>
        <MenuSearch ref={searchRef} value={query} onChange={setQuery} className="max-w-lg" />
      </PageHeader>

      <div className="sticky top-16 z-40 border-y border-royal-light/20 bg-deeper/95 backdrop-blur-md supports-[backdrop-filter]:bg-deeper/85 lg:top-20">
        <div className="relative flex items-stretch">
          <CategoryTabs
            active={category}
            onChange={selectCategory}
            panelId={MENU_PANEL_ID}
            className="min-w-0 flex-1"
          />

          <div className="relative flex shrink-0 items-center pr-2 sm:pr-4 lg:pr-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 -left-10 h-full w-10 bg-gradient-to-r from-transparent to-deeper/95"
            />
            <button
              type="button"
              onClick={focusSearch}
              aria-label={t.menu.searchLabel}
              className="relative flex h-11 w-11 items-center justify-center rounded-xs text-mist/70 transition-colors duration-300 hover:text-cream"
            >
              <Search className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Container>
        <div
          ref={panelRef}
          id={MENU_PANEL_ID}
          role="tabpanel"
          aria-labelledby={tabId(category)}
          tabIndex={-1}
          className="scroll-mt-40 pt-8 pb-24 sm:pt-10 lg:pb-28"
        >
          {/* Re-keying remounts the panel, so React swaps the content
              synchronously and the fade is pure decoration on top. */}
          <div key={searching ? `search:${query}` : category} className="animate-swap-in">
            {searching ? (
              <SearchResults query={query} items={results.items} boards={results.boards} />
            ) : category === 'antipasti' ? (
              <AntipastiPanel groups={boards} caption={activeCategory?.caption} />
            ) : (
              <CategoryPanel
                items={items}
                caption={activeCategory?.caption}
                showCategory={category === 'popular'}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

/* ------------------------------------------------------------------ */

function PanelCaption({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mb-6 text-[0.8125rem] text-haze">{children}</p>;
}

function CategoryPanel({
  items,
  caption,
  showCategory,
}: {
  items: ReturnType<typeof itemsInCategory>;
  caption?: string;
  showCategory: boolean;
}) {
  if (items.length === 0) {
    return <EmptyState title={t.menu.emptyTitle} body={t.menu.emptyBody} />;
  }

  return (
    <>
      <PanelCaption>{caption}</PanelCaption>
      <ul className="border-t border-mist/12">
        {items.map((item) => (
          <MenuItemRow key={item.id} item={item} showCategory={showCategory} />
        ))}
      </ul>
    </>
  );
}

function AntipastiPanel({
  groups,
  caption,
}: {
  groups: ReturnType<typeof antipastiByPairing>;
  caption?: string;
}) {
  return (
    <>
      <PanelCaption>{caption}</PanelCaption>
      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.pairing}>
            <h2 className="eyebrow border-b border-mist/12 pb-4 text-royal-light">{group.pairing}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {group.boards.map((board) => (
                <AntipastoCard key={board.id} board={board} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function SearchResults({
  query,
  items,
  boards,
}: {
  query: string;
  items: ReturnType<typeof searchMenu>['items'];
  boards: ReturnType<typeof searchMenu>['boards'];
}) {
  const total = items.length + boards.length;

  if (total === 0) {
    return <EmptyState title={t.menu.emptyTitle} body={t.menu.emptyBody} />;
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[0.875rem] text-mist/70">{t.menu.resultsFor(query.trim())}</p>
        <p className="numeric text-[0.75rem] text-haze">{t.menu.resultCount(total)}</p>
      </div>

      {items.length > 0 ? (
        <ul className="border-t border-mist/12">
          {items.map((item) => (
            <MenuItemRow key={item.id} item={item} showCategory />
          ))}
        </ul>
      ) : null}

      {boards.length > 0 ? (
        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {boards.map((board) => (
            <AntipastoCard key={board.id} board={board} />
          ))}
        </div>
      ) : null}
    </>
  );
}
