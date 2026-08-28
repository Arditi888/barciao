import { t } from '../../data/strings';
import type { Badge as BadgeKind } from '../../types';
import { cx } from '../../utils/format';

const tones: Record<BadgeKind, string> = {
  popular: 'border-mist/25 text-mist',
  'ciao-pick': 'border-royal-light/60 text-royal-light',
  new: 'border-royal-light/60 text-royal-light',
  premium: 'border-mist/35 text-cream',
  placeholder: 'border-mist/15 text-haze',
};

export function Badge({ kind, className }: { kind: BadgeKind; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center rounded-xs border px-1.5 py-[3px]',
        'text-[0.625rem] leading-none font-medium tracking-[0.16em] uppercase',
        tones[kind],
        className,
      )}
    >
      {t.badges[kind]}
    </span>
  );
}
