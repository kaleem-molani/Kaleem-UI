import React from 'react';
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckIcon,
  InfoIcon,
  XIcon,
} from '../common/Icons.js';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface InlineAlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const InlineAlert: React.FC<InlineAlertProps> = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  action,
  className = '',
  style,
}) => {
  const getVariantConfig = () => {
    switch (variant) {
      case 'success':
        return {
          icon: <CheckIcon size={16} />,
          bg: 'var(--kui-color-success-surface)',
          border: 'var(--kui-color-success-border)',
          fg: 'var(--kui-color-success)',
          role: 'status' as const,
        };
      case 'warning':
        return {
          icon: <AlertTriangleIcon size={16} />,
          bg: 'var(--kui-color-warning-surface)',
          border: 'var(--kui-color-warning-border)',
          fg: 'var(--kui-color-warning)',
          role: 'alert' as const,
        };
      case 'danger':
        return {
          icon: <AlertCircleIcon size={16} />,
          bg: 'var(--kui-color-danger-surface)',
          border: 'var(--kui-color-danger-border)',
          fg: 'var(--kui-color-danger)',
          role: 'alert' as const,
        };
      case 'info':
      default:
        return {
          icon: <InfoIcon size={16} />,
          bg: 'var(--kui-color-info-surface)',
          border: 'var(--kui-color-info-border)',
          fg: 'var(--kui-color-info)',
          role: 'status' as const,
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div
      role={config.role}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--kui-space-3)',
        padding: 'var(--kui-space-3) var(--kui-space-4)',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: 'var(--kui-radius-md)',
        color: 'var(--kui-color-text-primary)',
        fontSize: 'var(--kui-font-size-sm)',
        lineHeight: 'var(--kui-line-height-normal)',
        ...style,
      }}
      className={`kui-alert kui-alert-${variant} ${className}`}
    >
      <div style={{ color: config.fg, flexShrink: 0, marginTop: '2px', display: 'flex' }}>
        {config.icon}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)' }}>
        {title && (
          <span style={{ fontWeight: 'var(--kui-font-weight-semibold)', fontSize: 'var(--kui-font-size-sm)', color: 'var(--kui-color-text-primary)' }}>
            {title}
          </span>
        )}
        <div style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-secondary)' }}>
          {children}
        </div>
        {action && <div style={{ marginTop: 'var(--kui-space-2)' }}>{action}</div>}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          style={{
            color: 'var(--kui-color-text-muted)',
            padding: '2px',
            borderRadius: 'var(--kui-radius-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
};
