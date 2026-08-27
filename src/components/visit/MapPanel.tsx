import { ArrowUpRight, MapPin } from 'lucide-react';
import { business, contact, mapsHref } from '../../data/business';
import { t } from '../../data/strings';
import { cx } from '../../utils/format';

/** A drawn street pattern rather than a third-party map embed: no
 *  external request on load, no tracking, and it still lands the
 *  visitor in Google Maps on tap. */
function StreetPattern() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <g stroke="currentColor" strokeWidth="1" fill="none" className="text-cream/[0.07]">
        <path d="M-20 70 L420 40" />
        <path d="M-20 150 L420 128" />
        <path d="M-20 232 L420 218" />
        <path d="M70 -20 L52 320" />
        <path d="M168 -20 L156 320" />
        <path d="M266 -20 L262 320" />
        <path d="M352 -20 L354 320" />
      </g>

      <g stroke="currentColor" strokeWidth="2.5" fill="none" className="text-gold/20">
        <path d="M-20 150 L420 128" />
      </g>

      <g fill="currentColor" className="text-cream/[0.035]">
        <rect x="78" y="52" width="76" height="80" />
        <rect x="180" y="46" width="72" height="86" />
        <rect x="278" y="42" width="64" height="88" />
        <rect x="62" y="150" width="82" height="70" />
        <rect x="170" y="146" width="80" height="72" />
        <rect x="272" y="142" width="76" height="74" />
      </g>
    </svg>
  );
}

export function MapPanel({ className }: { className?: string }) {
  const label = contact.addressLine || contact.addressArea;

  return (
    <a
      href={mapsHref}
      target="_blank"
      rel="noreferrer noopener"
      className={cx(
        'group relative flex min-h-[15rem] flex-col justify-end overflow-hidden rounded-sm',
        'border border-cream/10 bg-ink-800/70 p-6 transition-colors duration-400 hover:border-cream/25',
        className,
      )}
    >
      <StreetPattern />

      {/* Pin, sitting on the highlighted road. */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <span className="animate-status-pulse absolute h-9 w-9 rounded-full bg-gold/25" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-ink/85 text-gold">
          <MapPin className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
        </span>
      </span>

      <div className="relative flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-mute">{business.name}</p>
          <p className="mt-2 text-[0.9375rem] text-cream">{label}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[0.75rem] whitespace-nowrap text-cream-dim/70 transition-colors duration-300 group-hover:text-gold">
          {t.visit.maps}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
