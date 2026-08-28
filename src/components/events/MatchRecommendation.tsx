import { t } from '../../data/strings';
import type { MatchRecommendation as Recommendation } from '../../types';
import { cx } from '../../utils/format';

interface MatchRecommendationProps {
  beer: Recommendation['beer'];
  snack: string;
  title?: string;
  size?: 'sm' | 'md';
  className?: string;
}

/** The Ciao Match Pick. It sits on its own panel of lighter royal blue
 *  so it reads as part of the poster rather than an advert stuck on the
 *  end — the card is deep blue, this step is one tone up. */
export function MatchRecommendation({
  beer,
  snack,
  title,
  size = 'md',
  className,
}: MatchRecommendationProps) {
  const large = size === 'md';

  return (
    <div
      className={cx(
        'rounded-sm border border-royal-light/20 bg-royal/15',
        large ? 'px-5 py-4' : 'px-4 py-3.5',
        className,
      )}
    >
      <p className="eyebrow text-royal-pale">{title ?? t.events.matchPick}</p>

      <p
        className={cx(
          'mt-2.5 font-display leading-tight text-white',
          large ? 'text-[1.1875rem]' : 'text-[1.0625rem]',
        )}
      >
        {beer}
      </p>

      <p className="mt-1 flex items-baseline gap-2 text-[0.8125rem] leading-snug text-mist">
        <span aria-hidden="true" className="text-royal-pale">
          +
        </span>
        {snack}
      </p>
    </div>
  );
}
