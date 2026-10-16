import React from 'react';
import type { ButtonVariant, ButtonSize } from './Button';
import { SpinnerIcon } from '../common/Icons';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  variant = 'secondary',
  size = 'md',
  loading = false,
  icon,
  disabled,
  style,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  const sizeDimensions: Record<ButtonSize, { box: number; iconSize: number; radius: string }> = {
    sm: { box: 30, iconSize: 14, radius: 'var(--kui-radius-sm)' },
    md: { box: 38, iconSize: 16, radius: 'var(--kui-radius-md)' },
    lg: { box: 46, iconSize: 18, radius: 'var(--kui-radius-md)' },
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--kui-color-brand)',
          color: 'var(--kui-color-canvas)',
          border: '1px solid transparent',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--kui-color-surface-subtle)',
          color: 'var(--kui-color-text-primary)',
          border: '1px solid var(--kui-color-border)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--kui-color-text-primary)',
          border: '1px solid var(--kui-color-border-strong)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--kui-color-text-primary)',
          border: '1px solid transparent',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--kui-color-danger)',
          color: '#FFFFFF',
          border: '1px solid transparent',
        };
    }
  };

  const currentSize = sizeDimensions[size];

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={isDisabled}
      aria-busy={loading}
      title={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${currentSize.box}px`,
        height: `${currentSize.box}px`,
        minWidth: `${currentSize.box}px`,
        minHeight: `${currentSize.box}px`,
        borderRadius: currentSize.radius,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition:
          'background-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard), border-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard), color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
        flexShrink: 0,
        ...getVariantStyles(),
        ...style,
      }}
      className={`kui-btn kui-btn-${variant} kui-icon-btn ${className}`}
      {...props}
    >
      {loading ? <SpinnerIcon size={currentSize.iconSize} /> : icon}
    </button>
  );
};
