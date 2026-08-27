import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contact } from '../../data/business';
import { t } from '../../data/strings';
import { Container } from '../ui/Container';
import { OpeningStatus } from '../ui/OpeningStatus';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { ContactLinks } from '../visit/ContactLinks';
import { HoursTable } from '../visit/HoursTable';
import { MapPanel } from '../visit/MapPanel';

export function VisitSection() {
  return (
    <section className="border-t border-cream/10 bg-ink-900/60 py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={t.visit.eyebrow}
          title={t.visit.title}
          caption={contact.addressLine ? undefined : t.visit.addressPending}
          action={
            <Link
              to="/visit"
              className="group inline-flex items-center gap-2 py-2.5 -my-2.5 text-[0.8125rem] text-cream-dim/70 transition-colors duration-300 hover:text-cream"
            >
              {t.nav.visit}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
          <Reveal className="lg:col-span-2">
            <MapPanel className="h-full min-h-[17rem]" />
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-4">
            <div className="rounded-sm border border-cream/10 bg-ink-800/70 p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="eyebrow text-mute">{t.visit.hours}</h3>
                <OpeningStatus variant="block" className="text-[0.75rem]" />
              </div>
              <HoursTable className="mt-4" />
            </div>

            <div className="rounded-sm border border-cream/10 bg-ink-800/70 px-6 py-2">
              <ContactLinks />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
