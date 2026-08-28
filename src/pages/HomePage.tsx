import { t } from '../data/strings';
import { CiaoMood } from '../components/home/CiaoMood';
import { Favourites } from '../components/home/Favourites';
import { FindYourDrinkTeaser } from '../components/home/FindYourDrinkTeaser';
import { Hero } from '../components/home/Hero';
import { QuickActions } from '../components/home/QuickActions';
import { FootballAtCiao } from '../components/home/FootballAtCiao';
import { VisitSection } from '../components/home/VisitSection';
import { useSeo } from '../hooks/useSeo';

export function HomePage() {
  useSeo(t.seo.home.title, t.seo.home.description);

  return (
    <>
      <Hero />
      <QuickActions />
      <FootballAtCiao />
      <Favourites />
      <FindYourDrinkTeaser />
      <CiaoMood />
      <VisitSection />
    </>
  );
}
