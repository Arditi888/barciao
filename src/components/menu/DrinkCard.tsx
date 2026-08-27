import { Link } from 'react-router-dom';
import { t } from '../../data/strings';
import type { CategoryId } from '../../types';
import { cx, priceParts } from '../../utils/format';

interface DrinkCardProps {
  name: string;
  meta: string;
  price: number | null;
  description?: string;
  category: CategoryId;
  className?: string;
}

/** The card used for Ciao Favourites and for quiz alternatives.
 *  Tapping it opens the menu with that category already selected. */
export function DrinkCard({ name, meta, price, description, category, className }: DrinkCardProps) {
  const { amount, unit } = priceParts(price);

  return (
    <Link
      to={`/menu?c=${category}`}
      className={cx(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-sm',
        'border border-cream/10 bg-ink-800/70 p-5 transition-colors duration-400',
        'hover:border-cream/25 hover:bg-ink-700/70 sm:p-6',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px w-0 bg-gold transition-[width] duration-600 ease-[var(--ease-out-expo)] group-hover:w-full"
      />

      <div>
        <p className="eyebrow text-mute">{meta}</p>
        <h3 className="mt-3.5 font-display text-[1.4375rem] leading-tight text-cream transition-colors duration-300 group-hover:text-gold-soft">
          {name}
        </h3>
        {description ? (
          <p className="mt-2.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-cream-dim/60">
            {description}
          </p>
        ) : null}
      </div>

      <p className="mt-8 flex items-baseline gap-1.5">
        {price === null ? (
          <span className="text-[0.8125rem] text-mute">{t.menu.placeholderPrice}</span>
        ) : (
          <>
            <span className="numeric font-display text-[1.375rem] leading-none text-cream">{amount}</span>
            <span className="text-[0.6875rem] tracking-[0.1em] text-mute uppercase">{unit}</span>
          </>
        )}
      </p>
    </Link>
  );
}
