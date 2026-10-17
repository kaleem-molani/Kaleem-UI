import React, { useEffect, useRef, useId } from 'react';
import { XIcon } from '../common/Icons.js';
import { IconButton } from './IconButton.js';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  icon,
  badge,
  children,
  actions,
  footer,
  size = 'md',
  className = '',
  style,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  const effectiveFooter = footer || actions;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const maxSizes: Record<NonNullable<DialogProps['size']>, string> = {
    sm: '420px',
    md: '560px',
    lg: '740px',
    xl: '920px',
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      style={{
        margin: 'auto',
        padding: 0,
        width: 'calc(100% - var(--kui-space-8))',
        maxWidth: maxSizes[size],
        maxHeight: 'min(90vh, 780px)',
        backgroundColor: 'var(--kui-color-surface)',
        borderRadius: 'var(--kui-radius-lg)',
        border: '1px solid var(--kui-color-border)',
        boxShadow: 'var(--kui-shadow-lg), 0 0 0 1px var(--kui-color-border)',
        color: 'var(--kui-color-text-primary)',
        fontFamily: 'var(--kui-font-sans)',
        overflow: 'hidden',
        display: open ? 'flex' : 'none',
        flexDirection: 'column',
        animation: 'kui-scale-in 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      className={`kui-dialog ${className}`}
    >
      {/* Sticky Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--kui-space-3)',
          padding: 'var(--kui-space-4) var(--kui-space-5)',
          borderBottom: '1px solid var(--kui-color-border)',
          backgroundColor: 'var(--kui-color-surface)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--kui-space-3)', minWidth: 0 }}>
          {icon && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--kui-radius-md)',
                backgroundColor: 'var(--kui-color-surface-subtle)',
                border: '1px solid var(--kui-color-border)',
                color: 'var(--kui-color-brand-primary)',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              {icon}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flexWrap: 'wrap' }}>
              <h2
                id={titleId}
                style={{
                  margin: 0,
                  fontSize: 'var(--kui-font-size-md)',
                  fontWeight: 'var(--kui-font-weight-semibold)',
                  color: 'var(--kui-color-text-primary)',
                  lineHeight: 'var(--kui-line-height-heading)',
                }}
              >
                {title}
              </h2>
              {badge && <div>{badge}</div>}
            </div>
            {description && (
              <p
                id={descId}
                style={{
                  margin: 'var(--kui-space-1) 0 0 0',
                  fontSize: 'var(--kui-font-size-xs)',
                  color: 'var(--kui-color-text-secondary)',
                  lineHeight: 'var(--kui-line-height-normal)',
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        <IconButton
          size="sm"
          variant="ghost"
          aria-label="Close dialog"
          icon={<XIcon size={16} />}
          onClick={onClose}
        />
      </div>

      {/* Scrollable Content Body */}
      {children && (
        <div
          className="kui-scrollbar-subtle"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--kui-space-5)',
            fontSize: 'var(--kui-font-size-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--kui-space-4)',
          }}
        >
          {children}
        </div>
      )}

      {/* Sticky Actions Footer */}
      {effectiveFooter && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'var(--kui-space-2)',
            padding: 'var(--kui-space-3) var(--kui-space-5)',
            borderTop: '1px solid var(--kui-color-border)',
            backgroundColor: 'var(--kui-color-surface-subtle)',
            flexShrink: 0,
          }}
        >
          {effectiveFooter}
        </div>
      )}
    </dialog>
  );
};
