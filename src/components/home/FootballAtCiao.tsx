import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { events } from '../../data/events';
import { t } from '../../data/strings';
import type { FootballEvent } from '../../types';
import { eventBucket, headlineEvent } from '../../utils/date';
import { MatchCard } from '../events/MatchCard';
import { MatchDetail } from '../events/MatchDetail';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

/** The homepage football slot. Shows tonight's match when there is
 *  one, otherwise the next fixture — the heading is derived from the
 *  date, never stored on the event. */
export function FootballAtCiao() {
  const [openMatch, setOpenMatch] = useState<FootballEvent | null>(null);
  const event = headlineEvent(events);
  const isTonight = event ? eventBucket(event) === 'today' : false;

  return (
    <section className="border-y border-cream/10 bg-ink-900/60 py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-gold">
              <span className="inline-flex items-center gap-2.5">
                <span aria-hidden="true" className="h-px w-6 bg-gold/50" />
                {isTonight ? t.football.tonightEyebrow : t.football.eyebrow}
              </span>
            </p>
            {event && !isTonight ? (
              <p className="mt-3 text-[0.875rem] text-cream-dim/70">{t.football.nextUp}</p>
            ) : null}
          </div>

          <Link
            to="/events"
            className="group inline-flex items-center gap-2 py-2.5 -my-2.5 text-[0.8125rem] text-cream-dim/70 transition-colors duration-300 hover:text-cream"
          >
            {t.football.all}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          {event ? (
            <MatchCard event={event} featured onOpen={setOpenMatch} />
          ) : (
            <div className="rounded-sm border border-cream/10 bg-ink-800/60 px-6 py-16 text-center sm:px-10 sm:py-24">
              <p className="font-display text-[clamp(1.75rem,7vw,3rem)] leading-tight text-cream">
                {t.football.emptyTitle}
              </p>
              <p className="mt-3 text-[0.9375rem] text-cream-dim/70">{t.football.emptyBody}</p>
              <Button to="/menu" variant="secondary" size="md" className="mt-9">
                {t.football.emptyCta}
              </Button>
            </div>
          )}
        </Reveal>
      </Container>

      <MatchDetail event={openMatch} onClose={() => setOpenMatch(null)} />
    </section>
  );
}
