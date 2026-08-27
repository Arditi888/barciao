import { business, closingSoonMinutes, openingHours, weekdayNames } from '../data/business';
import type { OpeningInterval, OpeningStatus, WeekdayIndex } from '../types';

/* ==================================================================
   Opening-hours maths, always evaluated in the bar's own timezone.
   A phone set to another timezone still sees the correct status.
   ================================================================== */

const MINUTES_PER_DAY = 1440;

/** Wall-clock reading of "now" as it would appear on a clock in Tirana. */
interface LocalClock {
  /** 0 = Sunday … 6 = Saturday */
  weekday: WeekdayIndex;
  /** Minutes elapsed since local midnight. */
  minutes: number;
}

const weekdayFromShortName: Record<string, WeekdayIndex> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const clockFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: business.timezone,
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function localClock(now: Date = new Date()): LocalClock {
  const parts = clockFormatter.formatToParts(now);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';

  const weekday = weekdayFromShortName[read('weekday')] ?? (now.getDay() as WeekdayIndex);
  // Some engines render midnight as "24" in the h23-adjacent hour cycle.
  const hour = Number(read('hour')) % 24;
  const minute = Number(read('minute'));

  return { weekday, minutes: hour * 60 + minute };
}

/** The bar's current date in Tirana as `YYYY-MM-DD`. */
const isoFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: business.timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function localISODate(now: Date = new Date()): string {
  return isoFormatter.format(now);
}

export function toMinutes(time: string): number {
  const [hours = '0', minutes = '0'] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
}

export function formatMinutes(minutes: number): string {
  const normalised = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const hours = Math.floor(normalised / 60);
  const rest = normalised % 60;
  return `${String(hours).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

/** Opening minute and closing minute, with past-midnight closes unwrapped. */
function span(interval: OpeningInterval): { open: number; close: number } {
  const open = toMinutes(interval.open);
  let close = toMinutes(interval.close);
  if (close <= open) close += MINUTES_PER_DAY;
  return { open, close };
}

function intervalFor(weekday: number): OpeningInterval | null {
  const index = (((weekday % 7) + 7) % 7) as WeekdayIndex;
  return openingHours[index];
}

function nextOpening(clock: LocalClock): { weekday: number; minutes: number; daysAhead: number } | null {
  for (let offset = 0; offset < 8; offset += 1) {
    const weekday = clock.weekday + offset;
    const interval = intervalFor(weekday);
    if (!interval) continue;

    const { open } = span(interval);
    if (offset === 0 && clock.minutes >= open) continue;

    return { weekday: ((weekday % 7) + 7) % 7, minutes: open, daysAhead: offset };
  }
  return null;
}

export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  const clock = localClock(now);

  // Today's own interval, plus yesterday's in case it runs past midnight.
  const candidates: { open: number; close: number }[] = [];

  const today = intervalFor(clock.weekday);
  if (today) candidates.push(span(today));

  const yesterday = intervalFor(clock.weekday - 1);
  if (yesterday) {
    const shifted = span(yesterday);
    candidates.push({ open: shifted.open - MINUTES_PER_DAY, close: shifted.close - MINUTES_PER_DAY });
  }

  const active = candidates.find(({ open, close }) => clock.minutes >= open && clock.minutes < close);

  if (active) {
    const minutesUntilClose = active.close - clock.minutes;
    const closesAt = formatMinutes(active.close);
    const soon = minutesUntilClose <= closingSoonMinutes;

    return {
      state: soon ? 'closing-soon' : 'open',
      label: soon ? `Mbyllet së shpejti • ${closesAt}` : `Hapur tani • deri në ${closesAt}`,
      closesAt,
      minutesUntilClose,
    };
  }

  const next = nextOpening(clock);
  if (!next) return { state: 'closed', label: 'Mbyllur' };

  const opensAt = formatMinutes(next.minutes);
  const when =
    next.daysAhead === 0 ? 'sot' : next.daysAhead === 1 ? 'nesër' : (weekdayNames[next.weekday] ?? '').toLowerCase();

  return {
    state: 'closed',
    label: `Mbyllur • hapet ${when} ${opensAt}`,
    opensAt,
  };
}

/** Compact variant for the navigation bar, where space is tight. */
export function shortStatusLabel(status: OpeningStatus): string {
  switch (status.state) {
    case 'open':
      return `Hapur • ${status.closesAt}`;
    case 'closing-soon':
      return `Mbyllet ${status.closesAt}`;
    default:
      return 'Mbyllur';
  }
}

/** Today's printed hours in Tirana, e.g. "08:00 – 23:00". */
export function todaysHours(now: Date = new Date()): string | null {
  const interval = intervalFor(localClock(now).weekday);
  return interval ? `${interval.open} – ${interval.close}` : null;
}

/** Index into `weekdayNames` for the bar's current day. */
export function todayIndex(now: Date = new Date()): number {
  return localClock(now).weekday;
}
