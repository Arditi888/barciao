import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../utils/format';

type Variant = 'primary' | 'secondary' | 'ghost' | 'quiet';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconEnd?: ReactNode;
  full?: boolean;
}

interface LinkProps extends BaseProps {
  to: string;
  href?: never;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface AnchorProps extends BaseProps {
  href: string;
  to?: never;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ActionProps extends BaseProps {
  onClick: () => void;
  to?: never;
  href?: never;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export type ButtonProps = LinkProps | AnchorProps | ActionProps;

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-xs font-medium ' +
  'tracking-[0.02em] transition-[background-color,color,border-color,opacity] duration-300 ' +
  'ease-[var(--ease-soft)] disabled:pointer-events-none disabled:opacity-40 select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-royal text-white hover:bg-royal-light hover:text-deeper active:bg-royal-light',
  secondary:
    'border border-mist/30 text-cream hover:border-royal-light hover:bg-royal/15 active:bg-royal/25',
  ghost: 'text-cream/70 hover:text-cream',
  quiet: 'bg-royal/15 text-cream hover:bg-royal/25',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.8125rem]',
  md: 'h-12 px-6 text-[0.875rem]',
  lg: 'h-14 px-8 text-[0.9375rem]',
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon,
    iconEnd,
    full,
  } = props;

  const classes = cx(base, variants[variant], sizes[size], full && 'w-full', className);

  const content = (
    <>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
      {iconEnd ? (
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
          {iconEnd}
        </span>
      ) : null}
    </>
  );

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer noopener" className={classes}>
        {content}
      </a>
    );
  }

  const { onClick, type = 'button', disabled } = props as ActionProps;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
