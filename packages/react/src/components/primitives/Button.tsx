import React from 'react';
import { SpinnerIcon } from '../common/Icons.js';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  children,
  className = '',
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--kui-space-2)',
    fontFamily: 'var(--kui-font-sans)',
    fontWeight: 'var(--kui-font-weight-medium)',
    lineHeight: 1,
    borderRadius: 'var(--kui-radius-md)',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard), border-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard), color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      padding: 'var(--kui-space-1) var(--kui-space-3)',
      fontSize: 'var(--kui-font-size-xs)',
      height: '30px',
      borderRadius: 'var(--kui-radius-sm)',
    },
    md: {
      padding: 'var(--kui-space-2) var(--kui-space-4)',
      fontSize: 'var(--kui-font-size-sm)',
      height: '38px',
      borderRadius: 'var(--kui-radius-md)',
    },
    lg: {
      padding: 'var(--kui-space-3) var(--kui-space-5)',
      fontSize: 'var(--kui-font-size-md)',
      height: '46px',
      borderRadius: 'var(--kui-radius-md)',
    },
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

  return (
    <button
      disabled={isDisabled}
      aria-disabled={isDisabled ? 'true' : undefined}
      aria-busy={loading ? 'true' : undefined}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...getVariantStyles(),
        ...style,
      }}
      className={`kui-btn kui-btn-${variant} kui-btn-${size} ${className}`}
      {...props}
    >
      {loading ? (
        <SpinnerIcon size={size === 'sm' ? 14 : 16} />
      ) : (
        leadingIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{leadingIcon}</span>
      )}
      <span>{children}</span>
      {!loading && trailingIcon && (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>{trailingIcon}</span>
      )}
    </button>
  );
};
