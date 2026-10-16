import React, { useState, useId, useRef } from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();
  const timeoutRef = useRef<number | null>(null);

  const show = () => {
    timeoutRef.current = window.setTimeout(() => setIsVisible(true), 120);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const placementStyles: Record<NonNullable<TooltipProps['placement']>, React.CSSProperties> = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 'var(--kui-space-1)',
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 'var(--kui-space-1)',
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 'var(--kui-space-1)',
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 'var(--kui-space-1)',
    },
  };

  const childProps = children.props || {};

  const clonedChild = React.cloneElement(children, {
    'aria-describedby': isVisible ? id : childProps['aria-describedby'],
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      show();
      childProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hide();
      childProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      show();
      childProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      hide();
      childProps.onBlur?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Escape') {
        hide();
      }
      childProps.onKeyDown?.(e);
    },
  });

  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      {clonedChild}
      {isVisible && (
        <span
          id={id}
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 100,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            backgroundColor: 'var(--kui-color-surface-elevated)',
            color: 'var(--kui-color-text-primary)',
            fontSize: 'var(--kui-font-size-xs)',
            fontWeight: 'var(--kui-font-weight-medium)',
            padding: '4px 8px',
            borderRadius: 'var(--kui-radius-sm)',
            border: '1px solid var(--kui-color-border)',
            boxShadow: 'var(--kui-shadow-md)',
            lineHeight: 'var(--kui-line-height-tight)',
            ...placementStyles[placement],
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
};
