import React from 'react';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  className = '',
  style,
  ...props
}) => {
  const getVariantStyles = (): { bg: string; text: string; border: string; dotColor: string } => {
    switch (variant) {
      case 'success':
        return {
          bg: 'var(--kui-color-success-surface)',
          text: 'var(--kui-color-success)',
          border: 'var(--kui-color-success-border)',
          dotColor: 'var(--kui-color-success)',
        };
      case 'warning':
        return {
          bg: 'var(--kui-color-warning-surface)',
          text: 'var(--kui-color-warning)',
          border: 'var(--kui-color-warning-border)',
          dotColor: 'var(--kui-color-warning)',
        };
      case 'danger':
        return {
          bg: 'var(--kui-color-danger-surface)',
          text: 'var(--kui-color-danger)',
          border: 'var(--kui-color-danger-border)',
          dotColor: 'var(--kui-color-danger)',
        };
      case 'info':
        return {
          bg: 'var(--kui-color-info-surface)',
          text: 'var(--kui-color-info)',
          border: 'var(--kui-color-info-border)',
          dotColor: 'var(--kui-color-info)',
        };
      case 'neutral':
      default:
        return {
          bg: 'var(--kui-color-surface-subtle)',
          text: 'var(--kui-color-text-secondary)',
          border: 'var(--kui-color-border)',
          dotColor: 'var(--kui-color-text-muted)',
        };
    }
  };

  const colors = getVariantStyles();

  const isSmall = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--kui-space-1)',
        padding: isSmall ? '1px var(--kui-space-2)' : '2px var(--kui-space-2)',
        fontSize: isSmall ? '11px' : 'var(--kui-font-size-xs)',
        fontWeight: 'var(--kui-font-weight-medium)',
        lineHeight: 1.4,
        borderRadius: 'var(--kui-radius-full)',
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        whiteSpace: 'nowrap',
        ...style,
      }}
      className={`kui-badge kui-badge-${variant} kui-badge-${size} ${className}`}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: isSmall ? '5px' : '6px',
            height: isSmall ? '5px' : '6px',
            borderRadius: '50%',
            backgroundColor: colors.dotColor,
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
