import React from 'react';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  decorative = true,
  className = '',
  style,
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      style={{
        backgroundColor: 'var(--kui-color-border)',
        ...(isHorizontal
          ? {
              width: '100%',
              height: '1px',
              margin: 'var(--kui-space-2) 0',
            }
          : {
              width: '1px',
              height: '100%',
              minHeight: '20px',
              margin: '0 var(--kui-space-2)',
            }),
        flexShrink: 0,
        ...style,
      }}
      className={`kui-separator kui-separator-${orientation} ${className}`}
    />
  );
};
