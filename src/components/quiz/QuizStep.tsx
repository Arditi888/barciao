import type { QuizAnswerValue, QuizQuestion } from '../../types';
import { cx } from '../../utils/format';

interface QuizStepProps {
  question: QuizQuestion;
  selected?: QuizAnswerValue;
  onSelect: (value: QuizAnswerValue) => void;
}

/** One question per screen. Choosing an option advances immediately —
 *  no confirm step, no scrolling to a submit button. */
export function QuizStep({ question, selected, onSelect }: QuizStepProps) {
  const headingId = `quiz-question-${question.id}`;

  return (
    <div>
      <h1
        id={headingId}
        className="font-display leading-[1.06] text-balance text-cream"
        style={{ fontSize: 'clamp(2rem,8vw,3.25rem)' }}
      >
        {question.question}
      </h1>

      {question.caption ? (
        <p className="mt-4 text-[0.9375rem] text-mist/70">{question.caption}</p>
      ) : null}

      <div role="group" aria-labelledby={headingId} className="mt-10 grid gap-2.5 sm:grid-cols-2">
        {question.options.map((option) => {
          const isSelected = option.value === selected;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
              className={cx(
                'group relative flex min-h-[4.5rem] flex-col justify-center gap-1 overflow-hidden',
                'rounded-sm border px-5 py-4 text-left transition-colors duration-300',
                isSelected
                  ? 'border-royal/60 bg-royal/10'
                  : 'border-mist/18 bg-surface/60 hover:border-mist/35 hover:bg-surface-2/60',
              )}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px bg-royal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 scale-y-0 origin-center"
              />
              <span
                className={cx(
                  'text-[1rem] transition-colors duration-300',
                  isSelected ? 'text-royal-light' : 'text-cream',
                )}
              >
                {option.label}
              </span>
              {option.hint ? (
                <span className="text-[0.75rem] text-haze">{option.hint}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
