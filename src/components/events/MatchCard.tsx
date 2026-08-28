import { ArrowUpRight } from 'lucide-react';
import { t } from '../../data/strings';
import type { Competition, FootballEvent } from '../../types';
import { bucketLabel, competitionLabels, eventBucket, formatEventDate } from '../../utils/date';
import { cx } from '../../utils/format';
import { MatchRecommendation } from './MatchRecommendation';

/** Albania is marked out with the brand's own bright royal rather than
 *  a national colour — the card should still read as Bar Ciao first. */
const competitionAccent: Record<Competition, string> = {
  'champions-league': 'text-mist',
  'premier-league': 'text-mist',
  'serie-a': 'text-mist',
  albania: 'text-royal-light',
};

interface MatchCardProps {
  event: FootballEvent;
  /** Larger poster treatment for the homepage headline match. */
  featured?: boolean;
  past?: boolean;
  onOpen?: (event: FootballEvent) => void;
  className?: string;
}

/** A match poster: competition small, teams large, kick-off prominent,
 *  the Ciao pairing set apart underneath. No club crests — the type
 *  does the work, so nothing depends on artwork the bar does not own. */
export function MatchCard({ event, featured = false, past = false, onOpen, className }: MatchCardProps) {
  const bucket = eventBucket(event);
  const isToday = bucket === 'today' && !past;
  const isAlbania = event.competition === 'albania';

  const teamSize = featured
    ? 'text-[clamp(1.875rem,8vw,3.5rem)]'
    : 'text-[clamp(1.5rem,5.5vw,2.125rem)]';

  const content = (
    <>
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={cx('eyebrow', past ? 'text-haze-dim' : competitionAccent[event.competition])}>
            {isAlbania ? `${competitionLabels.albania} 🇦🇱` : competitionLabels[event.competition]}
          </p>
          {event.stage ? (
            <p className="mt-2 truncate text-[0.75rem] text-haze">{event.stage}</p>
          ) : null}
        </div>

        {isToday ? (
          <span className="eyebrow shrink-0 rounded-xs border border-royal-light/50 bg-royal/25 px-2 py-1 text-white">
            {bucketLabel(bucket)}
          </span>
        ) : null}
      </header>

      {/* The fixture itself. */}
      <div className={cx('text-center', featured ? 'py-10 sm:py-14' : 'py-8')}>
        <p className={cx('font-display leading-[1.05] tracking-[0.04em] uppercase text-cream', teamSize)}>
          {event.homeTeam}
        </p>

        <div className="my-3 flex items-center justify-center gap-4 sm:my-4">
          <span aria-hidden="true" className="h-px max-w-[4.5rem] flex-1 bg-mist/20" />
          <span className="eyebrow text-royal-light">vs</span>
          <span aria-hidden="true" className="h-px max-w-[4.5rem] flex-1 bg-mist/20" />
        </div>

        <p className={cx('font-display leading-[1.05] tracking-[0.04em] uppercase text-cream', teamSize)}>
          {event.awayTeam}
        </p>

        <div className="mt-7 flex flex-col items-center gap-2">
          {event.time ? (
            <p className={cx('numeric font-display leading-none text-white', featured ? 'text-4xl' : 'text-3xl')}>
              {event.time}
            </p>
          ) : (
            <p className="text-[0.8125rem] text-haze">{t.events.kickoffTbc}</p>
          )}

          <p className={cx('eyebrow', past ? 'text-haze-dim' : 'text-haze')}>
            {past ? bucketLabel('past') : t.events.live}
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-5">
          <p className={cx('text-[0.875rem]', past ? 'text-haze-dim' : 'text-mist/80')}>
            {formatEventDate(event)}
          </p>
          {event.status === 'provisional' && !past ? (
            <p className="text-[0.75rem] text-haze">{t.events.provisional}</p>
          ) : null}
        </div>

        <MatchRecommendation
          beer={event.recommendation.beer}
          snack={event.recommendation.snack}
          title={event.recommendation.title}
          size={featured ? 'md' : 'sm'}
        />
      </div>
    </>
  );

  const shell = cx(
    'group relative flex h-full flex-col overflow-hidden rounded-sm border text-left transition-colors duration-400',
    past
      ? 'border-mist/10 bg-deeper/50 opacity-55'
      : 'border-mist/15 bg-deeper/70 hover:border-royal-light/45 hover:bg-surface/70',
    isAlbania && !past && 'border-royal/50 bg-surface/60 hover:border-royal-light/70',
    featured ? 'p-6 sm:p-9' : 'p-5 sm:p-6',
    className,
  );

  if (past || !onOpen) {
    return <article className={shell}>{content}</article>;
  }

  return (
    <button type="button" onClick={() => onOpen(event)} className={shell} aria-label={`${event.homeTeam} – ${event.awayTeam}. ${t.events.openMatch}`}>
      {/* Royal rule that draws itself across the top edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px w-0 bg-royal transition-[width] duration-600 ease-[var(--ease-out-expo)] group-hover:w-full"
      />
      {content}
      <ArrowUpRight
        aria-hidden="true"
        className="absolute top-5 right-5 h-4 w-4 text-haze-dim opacity-0 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-royal-light group-hover:opacity-100"
      />
    </button>
  );
}
