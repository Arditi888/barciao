import { CalendarPlus, Music3, PartyPopper, Trophy } from 'lucide-react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { t } from '../../data/strings';
import type { CiaoEvent, EventType } from '../../types';
import { bucketLabel, calendarUrl, eventBucket, formatEventDate } from '../../utils/date';
import { cx } from '../../utils/format';
import { MatchFixture } from './MatchFixture';

const typeIcons: Record<EventType, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  sport: Trophy,
  music: Music3,
  special: PartyPopper,
};

const typeTone: Record<EventType, string> = {
  sport: 'text-gold',
  music: 'text-cream-dim',
  special: 'text-aperol',
};

interface EventCardProps {
  event: CiaoEvent;
  /** Large treatment used for the headline event on the homepage. */
  featured?: boolean;
  past?: boolean;
  className?: string;
}

export function EventCard({ event, featured = false, past = false, className }: EventCardProps) {
  const Icon = typeIcons[event.type];
  const bucket = eventBucket(event);
  const isToday = bucket === 'today' && !past;
  const isMatch = event.type === 'sport' && Boolean(event.teams);

  return (
    <article
      className={cx(
        'group relative flex flex-col overflow-hidden rounded-sm border transition-colors duration-400',
        past
          ? 'border-cream/8 bg-ink-900/40 opacity-55'
          : 'border-cream/10 bg-ink-800/70 hover:border-cream/25',
        featured ? 'p-6 sm:p-9' : 'p-5 sm:p-6',
        className,
      )}
    >
      {event.image ? (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <img src={event.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
        </div>
      ) : null}

      <header className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2.5">
          <Icon className={cx('h-4 w-4', past ? 'text-mute-dim' : typeTone[event.type])} strokeWidth={1.5} aria-hidden="true" />
          <span className="eyebrow text-mute">{t.eventTypes[event.type]}</span>
        </span>

        {isToday ? (
          <span className="eyebrow rounded-xs border border-gold/40 px-2 py-1 text-gold">
            {bucketLabel(bucket)}
          </span>
        ) : null}
      </header>

      {isMatch && event.teams ? (
        <div className={cx(featured ? 'py-10 sm:py-14' : 'py-8')}>
          <MatchFixture teams={event.teams} time={event.time} size={featured ? 'lg' : 'md'} />
        </div>
      ) : (
        <div className={cx('flex-1', featured ? 'pt-10 sm:pt-14' : 'pt-8')}>
          <h3
            className={cx(
              'font-display leading-[1.05] text-cream',
              featured ? 'text-[clamp(2rem,9vw,3.5rem)]' : 'text-[1.5rem] sm:text-[1.75rem]',
            )}
          >
            {event.title}
          </h3>
          {event.description ? (
            <p
              className={cx(
                'mt-4 max-w-prose leading-relaxed text-cream-dim/70',
                featured ? 'text-[0.9375rem] sm:text-base' : 'text-[0.875rem]',
              )}
            >
              {event.description}
            </p>
          ) : null}
        </div>
      )}

      <footer className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
        <div>
          <p className={cx('eyebrow', past ? 'text-mute-dim' : 'text-gold')}>{formatEventDate(event)}</p>
          <p
            className={cx(
              'numeric font-display leading-none text-cream',
              featured ? 'mt-2.5 text-3xl' : 'mt-2 text-2xl',
            )}
          >
            {event.time}
          </p>
        </div>

        {!past ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {event.cta ? (
              <Link
                to={event.cta.to}
                className="inline-flex items-center py-2.5 -my-2.5 text-[0.8125rem] text-cream underline decoration-gold/50 decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-gold"
              >
                {event.cta.label}
              </Link>
            ) : null}

            <a
              href={calendarUrl(event)}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 py-2.5 -my-2.5 text-[0.8125rem] text-cream-dim/70 transition-colors duration-300 hover:text-cream"
            >
              <CalendarPlus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {t.events.addToCalendar}
            </a>
          </div>
        ) : null}
      </footer>
    </article>
  );
}
