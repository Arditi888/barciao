import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { categories } from '../../data/menu';
import { t } from '../../data/strings';
import type { CategoryId } from '../../types';
import { cx } from '../../utils/format';
import { tabId } from './menuTabs';

interface CategoryTabsProps {
  active: CategoryId;
  onChange: (category: CategoryId) => void;
  panelId: string;
  className?: string;
}

/** Sticky, horizontally scrollable tab strip with a gold indicator
 *  that slides between labels. Arrow keys move between tabs. */
export function CategoryTabs({ active, onChange, panelId, className }: CategoryTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef(new Map<CategoryId, HTMLButtonElement>());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const measure = useCallback(() => {
    const button = buttonRefs.current.get(active);
    if (!button) return;
    setIndicator({ left: button.offsetLeft, width: button.offsetWidth });
  }, [active]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    // Fonts settle after first paint and shift the label widths.
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => window.removeEventListener('resize', onResize);
  }, [measure]);

  useEffect(() => {
    const button = buttonRefs.current.get(active);
    const list = listRef.current;
    if (!button || !list) return;

    // Keep the selected tab in view without dragging the page with it.
    const target = button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2;
    list.scrollTo({
      left: Math.max(0, target),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, [active]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const index = categories.findIndex((category) => category.id === active);
    const last = categories.length - 1;

    const nextIndex =
      event.key === 'ArrowRight'
        ? Math.min(index + 1, last)
        : event.key === 'ArrowLeft'
          ? Math.max(index - 1, 0)
          : event.key === 'Home'
            ? 0
            : last;

    const next = categories[nextIndex];
    if (!next) return;

    onChange(next.id);
    buttonRefs.current.get(next.id)?.focus();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={t.menu.categoriesLabel}
      onKeyDown={onKeyDown}
      className={cx('no-scrollbar relative overflow-x-auto overscroll-x-contain', className)}
    >
      <div className="relative flex w-max items-stretch gap-1 px-5 sm:px-8 lg:px-12">
        {categories.map((category) => {
          const isActive = category.id === active;

          return (
            <button
              key={category.id}
              ref={(node) => {
                if (node) buttonRefs.current.set(category.id, node);
                else buttonRefs.current.delete(category.id);
              }}
              id={tabId(category.id)}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(category.id)}
              className={cx(
                'relative shrink-0 px-3.5 py-4 text-[0.8125rem] tracking-[0.04em] whitespace-nowrap',
                'transition-colors duration-300',
                isActive ? 'text-gold' : 'text-cream-dim/60 hover:text-cream',
              )}
            >
              {category.label}
            </button>
          );
        })}

        <span
          aria-hidden="true"
          className="absolute bottom-0 h-px bg-gold transition-[transform,width] duration-450 ease-[var(--ease-out-expo)]"
          style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
        />
      </div>
    </div>
  );
}
