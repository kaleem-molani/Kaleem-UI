import React from 'react';

export interface KbdProps {
  children?: React.ReactNode;
  keys?: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export const Kbd: React.FC<KbdProps> = ({
  children,
  keys,
  size = 'md',
  className = '',
  style,
}) => {
  const fontSizes: Record<'sm' | 'md' | 'lg', string> = {
    sm: '0.6875rem', /* 11px */
    md: '0.75rem',   /* 12px */
    lg: '0.875rem',  /* 14px */
  };

  const paddings: Record<'sm' | 'md' | 'lg', string> = {
    sm: '1px 4px',
    md: '2px 6px',
    lg: '3px 8px',
  };

  const renderKey = (keyContent: React.ReactNode, index?: number) => (
    <kbd
      key={index}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: size === 'sm' ? '18px' : size === 'lg' ? '24px' : '20px',
        padding: paddings[size],
        fontSize: fontSizes[size],
        fontFamily: 'var(--kui-font-mono)',
        fontWeight: 'var(--kui-font-weight-medium)',
        lineHeight: 1.2,
        color: 'var(--kui-color-text-secondary)',
        backgroundColor: 'var(--kui-color-surface-subtle)',
        border: '1px solid var(--kui-color-border-strong)',
        borderBottom: '2px solid var(--kui-color-border-strong)',
        borderRadius: 'var(--kui-radius-sm)',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.08)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        ...style,
      }}
      className={`kui-kbd ${className}`}
    >
      {keyContent}
    </kbd>
  );

  if (keys && keys.length > 0) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        {keys.map((k, idx) => renderKey(k, idx))}
      </span>
    );
  }

  return renderKey(children);
};
