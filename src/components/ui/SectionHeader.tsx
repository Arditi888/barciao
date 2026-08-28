import type { ReactNode } from 'react';
import { cx } from '../../utils/format';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  caption?: string;
  /** Right-aligned slot for a "see all" style link. */
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Renders the title in the display serif rather than the UI sans. */
  display?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  caption,
  action,
  align = 'left',
  className,
  display = true,
}: SectionHeaderProps) {
  const centred = align === 'center';

  return (
    <Reveal
      as="header"
      className={cx(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',
        centred && 'sm:flex-col sm:items-center',
        className,
      )}
    >
      <div className={cx('max-w-2xl', centred && 'text-center')}>
        {eyebrow ? (
          <p className={cx('eyebrow text-royal-light', centred && 'mx-auto')}>
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden="true" className="h-px w-6 bg-royal-light/60" />
              {eyebrow}
            </span>
          </p>
        ) : null}

        <h2
          className={cx(
            'mt-4 text-balance',
            display
              ? 'font-display text-[clamp(1.75rem,6vw,2.75rem)] leading-[1.08] font-normal'
              : 'text-2xl font-medium',
          )}
        >
          {title}
        </h2>

        {caption ? (
          <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-mist/75">
            {caption}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
