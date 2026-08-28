import type { ReactNode } from 'react';
import { cx } from '../../utils/format';
import { Container } from './Container';
import { Reveal } from './Reveal';

interface PageHeaderProps {
  title: string;
  caption?: string;
  /** Slot beneath the caption, e.g. the menu search field. */
  children?: ReactNode;
  className?: string;
}

/** The masthead every inner page opens with — one shape, one rhythm. */
export function PageHeader({ title, caption, children, className }: PageHeaderProps) {
  return (
    <div className={cx('pt-28 pb-8 sm:pt-32 sm:pb-10 lg:pt-40', className)}>
      <Container>
        <Reveal>
          <h1 className="font-display leading-[0.95] tracking-[0.02em] text-cream" style={{ fontSize: 'clamp(2.75rem,12vw,5.5rem)' }}>
            {title}
          </h1>
          {caption ? (
            <p className="mt-4 max-w-prose text-[0.9375rem] text-mist/70">{caption}</p>
          ) : null}
        </Reveal>

        {children ? (
          <Reveal delay={0.08} className="mt-8">
            {children}
          </Reveal>
        ) : null}
      </Container>
    </div>
  );
}
