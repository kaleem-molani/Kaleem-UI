import React from 'react';

export interface FormSectionProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'card' | 'plain' | 'inset';
  columns?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  icon,
  badge,
  children,
  variant = 'card',
  columns = 1,
  className = '',
  style,
}) => {
  const isCard = variant === 'card';
  const isInset = variant === 'inset';

  return (
    <div
      className={`kui-form-section kui-form-section-${variant} ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-3)',
        padding: isCard || isInset ? 'var(--kui-space-4)' : 0,
        backgroundColor: isCard
          ? 'var(--kui-color-surface-subtle)'
          : isInset
          ? 'var(--kui-color-canvas)'
          : 'transparent',
        border: isCard || isInset ? '1px solid var(--kui-color-border)' : 'none',
        borderRadius: isCard || isInset ? 'var(--kui-radius-lg)' : 0,
        boxSizing: 'border-box',
        width: '100%',
        ...style,
      }}
    >
      {(title || description || icon || badge) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--kui-space-2)',
            paddingBottom: isCard || isInset ? 'var(--kui-space-2)' : 0,
            borderBottom: isCard || isInset ? '1px solid var(--kui-color-border)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
            {icon && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--kui-radius-sm)',
                  backgroundColor: 'var(--kui-color-surface)',
                  border: '1px solid var(--kui-color-border)',
                  color: 'var(--kui-color-brand-primary)',
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h4
                  style={{
                    margin: 0,
                    fontSize: 'var(--kui-font-size-sm)',
                    fontWeight: 'var(--kui-font-weight-semibold)',
                    color: 'var(--kui-color-text-primary)',
                    fontFamily: 'var(--kui-font-sans)',
                  }}
                >
                  {title}
                </h4>
              )}
              {description && (
                <p
                  style={{
                    margin: '2px 0 0 0',
                    fontSize: 'var(--kui-font-size-xs)',
                    color: 'var(--kui-color-text-muted)',
                    fontFamily: 'var(--kui-font-sans)',
                  }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: columns > 1 ? `repeat(${columns}, minmax(0, 1fr))` : '1fr',
          gap: 'var(--kui-space-3)',
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};
