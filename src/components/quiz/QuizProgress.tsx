import { t } from '../../data/strings';

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="eyebrow text-gold">{t.findDrink.eyebrow}</p>
        <p className="numeric eyebrow text-mute" aria-live="polite">
          {t.findDrink.progress(current, total)}
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={t.findDrink.eyebrow}
        className="mt-4 flex gap-1.5"
      >
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={
              'h-px flex-1 transition-colors duration-500 ' +
              (index < current ? 'bg-gold' : 'bg-cream/12')
            }
          />
        ))}
      </div>
    </div>
  );
}
