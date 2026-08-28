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

/** The Ciao Match Pick. Sits inside the match card as part of the
 *  poster rather than as an advert bolted on the end: one hairline
 *  rule, the same type scale as the card, no boxes or badges. */
export function MatchRecommendation({
  beer,
  snack,
  title,
  size = 'md',
  className,
}: MatchRecommendationProps) {
  const large = size === 'md';

  return (
    <div className={cx('border-t border-cream/10 pt-4', className)}>
      <p className="eyebrow text-gold">{title ?? t.events.matchPick}</p>

      <p
        className={cx(
          'mt-3 font-display leading-tight text-cream',
          large ? 'text-[1.125rem]' : 'text-[1rem]',
        )}
      >
        {beer}
      </p>

      <p className="mt-1 flex items-baseline gap-2 text-[0.8125rem] leading-snug text-cream-dim/70">
        <span aria-hidden="true" className="text-gold/70">
          +
        </span>
        {snack}
      </p>
    </div>
  );
}
