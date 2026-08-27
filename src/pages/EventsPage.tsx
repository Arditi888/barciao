import { useMemo, useState } from 'react';
import { EventCard } from '../components/events/EventCard';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/ui/PageHeader';
import { events as allEvents } from '../data/events';
import { t } from '../data/strings';
import type { EventType } from '../types';
import { groupByBucket, pastEvents, upcomingEvents } from '../utils/date';
import { cx } from '../utils/format';
import { useSeo } from '../hooks/useSeo';

type Filter = EventType | 'all';

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: t.events.filterAll },
  { value: 'sport', label: t.events.filterSport },
  { value: 'music', label: t.events.filterMusic },
  { value: 'special', label: t.events.filterSpecial },
];

export function EventsPage() {
  useSeo(t.seo.events.title, t.seo.events.description);

  const [filter, setFilter] = useState<Filter>('all');
  const [showPast, setShowPast] = useState(false);

  const upcoming = useMemo(() => upcomingEvents(allEvents), []);
  const past = useMemo(() => pastEvents(allEvents), []);

  const byFilter = (type: EventType) => filter === 'all' || filter === type;
  const visibleUpcoming = upcoming.filter((event) => byFilter(event.type));
  const visiblePast = past.filter((event) => byFilter(event.type));

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
                    ? 'border-gold/50 bg-gold/10 text-gold'
                    : 'border-cream/12 text-cream-dim/70 hover:border-cream/30 hover:text-cream',
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
                    <h2 className="eyebrow border-b border-cream/8 pb-4 text-gold">{group.label}</h2>
                    <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-2">
                      {group.events.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
        </div>

        {visiblePast.length > 0 ? (
          <div className="mt-16 border-t border-cream/8 pt-8">
            <button
              type="button"
              onClick={() => setShowPast((value) => !value)}
              aria-expanded={showPast}
              className="inline-flex items-center py-2.5 -my-2 text-[0.8125rem] text-cream-dim/60 underline decoration-cream/20 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-cream hover:decoration-gold"
            >
              {showPast ? t.events.hidePast : t.events.showPast}
            </button>

            {showPast ? (
              <div className="mt-8">
                <h2 className="eyebrow border-b border-cream/8 pb-4 text-mute">{t.events.pastTitle}</h2>
                <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-2">
                  {visiblePast.map((event) => (
                    <EventCard key={event.id} event={event} past />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Container>
    </>
  );
}
