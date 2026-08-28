import { AtSign, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import type { ComponentType } from 'react';
import { business, contact, directionsHref, mapsHref } from '../../data/business';
import { t } from '../../data/strings';
import { cx } from '../../utils/format';

interface Row {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}

/** Only configured channels appear — nothing renders as a dead link. */
function buildRows(includeMaps: boolean): Row[] {
  const rows: Row[] = [];

  if (includeMaps) {
    rows.push({
      key: 'maps',
      label: t.visit.maps,
      value: contact.addressLine || business.location.label,
      href: mapsHref,
      icon: MapPin,
    });

    rows.push({
      key: 'directions',
      label: t.visit.directions,
      value: business.city,
      href: directionsHref,
      icon: Navigation,
    });
  }

  if (contact.instagram) {
    rows.push({
      key: 'instagram',
      label: t.visit.instagram,
      value: contact.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, ''),
      href: contact.instagram,
      icon: AtSign,
    });
  }

  if (contact.phone) {
    rows.push({
      key: 'phone',
      label: t.visit.phone,
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, '')}`,
      icon: Phone,
    });
  }

  if (contact.whatsapp) {
    rows.push({
      key: 'whatsapp',
      label: t.visit.whatsapp,
      value: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`,
      icon: MessageCircle,
    });
  }

  return rows;
}

interface ContactLinksProps {
  className?: string;
  /** The Visit page shows the address separately, so it opts out. */
  includeMaps?: boolean;
}

export function ContactLinks({ className, includeMaps = true }: ContactLinksProps) {
  const rows = buildRows(includeMaps);

  return (
    <ul className={cx('divide-y divide-mist/12', className)}>
      {rows.map((row) => (
        <li key={row.key}>
          <a
            href={row.href}
            target={row.href.startsWith('http') ? '_blank' : undefined}
            rel={row.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            className="group flex items-center gap-4 py-4 transition-colors duration-300"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border border-mist/18 text-mist transition-colors duration-300 group-hover:border-royal/50 group-hover:text-royal-light">
              <row.icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.5} aria-hidden="true" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[0.8125rem] text-cream transition-colors duration-300 group-hover:text-royal-light">
                {row.label}
              </span>
              <span className="mt-0.5 block truncate text-[0.75rem] text-haze">{row.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
