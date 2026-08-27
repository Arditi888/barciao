import { categoryLabel } from '../../data/menu';
import { t } from '../../data/strings';
import type { MenuItem } from '../../types';
import { cx, priceParts } from '../../utils/format';
import { Badge } from '../ui/Badge';

interface MenuItemRowProps {
  item: MenuItem;
  /** Adds the category to the meta line, for mixed lists such as
   *  Popular and search results. */
  showCategory?: boolean;
  className?: string;
}

/** One product line. Name and price carry the weight; everything else
 *  steps down so a whole category stays scannable at arm's length. */
export function MenuItemRow({ item, showCategory = false, className }: MenuItemRowProps) {
  const { amount, unit } = priceParts(item.price);
  const meta = [showCategory ? categoryLabel(item.category) : null, item.subcategory, item.size]
    .filter(Boolean)
    .join(' · ');
  const visibleBadges = item.badges?.filter((badge) => badge !== 'placeholder') ?? [];
  const unpriced = item.price === null;

  return (
    <li
      className={cx(
        'group flex items-start justify-between gap-5 border-b border-cream/8 py-4 sm:py-[1.125rem]',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <h3 className="text-[1rem] leading-snug font-medium text-cream sm:text-[1.0625rem]">
            {item.name}
          </h3>
          {visibleBadges.map((badge) => (
            <Badge key={badge} kind={badge} />
          ))}
        </div>

        {meta ? <p className="numeric mt-1 text-[0.75rem] text-mute">{meta}</p> : null}

        {item.description ? (
          <p className="mt-2 max-w-prose text-[0.8125rem] leading-relaxed text-cream-dim/60">
            {item.description}
          </p>
        ) : null}

        {item.options?.length ? (
          <p className="mt-2.5 text-[0.75rem] leading-relaxed text-cream-dim/55">
            <span className="text-mute">{t.menu.options}: </span>
            {item.options.join(' · ')}
          </p>
        ) : null}
      </div>

      <div className="shrink-0 pt-0.5 text-right">
        {unpriced ? (
          <span className="text-[0.75rem] text-mute">{t.menu.placeholderPrice}</span>
        ) : (
          <span className="flex items-baseline justify-end gap-1.5">
            <span className="numeric font-display text-[1.25rem] leading-none text-cream sm:text-[1.375rem]">
              {amount}
            </span>
            <span className="text-[0.625rem] tracking-[0.12em] text-mute uppercase">{unit}</span>
          </span>
        )}
      </div>
    </li>
  );
}
