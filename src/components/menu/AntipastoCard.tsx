import { t } from '../../data/strings';
import type { AntipastoItem } from '../../types';
import { cx, priceParts } from '../../utils/format';

const tierAccent: Record<AntipastoItem['tier'], string> = {
  base: 'from-mist/[0.05]',
  mid: 'from-royal/20',
  premium: 'from-royal/40',
};

/** Boards get more room than a drink line: the contents are the point,
 *  so they are listed rather than compressed into a subtitle. */
export function AntipastoCard({ board, className }: { board: AntipastoItem; className?: string }) {
  const { amount, unit } = priceParts(board.price);

  return (
    <article
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-sm border border-mist/15',
        'bg-surface/70 p-6 transition-colors duration-400 hover:border-mist/30',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cx(
          'pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent opacity-70',
          tierAccent[board.tier],
        )}
      />

      <header className="relative">
        <p className="eyebrow text-royal-light">{board.pairing}</p>
        <h3 className="mt-3 font-display text-[1.75rem] leading-none text-cream">{board.name}</h3>
      </header>

      <ul className="relative mt-7 flex-1 space-y-2.5">
        {board.contents.map((entry) => (
          <li key={entry} className="flex items-baseline gap-3 text-[0.875rem] text-mist/80">
            <span aria-hidden="true" className="h-px w-3 shrink-0 translate-y-[-0.25rem] bg-royal/40" />
            {entry}
          </li>
        ))}
      </ul>

      <footer className="relative mt-8 flex items-baseline justify-between border-t border-mist/12 pt-5">
        <span className="text-[0.75rem] text-haze">
          {t.menu.serves} {board.serves}
        </span>
        <span className="flex items-baseline gap-1.5">
          <span className="numeric font-display text-[1.5rem] leading-none text-cream">{amount}</span>
          <span className="text-[0.625rem] tracking-[0.12em] text-haze uppercase">{unit}</span>
        </span>
      </footer>
    </article>
  );
}
