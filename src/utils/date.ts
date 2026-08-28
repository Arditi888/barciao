import { business, monthNames, weekdayNames } from '../data/business';
import type { Competition, EventBucket, FootballEvent } from '../types';
import { localClock, localISODate, toMinutes } from './openingHours';

/* ==================================================================
   Match date logic. Every comparison happens against the bar's local
   date in Tirana, never the visitor's device date.
   ================================================================== */

/** A match stays "on" for this long after kick-off before it counts as
 *  past — a 21:00 game should not vanish at 21:01. */
const GRACE_MINUTES = 180;

/** When kick-off is not yet published, treat the match as an evening
 *  fixture so it does not drop off the list at midday. */
const ASSUMED_KICKOFF = '20:00';

/** Splits `YYYY-MM-DD` into its numeric parts. */
function parseISODate(isoDate: string): { year: number; month: number; day: number } {
  const [year = '0', month = '1', day = '1'] = isoDate.split('-');
  return { year: Number(year), month: Number(month) - 1, day: Number(day) };
}

/** "E shtunë, 29 gusht" — built from our own name tables so the output
 *  is identical on every device, with no dependency on locale data. */
function formatLongDate(isoDate: string): string {
  const { year, month, day } = parseISODate(isoDate);
  const weekday = weekdayNames[new Date(Date.UTC(year, month, day)).getUTCDay()] ?? '';
  return `${weekday}, ${day} ${monthNames[month] ?? ''}`;
}

/** "29 gusht" — the date without its weekday. */
export function formatShortDate(isoDate: string): string {
  const { month, day } = parseISODate(isoDate);
  return `${day} ${monthNames[month] ?? ''}`;
}

function toDayNumber(isoDate: string): number {
  const { year, month, day } = parseISODate(isoDate);
  return Date.UTC(year, month, day) / 86_400_000;
}

export function daysFromToday(isoDate: string, now: Date = new Date()): number {
  return toDayNumber(isoDate) - toDayNumber(localISODate(now));
}

export function isPastEvent(event: FootballEvent, now: Date = new Date()): boolean {
  const offset = daysFromToday(event.date, now);
  if (offset < 0) return true;
  if (offset > 0) return false;
  return localClock(now).minutes > toMinutes(event.time ?? ASSUMED_KICKOFF) + GRACE_MINUTES;
}

export function eventBucket(event: FootballEvent, now: Date = new Date()): EventBucket {
  if (isPastEvent(event, now)) return 'past';

  const offset = daysFromToday(event.date, now);
  if (offset <= 0) return 'today';
  if (offset === 1) return 'tomorrow';
  if (offset <= 7) return 'week';
  return 'later';
}

const bucketLabels: Record<EventBucket, string> = {
  today: 'Sonte',
  tomorrow: 'Nesër',
  week: 'Këtë javë',
  later: 'Së shpejti',
  past: 'Ka kaluar',
};

export function bucketLabel(bucket: EventBucket): string {
  return bucketLabels[bucket];
}

/** "Sonte" / "Nesër" where that reads better, otherwise the full date.
 *  Derived from the date — never stored on the event itself. */
export function formatEventDate(event: FootballEvent, now: Date = new Date()): string {
  const bucket = eventBucket(event, now);
  if (bucket === 'today') return 'Sonte';
  if (bucket === 'tomorrow') return 'Nesër';
  return formatLongDate(event.date);
}

/** Chronological: by date, then by kick-off. Matches with no announced
 *  time sort after those that have one on the same day. */
function chronological(a: FootballEvent, b: FootballEvent): number {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;

  const timeA = a.time ?? '99:99';
  const timeB = b.time ?? '99:99';
  if (timeA !== timeB) return timeA < timeB ? -1 : 1;

  return a.id.localeCompare(b.id);
}

export function upcomingEvents(events: FootballEvent[], now: Date = new Date()): FootballEvent[] {
  return events.filter((event) => !isPastEvent(event, now)).sort(chronological);
}

export function pastEvents(events: FootballEvent[], now: Date = new Date()): FootballEvent[] {
  return events.filter((event) => isPastEvent(event, now)).sort((a, b) => chronological(b, a));
}

/** The match to headline on the homepage. Today's match wins — the
 *  most important one when several are on — and otherwise it is simply
 *  the next match to be played. Chronology stays the primary order, so
 *  a big fixture in December never jumps ahead of tomorrow's game. */
export function headlineEvent(events: FootballEvent[], now: Date = new Date()): FootballEvent | null {
  const upcoming = upcomingEvents(events, now);
  if (upcoming.length === 0) return null;

  const today = upcoming.filter((event) => eventBucket(event, now) === 'today');
  if (today.length > 0) {
    return today.find((event) => event.featured) ?? today[0] ?? null;
  }

  return upcoming[0] ?? null;
}

/** Groups upcoming matches under their bucket, preserving chronology. */
export function groupByBucket(
  events: FootballEvent[],
  now: Date = new Date(),
): { bucket: EventBucket; label: string; events: FootballEvent[] }[] {
  const order: EventBucket[] = ['today', 'tomorrow', 'week', 'later'];

  return order
    .map((bucket) => ({
      bucket,
      label: bucketLabel(bucket),
      events: events.filter((event) => eventBucket(event, now) === bucket),
    }))
    .filter((group) => group.events.length > 0);
}

export function isThisWeek(event: FootballEvent, now: Date = new Date()): boolean {
  const bucket = eventBucket(event, now);
  return bucket === 'today' || bucket === 'tomorrow' || bucket === 'week';
}

export function matchTitle(event: FootballEvent): string {
  return `${event.homeTeam} – ${event.awayTeam}`;
}

/** Google Calendar link — no third-party script, just a URL. */
export function calendarUrl(event: FootballEvent): string {
  const kickoff = event.time ?? ASSUMED_KICKOFF;
  const start = `${event.date.replace(/-/g, '')}T${kickoff.replace(':', '')}00`;
  const endMinutes = toMinutes(kickoff) + 120;
  const endHours = String(Math.floor(endMinutes / 60) % 24).padStart(2, '0');
  const endRest = String(endMinutes % 60).padStart(2, '0');
  const end = `${event.date.replace(/-/g, '')}T${endHours}${endRest}00`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${matchTitle(event)} — ${business.name}`,
    dates: `${start}/${end}`,
    details: `Live te ${business.name}.`,
    location: business.location.label,
    ctz: business.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export const competitionLabels: Record<Competition, string> = {
  'champions-league': 'Champions League',
  'premier-league': 'Premier League',
  'serie-a': 'Serie A',
  albania: 'Shqipëria',
};
