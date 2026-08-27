import { Search, X } from 'lucide-react';
import { forwardRef } from 'react';
import { t } from '../../data/strings';
import { cx } from '../../utils/format';

interface MenuSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const MenuSearch = forwardRef<HTMLInputElement, MenuSearchProps>(function MenuSearch(
  { value, onChange, className },
  ref,
) {
  return (
    <div className={cx('relative', className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 h-[1.05rem] w-[1.05rem] -translate-y-1/2 text-mute"
        strokeWidth={1.5}
      />

      <input
        ref={ref}
        id="menu-search"
        type="search"
        inputMode="search"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.menu.searchPlaceholder}
        aria-label={t.menu.searchLabel}
        className={cx(
          'h-13 w-full rounded-sm border border-cream/12 bg-ink-800/70 pr-12 pl-11',
          'text-[0.9375rem] text-cream placeholder:text-mute-dim',
          'transition-colors duration-300 hover:border-cream/20 focus:border-gold/50 focus:outline-none',
          'focus-visible:outline-none',
        )}
      />

      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t.menu.clearSearch}
          className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xs text-mute transition-colors duration-300 hover:text-cream"
        >
          <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});
