import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Wordmark } from '../components/ui/Wordmark';
import { t } from '../data/strings';
import { useSeo } from '../hooks/useSeo';

export function NotFoundPage() {
  useSeo(t.seo.notFound.title, t.seo.notFound.description);

  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <Wordmark className="text-[3rem]" tone="gold" />
      <h1 className="mt-10 font-display text-[clamp(1.75rem,7vw,2.75rem)] leading-tight">
        {t.notFound.title}
      </h1>
      <p className="mt-3 text-[0.9375rem] text-cream-dim/70">{t.notFound.body}</p>
      <Button to="/menu" size="lg" className="mt-10">
        {t.notFound.cta}
      </Button>
    </Container>
  );
}
