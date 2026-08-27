import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ciaoFavourites } from '../../data/menu';
import { t } from '../../data/strings';
import { DrinkCard } from '../menu/DrinkCard';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

/** On phones the selection scrolls sideways like a shelf; from tablet
 *  up it settles into a grid where every card is visible at once. */
export function Favourites() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={t.favourites.eyebrow}
          title={t.favourites.title}
          caption={t.favourites.caption}
          action={
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 py-2.5 -my-2.5 text-[0.8125rem] text-cream-dim/70 transition-colors duration-300 hover:text-cream"
            >
              {t.favourites.cta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          }
        />
      </Container>

      <Reveal delay={0.08} className="mt-10">
        <ul
          className={
            'no-scrollbar scroll-fade-x flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 ' +
            'sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-8 ' +
            'lg:grid-cols-3 lg:px-12 sm:[mask-image:none]'
          }
        >
          {ciaoFavourites.map((item) => (
            <li key={item.id} className="w-[75vw] max-w-[19rem] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <DrinkCard
                name={item.name}
                meta={item.meta}
                price={item.price}
                description={item.description}
                category={item.category}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
