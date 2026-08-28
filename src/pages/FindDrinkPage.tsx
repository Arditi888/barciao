import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { QuizResult } from '../components/quiz/QuizResult';
import { QuizStep } from '../components/quiz/QuizStep';
import { Container } from '../components/ui/Container';
import { quizQuestions } from '../data/quiz';
import { t } from '../data/strings';
import type { QuizAnswers, QuizAnswerValue } from '../types';
import { recommendDrink } from '../utils/drinkRecommendation';
import { useSeo } from '../hooks/useSeo';

const TOTAL = quizQuestions.length;

export function FindDrinkPage() {
  useSeo(t.seo.findDrink.title, t.seo.findDrink.description);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[step];
  const result = useMemo(() => (finished ? recommendDrink(answers) : null), [finished, answers]);

  const select = (value: QuizAnswerValue) => {
    if (!question) return;

    setAnswers((previous) => ({ ...previous, [question.id]: value }));

    if (step + 1 >= TOTAL) setFinished(true);
    else setStep(step + 1);
  };

  const back = () => {
    if (finished) {
      setFinished(false);
      setStep(TOTAL - 1);
      return;
    }
    setStep((value) => Math.max(0, value - 1));
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setFinished(false);
  };

  const canGoBack = finished || step > 0;

  return (
    <Container size="narrow" className="flex min-h-[100svh] flex-col pt-24 pb-28 sm:pt-32 lg:pt-36 lg:pb-24">
      {!finished ? (
        <QuizProgress current={step + 1} total={TOTAL} />
      ) : (
        <div className="h-px w-full bg-royal" aria-hidden="true" />
      )}

      <div className="flex flex-1 flex-col justify-center py-12 sm:py-16">
        {/* Keyed so each step remounts and re-plays the fade; the DOM
            swap itself is synchronous and never waits on an animation. */}
        <div key={finished ? 'result' : (question?.id ?? 'question')} className="animate-swap-in">
          {finished && result ? (
            <QuizResult result={result} onRestart={restart} />
          ) : question ? (
            <QuizStep question={question} selected={answers[question.id]} onSelect={select} />
          ) : null}
        </div>
      </div>

      {canGoBack ? (
        <div>
          <button
            type="button"
            onClick={back}
            className="group inline-flex items-center gap-2.5 py-3 -my-3 text-[0.8125rem] text-mist/60 transition-colors duration-300 hover:text-cream"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {t.findDrink.back}
          </button>
        </div>
      ) : null}
    </Container>
  );
}
