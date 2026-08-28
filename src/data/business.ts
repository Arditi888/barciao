import type { OpeningHours } from '../types';

/* ==================================================================
   BAR CIAO — BUSINESS CONFIGURATION
   This is the only file that needs editing for hours, address and
   contact details. Nothing here is duplicated anywhere in the UI.
   ================================================================== */

export const business = {
  name: 'Bar Ciao',
  wordmark: 'CIAO',
  tagline: 'Bar • Tirana',
  city: 'Tiranë',
  country: 'Shqipëri',

  /** All opening-hour maths is done in this zone, never the device's. */
  timezone: 'Europe/Tirane',

  /** Prices across the site are printed in this currency. */
  currency: 'Lek',

  /* ----------------------------------------------------------------
     THE REAL LOCATION
     Every map link, directions button and address line on the site is
     built from these three values. Nothing else hard-codes a position.
     ---------------------------------------------------------------- */
  location: {
    latitude: 41.3228941,
    longitude: 19.8100468,
    googleMapsUrl: 'https://maps.app.goo.gl/1QGf1qvdp9FnW6HT6',
    /** Shown wherever an address would go. The exact street address is
     *  not published, so the bar's name and city stand in for it. */
    label: 'Bar Ciao • Tirana',
  },
} as const;

/** Opens the bar's own Google Maps place page. */
export const mapsHref: string = business.location.googleMapsUrl;

/** Opens Google Maps directions straight to the bar. */
export const directionsHref: string =
  `https://www.google.com/maps/dir/?api=1&destination=${business.location.latitude},${business.location.longitude}`;

/* ------------------------------------------------------------------
   CONTACT & LOCATION
   Leave a value as an empty string and the UI hides that row entirely
   — nothing renders as a dead link or a broken button.
   ------------------------------------------------------------------ */
export interface ContactConfig {
  /** Optional street address. Left empty, the site shows
   *  `business.location.label` instead. */
  addressLine: string;
  addressArea: string;
  instagram: string;
  facebook: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export const contact: ContactConfig = {
  addressLine: '',
  addressArea: 'Tiranë, Shqipëri',
  instagram: '',
  facebook: '',
  phone: '',
  whatsapp: '',
  email: '',
};

/** True when the bar has a channel someone can actually reach it on,
 *  as opposed to just a location on a map. */
export const hasDirectContact = Boolean(contact.instagram || contact.phone || contact.whatsapp);

/* ------------------------------------------------------------------
   OPENING HOURS
   0 = Sunday … 6 = Saturday. Use null for a closed day.
   A close time of "00:00" means midnight at the end of that day.
   ------------------------------------------------------------------ */
export const openingHours: OpeningHours = {
  0: { open: '09:00', close: '22:00' },
  1: { open: '08:00', close: '23:00' },
  2: { open: '08:00', close: '23:00' },
  3: { open: '08:00', close: '23:00' },
  4: { open: '08:00', close: '23:00' },
  5: { open: '08:00', close: '23:00' },
  6: { open: '09:00', close: '00:00' },
};

/** How long before closing the status switches to "closing soon". */
export const closingSoonMinutes = 45;

/** Day names in Albanian, indexed to match `Date.getDay()`. */
export const weekdayNames: readonly string[] = [
  'E diel',
  'E hënë',
  'E martë',
  'E mërkurë',
  'E enjte',
  'E premte',
  'E shtunë',
];

/** Month names in Albanian, indexed 0-11 to match `Date.getMonth()`.
 *  Kept here rather than left to `Intl`, because Albanian locale data
 *  is missing on plenty of devices and silently falls back to English. */
export const monthNames: readonly string[] = [
  'janar',
  'shkurt',
  'mars',
  'prill',
  'maj',
  'qershor',
  'korrik',
  'gusht',
  'shtator',
  'tetor',
  'nëntor',
  'dhjetor',
];

/** Consecutive days sharing identical hours are grouped into one row. */
export interface HoursRow {
  label: string;
  hours: string;
  /** Weekday indices covered by this row — used to highlight today. */
  days: number[];
}

export function groupedOpeningHours(): HoursRow[] {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows: HoursRow[] = [];

  for (const day of order) {
    const interval = openingHours[day as keyof OpeningHours];
    const hours = interval ? `${interval.open} – ${interval.close}` : 'Mbyllur';
    const previous = rows[rows.length - 1];

    if (previous && previous.hours === hours) {
      previous.days.push(day);
      const first = previous.days[0] ?? day;
      previous.label = `${weekdayNames[first]} – ${weekdayNames[day]}`;
      continue;
    }

    rows.push({ label: weekdayNames[day] ?? '', hours, days: [day] });
  }

  return rows;
}

/* ------------------------------------------------------------------
   IMAGERY
   Drop a file into public/images/… and reference it here. Every value
   is optional: when a path is empty the component renders its
   designed fallback instead of a broken image.
   ------------------------------------------------------------------ */
export interface ImageConfig {
  /** Behind the homepage hero, e.g. '/images/hero/bar-night.jpg'. */
  hero: string;
  /** Wide shot used on the Visit page, e.g. '/images/bar/room.jpg'. */
  visit: string;
}

export const images: ImageConfig = {
  hero: '',
  visit: '',
};
