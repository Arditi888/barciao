import { business } from '../../data/business';
import { cx } from '../../utils/format';

interface WordmarkProps {
  className?: string;
  /** Renders "BAR • TIRANA" beneath the name. */
  withTagline?: boolean;
  tone?: 'cream' | 'gold';
}

/** CIAO — set in the display serif with the wide tracking that makes
 *  four letters read as a mark rather than a word. */
export function Wordmark({ className, withTagline = false, tone = 'cream' }: WordmarkProps) {
  return (
    <span className={cx('inline-flex flex-col items-start leading-none', className)}>
      <span
        className={cx(
          'font-display tracking-[0.2em] uppercase',
          tone === 'gold' ? 'text-gold' : 'text-cream',
        )}
      >
        {business.wordmark}
      </span>
      {withTagline ? (
        <span className="eyebrow mt-2 text-[0.625rem] text-mute">{business.tagline}</span>
      ) : null}
    </span>
  );
}
