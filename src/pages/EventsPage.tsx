import { useMemo, useState } from 'react';
import { MatchCard } from '../components/events/MatchCard';
import { MatchDetail } from '../components/events/MatchDetail';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/ui/PageHeader';
import { events as allEvents } from '../data/events';
import { t } from '../data/strings';
import { useSeo } from '../hooks/useSeo';
import type { Competition, FootballEvent } from '../types';
import {
  competitionLabels,
  groupByBucket,
  isThisWeek,
  pastEvents,
  upcomingEvents,
} from '../utils/date';
import { cx } from '../utils/format';

type Filter = Competition | 'all' | 'week';

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: t.events.filterAll },
  { value: 'champions-league', label: competitionLabels['champions-league'] },
  { value: 'premier-league', label: competitionLabels['premier-league'] },
  { value: 'serie-a', label: competitionLabels['serie-a'] },
  { value: 'albania', label: competitionLabels.albania },
  { value: 'week', label: t.events.filterWeek },
];

export function EventsPage() {
  useSeo(t.seo.events.title, t.seo.events.description);

  const [filter, setFilter] = useState<Filter>('all');
  const [showPast, setShowPast] = useState(false);
  const [openMatch, setOpenMatch] = useState<FootballEvent | null>(null);

  const upcoming = useMemo(() => upcomingEvents(allEvents), []);
  const past = useMemo(() => pastEvents(allEvents), []);

  const matchesFilter = (event: FootballEvent) => {
    if (filter === 'all') return true;
    if (filter === 'week') return isThisWeek(event);
    return event.competition === filter;
  };

  const visibleUpcoming = upcoming.filter(matchesFilter);
  const visiblePast = past.filter(
    (event) => filter === 'all' || filter === 'week' || event.competition === filter,
  );

  const groups = useMemo(() => groupByBucket(visibleUpcoming), [visibleUpcoming]);
  const nothingScheduled = upcoming.length === 0;

  return (
    <>
      <PageHeader title={t.events.title} caption={t.events.caption}>
        <div role="group" aria-label={t.events.title} className="flex flex-wrap gap-2">
          {filters.map((entry) => {
            const active = entry.value === filter;
            return (
              <button
                key={entry.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(entry.value)}
                className={cx(
                  'h-10 rounded-xs border px-4 text-[0.8125rem] transition-colors duration-300',
                  active
                    ? 'border-royal/50 bg-royal/10 text-royal-light'
                    : 'border-mist/18 text-mist/70 hover:border-mist/35 hover:text-cream',
                )}
              >
                {entry.label}
              </button>
            );
          })}
        </div>
      </PageHeader>

      <Container className="pb-24 lg:pb-28">
        <div key={filter} className="animate-swap-in">
          {visibleUpcoming.length === 0 ? (
            <EmptyState
              title={nothingScheduled ? t.events.emptyTitle : t.events.emptyFilterTitle}
              body={nothingScheduled ? t.events.emptyBody : t.events.emptyFilterBody}
            />
          ) : (
            <div className="space-y-14">
              {groups.map((group) => (
                <section key={group.bucket}>
                  <h2 className="eyebrow border-b border-mist/12 pb-4 text-royal-light">{group.label}</h2>
                  <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-2">
                    {group.events.map((event) => (
                      <MatchCard key={event.id} event={event} onOpen={setOpenMatch} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {visiblePast.length > 0 ? (
          <div className="mt-16 border-t border-mist/12 pt-8">
            <button
              type="button"
              onClick={() => setShowPast((value) => !value)}
              aria-expanded={showPast}
              className="inline-flex items-center py-2.5 -my-2 text-[0.8125rem] text-mist/60 underline decoration-cream/20 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-cream hover:decoration-royal"
            >
              {showPast ? t.events.hidePast : t.events.showPast}
            </button>

            {showPast ? (
              <div className="mt-8">
                <h2 className="eyebrow border-b border-mist/12 pb-4 text-haze">{t.events.pastTitle}</h2>
                <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-2">
                  {visiblePast.map((event) => (
                    <MatchCard key={event.id} event={event} past />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Container>

      <MatchDetail event={openMatch} onClose={() => setOpenMatch(null)} />
    </>
  );
}
