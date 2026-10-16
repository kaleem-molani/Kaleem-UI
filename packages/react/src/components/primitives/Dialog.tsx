import React, { useEffect, useRef, useId } from 'react';
import { XIcon } from '../common/Icons.js';
import { IconButton } from './IconButton.js';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = 'md',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

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
    sm: '400px',
    md: '540px',
    lg: '720px',
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
        backgroundColor: 'var(--kui-color-surface)',
        borderRadius: 'var(--kui-radius-lg)',
        border: '1px solid var(--kui-color-border)',
        boxShadow: 'var(--kui-shadow-lg)',
        color: 'var(--kui-color-text-primary)',
        fontFamily: 'var(--kui-font-sans)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: 'var(--kui-space-5)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--kui-space-3)', marginBottom: 'var(--kui-space-3)' }}>
          <div>
            <h2
              id={titleId}
              style={{
                margin: 0,
                fontSize: 'var(--kui-font-size-lg)',
                fontWeight: 'var(--kui-font-weight-semibold)',
                color: 'var(--kui-color-text-primary)',
                lineHeight: 'var(--kui-line-height-heading)',
              }}
            >
              {title}
            </h2>
            {description && (
              <p
                id={descId}
                style={{
                  margin: 'var(--kui-space-1) 0 0 0',
                  fontSize: 'var(--kui-font-size-sm)',
                  color: 'var(--kui-color-text-secondary)',
                  lineHeight: 'var(--kui-line-height-normal)',
                }}
              >
                {description}
              </p>
            )}
          </div>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Close dialog"
            icon={<XIcon size={16} />}
            onClick={onClose}
          />
        </div>

        {/* Content */}
        {children && (
          <div style={{ margin: 'var(--kui-space-4) 0', fontSize: 'var(--kui-font-size-sm)' }}>
            {children}
          </div>
        )}

        {/* Actions Footer */}
        {actions && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 'var(--kui-space-3)',
              marginTop: 'var(--kui-space-5)',
              paddingTop: 'var(--kui-space-3)',
              borderTop: '1px solid var(--kui-color-border)',
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </dialog>
  );
};
