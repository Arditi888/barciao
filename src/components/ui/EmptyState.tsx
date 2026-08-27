import type { ReactNode } from 'react';
import { cx } from '../../utils/format';

interface EmptyStateProps {
  title: string;
  body?: string;
  action?: ReactNode;
  className?: string;
}

/** Every "nothing here" moment on the site uses this shape, so an
 *  empty category never reads like a broken page. */
export function EmptyState({ title, body, action, className }: EmptyStateProps) {
  return (
    <div
      className={cx(
        'rounded-sm border border-dashed border-cream/12 px-6 py-16 text-center sm:py-20',
        className,
      )}
    >
      <p className="font-display text-[1.5rem] leading-tight text-cream sm:text-[1.75rem]">{title}</p>
      {body ? <p className="mt-3 text-[0.875rem] text-cream-dim/60">{body}</p> : null}
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
