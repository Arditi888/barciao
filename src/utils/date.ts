import { business, monthNames, weekdayNames } from '../data/business';
import type { CiaoEvent, EventBucket } from '../types';
import { localClock, localISODate, toMinutes } from './openingHours';

/* ==================================================================
   Event date logic. Every comparison happens against the bar's local
   date in Tirana, never the visitor's device date.
   ================================================================== */

/** An event stays "on" for this long after its start time before it
 *  counts as past — a 21:00 match should not vanish at 21:01. */
const GRACE_MINUTES = 180;

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

/** Parses `YYYY-MM-DD` into a day number, avoiding timezone drift. */
function toDayNumber(isoDate: string): number {
  const { year, month, day } = parseISODate(isoDate);
  return Date.UTC(year, month, day) / 86_400_000;
}

export function daysFromToday(isoDate: string, now: Date = new Date()): number {
  return toDayNumber(isoDate) - toDayNumber(localISODate(now));
}

export function isPastEvent(event: CiaoEvent, now: Date = new Date()): boolean {
  const offset = daysFromToday(event.date, now);
  if (offset < 0) return true;
  if (offset > 0) return false;
  return localClock(now).minutes > toMinutes(event.time) + GRACE_MINUTES;
}

export function eventBucket(event: CiaoEvent, now: Date = new Date()): EventBucket {
  if (isPastEvent(event, now)) return 'past';

  const offset = daysFromToday(event.date, now);
  if (offset <= 0) return 'today';
  if (offset === 1) return 'tomorrow';
  if (offset <= 7) return 'week';
  return 'later';
}

const bucketLabels: Record<EventBucket, string> = {
  today: 'Sot',
  tomorrow: 'Nesër',
  week: 'Këtë javë',
  later: 'Së shpejti',
  past: 'Ka kaluar',
};

export function bucketLabel(bucket: EventBucket): string {
  return bucketLabels[bucket];
}

/** "E premte, 28 gusht" — or "Sot" / "Nesër" when that reads better. */
export function formatEventDate(event: CiaoEvent, now: Date = new Date()): string {
  const bucket = eventBucket(event, now);
  if (bucket === 'today') return 'Sot';
  if (bucket === 'tomorrow') return 'Nesër';

  return formatLongDate(event.date);
}

function chronological(a: CiaoEvent, b: CiaoEvent): number {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  if (a.time !== b.time) return a.time < b.time ? -1 : 1;
  return a.id.localeCompare(b.id);
}

export function upcomingEvents(events: CiaoEvent[], now: Date = new Date()): CiaoEvent[] {
  return events.filter((event) => !isPastEvent(event, now)).sort(chronological);
}

export function pastEvents(events: CiaoEvent[], now: Date = new Date()): CiaoEvent[] {
  return events.filter((event) => isPastEvent(event, now)).sort((a, b) => chronological(b, a));
}

/** The event to headline on the homepage: tonight's if there is one,
 *  otherwise the next featured event, otherwise simply the next one. */
export function headlineEvent(events: CiaoEvent[], now: Date = new Date()): CiaoEvent | null {
  const upcoming = upcomingEvents(events, now);
  if (upcoming.length === 0) return null;

  return (
    upcoming.find((event) => eventBucket(event, now) === 'today') ??
    upcoming.find((event) => event.featured) ??
    upcoming[0] ??
    null
  );
}

/** Groups upcoming events under their bucket, preserving chronology. */
export function groupByBucket(
  events: CiaoEvent[],
  now: Date = new Date(),
): { bucket: EventBucket; label: string; events: CiaoEvent[] }[] {
  const order: EventBucket[] = ['today', 'tomorrow', 'week', 'later'];

  return order
    .map((bucket) => ({
      bucket,
      label: bucketLabel(bucket),
      events: events.filter((event) => eventBucket(event, now) === bucket),
    }))
    .filter((group) => group.events.length > 0);
}

/** Google Calendar link — no third-party script, just a URL. */
export function calendarUrl(event: CiaoEvent): string {
  const start = `${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00`;
  const endMinutes = toMinutes(event.time) + 120;
  const endHours = String(Math.floor(endMinutes / 60) % 24).padStart(2, '0');
  const endRest = String(endMinutes % 60).padStart(2, '0');
  const end = `${event.date.replace(/-/g, '')}T${endHours}${endRest}00`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} — ${business.name}`,
    dates: `${start}/${end}`,
    details: event.description ?? '',
    location: business.name,
    ctz: business.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
