import { business } from '../../data/business';
import { t } from '../../data/strings';
import { cx } from '../../utils/format';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

/** The brand beat of the page: six lines that say what the room feels
 *  like, set against an oversized ghost of the wordmark. */
export function CiaoMood() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] bottom-[-6%] font-display leading-none tracking-[0.08em] text-cream/[0.028] select-none"
        style={{ fontSize: 'clamp(11rem,34vw,26rem)' }}
      >
        {business.wordmark}
      </span>

      <Container>
        <Reveal>
          <p className="eyebrow text-gold">
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden="true" className="h-px w-6 bg-gold/50" />
              {t.mood.eyebrow}
            </span>
          </p>
        </Reveal>

        <ul className="mt-12 space-y-3 sm:space-y-4">
          {t.mood.lines.map((line, index) => (
            <Reveal as="li" key={line} delay={index * 0.07}>
              <span
                className={cx(
                  'font-display leading-[1.12] text-balance',
                  index % 2 === 1 ? 'text-cream-dim/70' : 'text-cream',
                )}
                style={{ fontSize: 'clamp(1.75rem,7.5vw,3.5rem)' }}
              >
                {line}
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-14">
          <p className="font-display text-[clamp(1.25rem,5vw,2rem)] text-gold italic">
            {t.mood.closing}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
