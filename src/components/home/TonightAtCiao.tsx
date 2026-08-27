import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { events } from '../../data/events';
import { t } from '../../data/strings';
import { headlineEvent } from '../../utils/date';
import { EventCard } from '../events/EventCard';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

export function TonightAtCiao() {
  const event = headlineEvent(events);

  return (
    <section className="border-y border-cream/10 bg-ink-900/60 py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <p className="eyebrow text-gold">
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden="true" className="h-px w-6 bg-gold/50" />
              {t.tonight.eyebrow}
            </span>
          </p>

          <Link
            to="/events"
            className="group inline-flex items-center gap-2 py-2.5 -my-2.5 text-[0.8125rem] text-cream-dim/70 transition-colors duration-300 hover:text-cream"
          >
            {t.tonight.all}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          {event ? (
            <EventCard event={event} featured />
          ) : (
            <div className="rounded-sm border border-cream/10 bg-ink-800/60 px-6 py-16 text-center sm:px-10 sm:py-24">
              <p className="font-display text-[clamp(1.75rem,7vw,3rem)] leading-tight text-cream">
                {t.tonight.emptyTitle}
              </p>
              <p className="mt-3 font-display text-[clamp(1.25rem,5vw,2rem)] text-gold italic">
                {t.tonight.emptyBody}
              </p>
              <Button to="/menu" variant="secondary" size="md" className="mt-9">
                {t.tonight.emptyCta}
              </Button>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
