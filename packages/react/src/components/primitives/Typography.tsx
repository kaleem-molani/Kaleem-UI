import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'display' | 'title' | 'section' | 'subsection';
  color?: 'primary' | 'secondary' | 'brand' | 'inherit';
  children?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  as,
  variant = 'title',
  color = 'primary',
  style,
  children,
  ...props
}) => {
  const Component = as || (variant === 'display' ? 'h1' : variant === 'title' ? 'h2' : variant === 'section' ? 'h3' : 'h4');

  const variantStyles: Record<NonNullable<HeadingProps['variant']>, React.CSSProperties> = {
    display: {
      fontSize: 'var(--kui-font-size-3xl)',
      lineHeight: 'var(--kui-line-height-tight)',
      letterSpacing: 'var(--kui-letter-spacing-tight)',
      fontWeight: 'var(--kui-font-weight-bold)',
    },
    title: {
      fontSize: 'var(--kui-font-size-2xl)',
      lineHeight: 'var(--kui-line-height-heading)',
      letterSpacing: 'var(--kui-letter-spacing-tight)',
      fontWeight: 'var(--kui-font-weight-semibold)',
    },
    section: {
      fontSize: 'var(--kui-font-size-xl)',
      lineHeight: 'var(--kui-line-height-heading)',
      letterSpacing: 'var(--kui-letter-spacing-tight)',
      fontWeight: 'var(--kui-font-weight-semibold)',
    },
    subsection: {
      fontSize: 'var(--kui-font-size-md)',
      lineHeight: 'var(--kui-line-height-heading)',
      letterSpacing: 'var(--kui-letter-spacing-normal)',
      fontWeight: 'var(--kui-font-weight-semibold)',
    },
  };

  const colorStyles: Record<NonNullable<HeadingProps['color']>, string> = {
    primary: 'var(--kui-color-text-primary)',
    secondary: 'var(--kui-color-text-secondary)',
    brand: 'var(--kui-color-brand)',
    inherit: 'inherit',
  };

  return (
    <Component
      style={{
        margin: 0,
        fontFamily: 'var(--kui-font-sans)',
        color: colorStyles[color],
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'small' | 'code';
  variant?: 'body' | 'caption' | 'code' | 'label';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'muted-accessible' | 'brand' | 'inherit';
  children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as,
  variant = 'body',
  size,
  weight,
  color,
  style,
  children,
  ...props
}) => {
  const Component = as || (variant === 'code' ? 'code' : 'p');

  const resolvedColor = color
    ? color === 'primary'
      ? 'var(--kui-color-text-primary)'
      : color === 'secondary'
        ? 'var(--kui-color-text-secondary)'
        : color === 'muted'
          ? 'var(--kui-color-text-muted)'
          : color === 'muted-accessible'
            ? 'var(--kui-color-text-muted-accessible)'
            : color === 'brand'
              ? 'var(--kui-color-brand)'
              : 'inherit'
    : variant === 'caption'
      ? 'var(--kui-color-text-muted-accessible)'
      : variant === 'body'
        ? 'var(--kui-color-text-secondary)'
        : 'var(--kui-color-text-primary)';

  const resolvedSize = size
    ? `var(--kui-font-size-${size})`
    : variant === 'caption' || variant === 'code'
      ? 'var(--kui-font-size-xs)'
      : 'var(--kui-font-size-sm)';

  const resolvedWeight = weight
    ? `var(--kui-font-weight-${weight})`
    : variant === 'label'
      ? 'var(--kui-font-weight-medium)'
      : 'var(--kui-font-weight-regular)';

  const codeStyles: React.CSSProperties = variant === 'code' ? {
    fontFamily: 'var(--kui-font-mono)',
    backgroundColor: 'var(--kui-color-surface-subtle)',
    padding: '2px 6px',
    borderRadius: 'var(--kui-radius-sm)',
    border: '1px solid var(--kui-color-border)',
  } : {};

  return (
    <Component
      style={{
        margin: 0,
        fontFamily: variant === 'code' ? 'var(--kui-font-mono)' : 'var(--kui-font-sans)',
        fontSize: resolvedSize,
        fontWeight: resolvedWeight,
        lineHeight: variant === 'code' ? 'var(--kui-line-height-tight)' : 'var(--kui-line-height-normal)',
        color: resolvedColor,
        ...codeStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
