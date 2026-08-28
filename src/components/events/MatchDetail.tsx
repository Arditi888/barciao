import { CalendarPlus, MapPin, Navigation, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { business, directionsHref, mapsHref } from '../../data/business';
import { t } from '../../data/strings';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import type { FootballEvent } from '../../types';
import { calendarUrl, competitionLabels, formatEventDate, matchTitle } from '../../utils/date';
import { Button } from '../ui/Button';
import { OpeningStatus } from '../ui/OpeningStatus';
import { MatchRecommendation } from './MatchRecommendation';

interface MatchDetailProps {
  event: FootballEvent | null;
  onClose: () => void;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-mist/12 py-3.5">
      <dt className="text-[0.8125rem] text-haze">{label}</dt>
      <dd className="text-right text-[0.875rem] text-cream">{children}</dd>
    </div>
  );
}

/** Full detail for one match. Opens over the list, closes on Escape,
 *  on the backdrop, or on the close button, and returns focus to
 *  whatever opened it. */
export function MatchDetail({ event, onClose }: MatchDetailProps) {
  const open = event !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<Element | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement;
    panelRef.current?.focus();

    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      const previous = restoreFocusTo.current;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open, onClose]);

  if (!event) return null;

  const isAlbania = event.competition === 'albania';

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label={t.events.close}
        onClick={onClose}
        className="absolute inset-0 bg-deeper/85 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={matchTitle(event)}
        tabIndex={-1}
        className="animate-swap-in relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-sm border border-mist/15 bg-deep p-6 focus:outline-none sm:rounded-sm sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow text-royal-light">
            {isAlbania ? `${competitionLabels.albania} 🇦🇱` : competitionLabels[event.competition]}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.events.close}
            className="-mt-2 -mr-2 flex h-10 w-10 items-center justify-center rounded-xs text-haze transition-colors duration-300 hover:text-cream"
          >
            <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="py-8 text-center">
          <p className="font-display text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.05] tracking-[0.04em] uppercase text-cream">
            {event.homeTeam}
          </p>
          <div className="my-3 flex items-center justify-center gap-4">
            <span aria-hidden="true" className="h-px max-w-[4rem] flex-1 bg-mist/20" />
            <span className="eyebrow text-royal-light">vs</span>
            <span aria-hidden="true" className="h-px max-w-[4rem] flex-1 bg-mist/20" />
          </div>
          <p className="font-display text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.05] tracking-[0.04em] uppercase text-cream">
            {event.awayTeam}
          </p>
        </div>

        <dl className="border-t border-mist/12">
          <Row label={t.events.competition}>
            {event.stage ?? competitionLabels[event.competition]}
          </Row>
          <Row label={t.events.date}>{formatEventDate(event)}</Row>
          <Row label={t.events.kickoff}>
            {event.time ? (
              <span className="numeric">{event.time}</span>
            ) : (
              <span className="text-haze">{t.events.kickoffTbc}</span>
            )}
          </Row>
          <Row label={t.events.where}>{business.location.label}</Row>
          <Row label={t.events.barStatus}>
            <OpeningStatus variant="block" className="text-[0.8125rem]" />
          </Row>
        </dl>

        <MatchRecommendation
          beer={event.recommendation.beer}
          snack={event.recommendation.snack}
          title={event.recommendation.title}
          className="mt-8"
        />

        <div className="mt-8 flex flex-col gap-3">
          <Button href={mapsHref} size="md" full icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />}>
            {t.visit.maps}
          </Button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href={directionsHref}
              variant="secondary"
              size="md"
              className="w-full sm:w-auto sm:flex-1"
              icon={<Navigation className="h-4 w-4" strokeWidth={1.5} />}
            >
              {t.visit.directions}
            </Button>
            <Button to="/menu" variant="secondary" size="md" className="w-full sm:w-auto sm:flex-1">
              {t.hero.primaryCta}
            </Button>
          </div>

          <a
            href={calendarUrl(event)}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 py-2.5 text-[0.8125rem] text-mist/70 transition-colors duration-300 hover:text-cream"
          >
            <CalendarPlus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {t.events.addToCalendar}
          </a>
        </div>
      </div>
    </div>
  );
}
