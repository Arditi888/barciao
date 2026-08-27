import { t } from '../../data/strings';
import type { Badge as BadgeKind } from '../../types';
import { cx } from '../../utils/format';

const tones: Record<BadgeKind, string> = {
  popular: 'border-cream/20 text-cream-dim',
  'ciao-pick': 'border-gold/45 text-gold',
  new: 'border-live/45 text-live',
  premium: 'border-cream/25 text-cream',
  placeholder: 'border-cream/12 text-mute',
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
