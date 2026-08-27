import { ArrowDown, ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { business, images } from '../../data/business';
import { t } from '../../data/strings';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { OpeningStatus } from '../ui/OpeningStatus';

/* The hero animates in CSS rather than through the motion library. It
   is the largest paint on the page, so it should never wait on a
   JavaScript chunk to become visible. `prefers-reduced-motion` is
   handled globally in index.css, which collapses these to their end
   state rather than removing them. */

const letters = business.wordmark.split('');

/** Places an element in the intro sequence. */
const enter = (delay: number): CSSProperties => ({ animationDelay: `${delay}ms` });

/** Warm, unlit-room atmosphere built from two soft pools of colour.
 *  Replaced by a photograph as soon as `images.hero` is configured. */
function Atmosphere() {
  if (images.hero) {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={images.hero}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="animate-drift h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="animate-drift absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 46% at 22% 18%, rgba(122,31,51,0.30) 0%, transparent 68%),' +
            'radial-gradient(62% 50% at 84% 74%, rgba(198,161,91,0.20) 0%, transparent 70%)',
        }}
      />
      {/* A low pool of light along the floor, the way a bar reads at night. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            'radial-gradient(80% 100% at 50% 118%, rgba(226,87,31,0.14) 0%, transparent 62%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16 lg:min-h-dvh lg:pt-28">
      <Atmosphere />

      <Container>
        <div className="max-w-4xl">
          <div className="animate-fade-up" style={enter(60)}>
            <OpeningStatus variant="pill" />
          </div>

          <h1
            className="mt-8 font-display leading-[0.86] font-normal tracking-[0.06em] text-cream"
            style={{ fontSize: 'clamp(4.75rem, 24vw, 13rem)' }}
          >
            <span className="sr-only">{business.wordmark}</span>
            <span aria-hidden="true" className="flex">
              {letters.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="animate-fade-up inline-block"
                  style={{
                    ...enter(120 + index * 55),
                    marginRight: index === letters.length - 1 ? 0 : '0.02em',
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-md text-[1.0625rem] leading-relaxed text-cream-dim sm:text-lg"
            style={enter(360)}
          >
            {t.hero.tagline}
          </p>

          <ul className="animate-fade-up mt-7 space-y-1.5" style={enter(420)}>
            {t.hero.lines.map((line) => (
              <li key={line} className="font-display text-[1.0625rem] text-mute italic sm:text-lg">
                {line}
              </li>
            ))}
          </ul>

          <div
            className="animate-fade-up mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={enter(480)}
          >
            <Button
              to="/menu"
              size="lg"
              iconEnd={<ArrowRight className="h-4 w-4" strokeWidth={1.75} />}
            >
              {t.hero.primaryCta}
            </Button>
            <Button to="/events" variant="secondary" size="lg">
              {t.hero.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center lg:flex"
      >
        <span className="flex flex-col items-center gap-2.5 text-mute">
          <span className="eyebrow">{t.hero.scroll}</span>
          <ArrowDown className="h-4 w-4 animate-bounce" strokeWidth={1.25} />
        </span>
      </div>
    </section>
  );
}
