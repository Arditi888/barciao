import { t } from '../../data/strings';
import type { EventTeams } from '../../types';
import { cx } from '../../utils/format';

interface MatchFixtureProps {
  teams: EventTeams;
  time: string;
  size?: 'md' | 'lg';
  className?: string;
}

/** The football card. Team names are set as type — no club crests, so
 *  nothing here depends on artwork the bar does not own. */
export function MatchFixture({ teams, time, size = 'md', className }: MatchFixtureProps) {
  const large = size === 'lg';

  return (
    <div className={cx('text-center', className)}>
      {teams.competition ? (
        <p className="eyebrow text-mute">{teams.competition}</p>
      ) : null}

      <div className={cx('flex flex-col items-center', teams.competition ? 'mt-5' : '')}>
        <p
          className={cx(
            'font-display leading-none tracking-[0.06em] uppercase text-cream',
            large ? 'text-[clamp(1.75rem,8vw,3.25rem)]' : 'text-[clamp(1.375rem,6vw,2rem)]',
          )}
        >
          {teams.home}
        </p>

        <div className="my-3 flex w-full items-center justify-center gap-4 sm:my-4">
          <span aria-hidden="true" className="h-px max-w-[5rem] flex-1 bg-cream/15" />
          <span className="eyebrow text-gold">vs</span>
          <span aria-hidden="true" className="h-px max-w-[5rem] flex-1 bg-cream/15" />
        </div>

        <p
          className={cx(
            'font-display leading-none tracking-[0.06em] uppercase text-cream',
            large ? 'text-[clamp(1.75rem,8vw,3.25rem)]' : 'text-[clamp(1.375rem,6vw,2rem)]',
          )}
        >
          {teams.away}
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className={cx('numeric font-display text-gold', large ? 'text-3xl' : 'text-2xl')}>{time}</p>
        <p className="eyebrow text-mute">{t.events.live}</p>
      </div>
    </div>
  );
}
