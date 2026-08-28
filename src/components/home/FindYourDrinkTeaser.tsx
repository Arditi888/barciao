import { Sparkles } from 'lucide-react';
import { quizQuestions } from '../../data/quiz';
import { t } from '../../data/strings';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

/** Real option labels from the quiz, used as decoration so the
 *  section shows what the experience actually asks. */
function optionRow(questionId: string): string[] {
  return quizQuestions.find((question) => question.id === questionId)?.options.map((o) => o.label) ?? [];
}

function ChipRow({ labels, className }: { labels: string[]; className?: string }) {
  return (
    <ul
      aria-hidden="true"
      className={`flex flex-nowrap justify-center gap-2.5 ${className ?? ''}`}
    >
      {labels.map((label) => (
        <li
          key={label}
          className="shrink-0 rounded-xs border border-mist/18 px-3.5 py-2 text-[0.75rem] whitespace-nowrap text-mist/65"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export function FindYourDrinkTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-mist/15 bg-deeper/60 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(52% 60% at 50% 46%, rgba(65,105,225,0.35) 0%, transparent 70%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 [mask-image:linear-gradient(to_right,transparent,#000_18%,#000_82%,transparent)]"
      >
        <ChipRow labels={optionRow('mood')} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-12 [mask-image:linear-gradient(to_right,transparent,#000_18%,#000_82%,transparent)]"
      >
        <ChipRow labels={optionRow('flavour')} />
      </div>

      <Container size="narrow">
        <Reveal className="relative py-16 text-center sm:py-20">
          <span className="inline-flex items-center gap-2.5 text-royal-light">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            <span className="eyebrow">{t.findDrink.eyebrow}</span>
          </span>

          <h2 className="mx-auto mt-6 max-w-xl font-display text-[clamp(2rem,8vw,3.25rem)] leading-[1.05] text-balance">
            {t.findDrink.title}
          </h2>

          <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-mist/75">
            {t.findDrink.caption}
          </p>

          <Button to="/find-your-drink" size="lg" className="mt-10">
            {t.findDrink.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
