import type { ReactNode } from 'react';
import { cx } from '../../utils/format';

/** The one horizontal rhythm used by every section on the site. */
export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  } as const;

  return (
    <div className={cx('mx-auto w-full px-5 sm:px-8 lg:px-12', widths[size], className)}>
      {children}
    </div>
  );
}
