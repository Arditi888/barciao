import { RotateCcw } from 'lucide-react';
import { categoryLabel } from '../../data/menu';
import { t } from '../../data/strings';
import type { RecommendationResult } from '../../types';
import { priceParts } from '../../utils/format';
import { DrinkCard } from '../menu/DrinkCard';
import { Button } from '../ui/Button';

interface QuizResultProps {
  result: RecommendationResult;
  onRestart: () => void;
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
  const { item, descriptors } = result.primary;
  const { amount, unit } = priceParts(item.price);

  return (
    <div>
      <p className="eyebrow text-royal-light">
        {result.isLooseMatch ? t.findDrink.looseMatch : t.findDrink.resultEyebrow}
      </p>

      <h1
        className="mt-6 font-display leading-[0.98] tracking-[0.01em] text-balance text-cream"
        style={{ fontSize: 'clamp(2.5rem,11vw,5rem)' }}
      >
        {item.name}
      </h1>

      {descriptors.length > 0 ? (
        <p className="mt-5 text-[0.9375rem] text-mist/75">
          {descriptors.join(' · ')}
        </p>
      ) : null}

      {item.description ? (
        <p className="mt-4 max-w-md text-[0.875rem] leading-relaxed text-mist/60">
          {item.description}
        </p>
      ) : null}

      <div className="mt-8 flex items-baseline gap-2">
        {item.price === null ? (
          <span className="text-[0.9375rem] text-haze">{t.menu.placeholderPrice}</span>
        ) : (
          <>
            <span className="numeric font-display text-[2rem] leading-none text-royal-light">{amount}</span>
            <span className="text-[0.75rem] tracking-[0.12em] text-haze uppercase">{unit}</span>
          </>
        )}
        <span className="ml-3 text-[0.75rem] text-haze">{categoryLabel(item.category)}</span>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button to={`/menu?c=${item.category}`} size="lg">
          {t.findDrink.viewInMenu}
        </Button>
        <Button
          onClick={onRestart}
          variant="secondary"
          size="lg"
          icon={<RotateCcw className="h-4 w-4" strokeWidth={1.5} />}
        >
          {t.findDrink.restart}
        </Button>
      </div>

      {result.alternatives.length > 0 ? (
        <section className="mt-16 border-t border-mist/15 pt-10">
          <h2 className="eyebrow text-haze">{t.findDrink.alternativesTitle}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {result.alternatives.map(({ item: alternative }) => (
              <li key={alternative.id}>
                <DrinkCard
                  name={alternative.name}
                  meta={alternative.subcategory ?? categoryLabel(alternative.category)}
                  price={alternative.price}
                  description={alternative.description}
                  category={alternative.category}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
