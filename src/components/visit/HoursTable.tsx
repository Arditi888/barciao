import { groupedOpeningHours } from '../../data/business';
import { cx } from '../../utils/format';
import { todayIndex } from '../../utils/openingHours';

/** Consecutive days with identical hours are merged into one row, and
 *  the row covering today is marked. */
export function HoursTable({ className }: { className?: string }) {
  const rows = groupedOpeningHours();
  const today = todayIndex();

  return (
    <dl className={cx('divide-y divide-cream/8', className)}>
      {rows.map((row) => {
        const isToday = row.days.includes(today);

        return (
          <div
            key={row.label}
            className={cx(
              'flex items-baseline justify-between gap-6 py-3.5',
              isToday ? 'text-cream' : 'text-cream-dim/65',
            )}
          >
            <dt className="flex items-center gap-2.5 text-[0.875rem]">
              {isToday ? (
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-gold" />
              ) : (
                <span aria-hidden="true" className="h-1 w-1 shrink-0" />
              )}
              {row.label}
            </dt>
            <dd className={cx('numeric text-[0.875rem]', isToday && 'text-gold')}>{row.hours}</dd>
          </div>
        );
      })}
    </dl>
  );
}
