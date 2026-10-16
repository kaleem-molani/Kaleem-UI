import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'plain' | 'bordered' | 'elevated';
  padding?: 0 | 2 | 3 | 4 | 5 | 6;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  as?: 'div' | 'article' | 'section';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'bordered',
  padding = 4,
  header,
  footer,
  as: Component = 'div',
  style,
  children,
  ...props
}) => {
  const variantStyles: Record<NonNullable<CardProps['variant']>, React.CSSProperties> = {
    plain: {
      backgroundColor: 'transparent',
      border: 'none',
    },
    bordered: {
      backgroundColor: 'var(--kui-color-surface)',
      border: '1px solid var(--kui-color-border)',
      boxShadow: 'var(--kui-shadow-sm)',
    },
    elevated: {
      backgroundColor: 'var(--kui-color-surface)',
      border: '1px solid var(--kui-color-border)',
      boxShadow: 'var(--kui-shadow-md)',
    },
  };

  const padStyle = padding > 0 ? `var(--kui-space-${padding})` : 0;

  return (
    <Component
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--kui-radius-md)',
        overflow: 'hidden',
        color: 'var(--kui-color-text-primary)',
        fontFamily: 'var(--kui-font-sans)',
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {header && (
        <div
          style={{
            padding: padStyle,
            borderBottom: '1px solid var(--kui-color-border)',
          }}
        >
          {header}
        </div>
      )}
      <div style={{ padding: padStyle, flex: 1 }}>{children}</div>
      {footer && (
        <div
          style={{
            padding: padStyle,
            borderTop: '1px solid var(--kui-color-border)',
            backgroundColor: 'var(--kui-color-surface-subtle)',
          }}
        >
          {footer}
        </div>
      )}
    </Component>
  );
};
