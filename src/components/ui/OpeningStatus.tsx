import { useOpeningStatus } from '../../hooks/useOpeningStatus';
import type { OpeningState } from '../../types';
import { cx } from '../../utils/format';
import { shortStatusLabel } from '../../utils/openingHours';

const dotTone: Record<OpeningState, string> = {
  open: 'bg-live',
  'closing-soon': 'bg-gold',
  closed: 'bg-mute-dim',
};

const textTone: Record<OpeningState, string> = {
  open: 'text-cream',
  'closing-soon': 'text-gold-soft',
  closed: 'text-mute',
};

/** A status light, not an emoji: a coloured dot that gently haloes
 *  while the bar is open and sits still once it has closed. */
export function StatusDot({ state, className }: { state: OpeningState; className?: string }) {
  const live = state !== 'closed';

  return (
    <span className={cx('relative flex h-2 w-2 shrink-0', className)} aria-hidden="true">
      {live ? (
        <span
          className={cx('animate-status-pulse absolute inset-0 rounded-full opacity-60', dotTone[state])}
        />
      ) : null}
      <span className={cx('relative h-2 w-2 rounded-full', dotTone[state])} />
    </span>
  );
}

interface OpeningStatusProps {
  variant?: 'inline' | 'pill' | 'block';
  className?: string;
}

export function OpeningStatus({ variant = 'inline', className }: OpeningStatusProps) {
  const status = useOpeningStatus();
  const label = variant === 'inline' ? shortStatusLabel(status) : status.label;

  if (variant === 'pill') {
    return (
      <span
        className={cx(
          'inline-flex items-center gap-2.5 rounded-xs border border-cream/12 bg-cream/[0.04]',
          'px-3.5 py-2 text-[0.75rem] tracking-[0.06em] backdrop-blur-sm',
          textTone[status.state],
          className,
        )}
        role="status"
      >
        <StatusDot state={status.state} />
        {label}
      </span>
    );
  }

  if (variant === 'block') {
    return (
      <span className={cx('inline-flex items-center gap-2.5 text-sm', textTone[status.state], className)} role="status">
        <StatusDot state={status.state} />
        {label}
      </span>
    );
  }

  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 text-[0.6875rem] tracking-[0.12em] uppercase',
        textTone[status.state],
        className,
      )}
      role="status"
    >
      <StatusDot state={status.state} />
      <span className="numeric">{label}</span>
    </span>
  );
}
