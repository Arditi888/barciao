import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../utils/format';

type RevealTag = 'div' | 'section' | 'li' | 'article' | 'header';

interface RevealProps {
  children: ReactNode;
  /** Seconds. Stagger siblings by passing 0.06, 0.12, … */
  delay?: number;
  className?: string;
  as?: RevealTag;
}

/** Older engines without the observer get the content immediately. */
const canObserve = typeof IntersectionObserver !== 'undefined';

/** Fades content up the first time it scrolls into view.
 *
 *  The trigger is an IntersectionObserver and the movement is a CSS
 *  transition, so revealing content depends on an event rather than on
 *  a running animation loop. `prefers-reduced-motion` is handled
 *  globally in index.css, which collapses the transition to nothing. */
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(!canObserve);

  const attachRef = useCallback((element: HTMLElement | null) => setNode(element), []);

  useEffect(() => {
    if (!node || shown) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-64px 0px -64px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, shown]);

  return (
    <Tag
      ref={attachRef}
      className={cx('reveal', shown && 'reveal-shown', className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
