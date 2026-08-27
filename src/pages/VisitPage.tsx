import { contact, hasDirectContact, images } from '../data/business';
import { t } from '../data/strings';
import { Container } from '../components/ui/Container';
import { OpeningStatus } from '../components/ui/OpeningStatus';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { ContactLinks } from '../components/visit/ContactLinks';
import { HoursTable } from '../components/visit/HoursTable';
import { MapPanel } from '../components/visit/MapPanel';
import { useSeo } from '../hooks/useSeo';

export function VisitPage() {
  useSeo(t.seo.visit.title, t.seo.visit.description);

  const address = contact.addressLine || contact.addressArea;

  return (
    <>
      <PageHeader title={t.visit.title} caption={t.visit.caption}>
        <OpeningStatus variant="pill" />
      </PageHeader>

      <Container className="pb-24 lg:pb-28">
        {images.visit ? (
          <Reveal className="mb-5">
            <img
              src={images.visit}
              alt=""
              loading="lazy"
              className="h-56 w-full rounded-sm object-cover sm:h-72 lg:h-96"
            />
          </Reveal>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-5 lg:gap-5">
          <Reveal className="lg:col-span-3">
            <MapPanel className="h-full min-h-[18rem] lg:min-h-[26rem]" />
          </Reveal>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <Reveal delay={0.06}>
              <section className="rounded-sm border border-cream/10 bg-ink-800/70 p-6">
                <h2 className="eyebrow text-gold">{t.visit.hours}</h2>
                <HoursTable className="mt-4" />
              </section>
            </Reveal>

            <Reveal delay={0.12}>
              <section className="rounded-sm border border-cream/10 bg-ink-800/70 p-6">
                <h2 className="eyebrow text-gold">{t.visit.address}</h2>
                <p className="mt-4 text-[0.9375rem] text-cream">{address}</p>
                {!contact.addressLine ? (
                  <p className="mt-2 text-[0.75rem] text-mute">{t.visit.addressPending}</p>
                ) : null}
              </section>
            </Reveal>

            {hasDirectContact ? (
              <Reveal delay={0.18}>
                <section className="rounded-sm border border-cream/10 bg-ink-800/70 px-6 pt-6 pb-2">
                  <h2 className="eyebrow text-gold">{t.visit.contact}</h2>
                  <ContactLinks className="mt-2" includeMaps={false} />
                </section>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </>
  );
}
