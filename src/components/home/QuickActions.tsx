import { ArrowUpRight, CalendarDays, Clock, MapPin, Sparkles, UtensilsCrossed } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { mapsHref, weekdayNames } from '../../data/business';
import { t } from '../../data/strings';
import { useOpeningStatus } from '../../hooks/useOpeningStatus';
import { cx } from '../../utils/format';
import { todayIndex, todaysHours } from '../../utils/openingHours';
import { Container } from '../ui/Container';
import { StatusDot } from '../ui/OpeningStatus';
import { Reveal } from '../ui/Reveal';

interface ActionCardProps {
  index: number;
  title: string;
  caption: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  to?: string;
  href?: string;
  className?: string;
  /** Live content rendered in place of the caption, e.g. today's hours. */
  footer?: ReactNode;
}

function ActionCard({
  index,
  title,
  caption,
  icon: Icon,
  to,
  href,
  className,
  footer,
}: ActionCardProps) {
  const inner = (
    <>
      {/* Gold rule that draws itself across the top edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px w-0 bg-gold transition-[width] duration-600 ease-[var(--ease-out-expo)] group-hover:w-full"
      />

      <div className="flex items-start justify-between">
        <Icon className="h-6 w-6 text-gold" strokeWidth={1.25} aria-hidden="true" />
        <span className="numeric eyebrow text-mute">
          {String(index).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-auto pt-10">
        <h3 className="font-display text-[1.5rem] leading-none text-cream transition-colors duration-300 group-hover:text-gold-soft">
          {title}
        </h3>
        {footer ?? (
          <p className="mt-2.5 text-[0.8125rem] leading-snug text-cream-dim/60">{caption}</p>
        )}
      </div>

      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-5 bottom-5 h-4 w-4 text-mute-dim opacity-0 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold group-hover:opacity-100"
      />
    </>
  );

  const classes = cx(
    'group relative flex min-h-[11rem] flex-col overflow-hidden rounded-sm border border-cream/10',
    'bg-ink-800/70 p-5 transition-colors duration-400 hover:border-cream/25 hover:bg-ink-700/70',
    'sm:min-h-[12.5rem] sm:p-6',
    className,
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={to ?? '/'} className={classes}>
      {inner}
    </Link>
  );
}

export function QuickActions() {
  const status = useOpeningStatus();
  const hours = todaysHours();
  const today = weekdayNames[todayIndex()] ?? '';

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <p className="eyebrow text-gold">
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden="true" className="h-px w-6 bg-gold/50" />
              {t.quickActions.eyebrow}
            </span>
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,6vw,2.5rem)] leading-tight">
            {t.quickActions.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          <Reveal className="col-span-2 lg:col-span-3" delay={0}>
            <ActionCard
              index={1}
              title={t.quickActions.menu.title}
              caption={t.quickActions.menu.caption}
              icon={UtensilsCrossed}
              to="/menu"
              className="h-full lg:min-h-[15rem]"
            />
          </Reveal>

          <Reveal className="col-span-2 lg:col-span-3" delay={0.06}>
            <ActionCard
              index={2}
              title={t.quickActions.events.title}
              caption={t.quickActions.events.caption}
              icon={CalendarDays}
              to="/events"
              className="h-full lg:min-h-[15rem]"
            />
          </Reveal>

          <Reveal className="col-span-2 lg:col-span-2" delay={0.12}>
            <ActionCard
              index={3}
              title={t.quickActions.findDrink.title}
              caption={t.quickActions.findDrink.caption}
              icon={Sparkles}
              to="/find-your-drink"
              className="h-full"
            />
          </Reveal>

          <Reveal delay={0.18} className="lg:col-span-2">
            <ActionCard
              index={4}
              title={t.quickActions.hours.title}
              caption={t.quickActions.hours.caption}
              icon={Clock}
              to="/visit"
              className="h-full"
              footer={
                <div className="mt-2.5 space-y-1.5">
                  <p className="numeric text-[0.8125rem] text-cream-dim">
                    {today} · {hours ?? t.status.closed}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[0.6875rem] tracking-[0.08em] text-mute">
                    <StatusDot state={status.state} />
                    {status.state === 'closed' ? t.status.closed : t.status.open}
                  </span>
                </div>
              }
            />
          </Reveal>

          <Reveal delay={0.24} className="lg:col-span-2">
            <ActionCard
              index={5}
              title={t.quickActions.location.title}
              caption={t.quickActions.location.caption}
              icon={MapPin}
              href={mapsHref}
              className="h-full"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
