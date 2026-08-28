import { business, contact, openingHours } from '../data/business';
import { t } from '../data/strings';
import type { OpeningHours, WeekdayIndex } from '../types';

/* ==================================================================
   schema.org markup for the bar, generated from the same
   configuration the site renders — so the hours a search engine sees
   can never drift from the hours on the page.
   ================================================================== */

const schemaDays: Record<WeekdayIndex, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

function hoursSpecification(hours: OpeningHours) {
  return (Object.keys(schemaDays) as unknown as WeekdayIndex[])
    .map(Number)
    .flatMap((day) => {
      const interval = hours[day as WeekdayIndex];
      if (!interval) return [];

      return [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${schemaDays[day as WeekdayIndex]}`,
          opens: interval.open,
          closes: interval.close === '00:00' ? '23:59' : interval.close,
        },
      ];
    });
}

function buildSchema(): Record<string, unknown> {
  const sameAs = [contact.instagram, contact.facebook].filter(Boolean);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BarOrCafe',
    name: business.name,
    description: t.seo.home.description,
    address: {
      '@type': 'PostalAddress',
      ...(contact.addressLine ? { streetAddress: contact.addressLine } : {}),
      addressLocality: business.city,
      addressCountry: 'AL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.location.latitude,
      longitude: business.location.longitude,
    },
    hasMap: business.location.googleMapsUrl,
    openingHoursSpecification: hoursSpecification(openingHours),
    url: window.location.href.split('#')[0],
  };

  if (contact.phone) schema.telephone = contact.phone;
  if (sameAs.length > 0) schema.sameAs = sameAs;

  return schema;
}

export function injectStructuredData(): void {
  const id = 'ciao-structured-data';
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(buildSchema());
  document.head.appendChild(script);
}
