import React, { useEffect, useRef, useId } from 'react';
import { XIcon } from '../common/Icons.js';
import { IconButton } from './IconButton.js';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  position?: 'right' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  description,
  icon,
  badge,
  position = 'right',
  size = 'md',
  children,
  footer,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  className = '',
  style,
}) => {
  const titleId = useId();
  const descId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);

  const widths: Record<NonNullable<DrawerProps['size']>, string> = {
    sm: '380px',
    md: '520px',
    lg: '720px',
    xl: '880px',
    full: '100vw',
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeOnEscape, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          if (closeOnBackdropClick) {
            onClose();
          }
        }}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--kui-color-overlay)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: 'kui-fade-in 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Slide-over Container */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: widths[size],
          height: '100vh',
          backgroundColor: 'var(--kui-color-surface)',
          borderLeft: position === 'right' ? '1px solid var(--kui-color-border)' : 'none',
          borderRight: position === 'left' ? '1px solid var(--kui-color-border)' : 'none',
          boxShadow: 'var(--kui-shadow-lg), 0 0 32px rgba(0, 0, 0, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 51,
          animation: `${position === 'left' ? 'kui-slide-in-left' : 'kui-slide-in-right'} 220ms cubic-bezier(0.16, 1, 0.3, 1)`,
          ...style,
        }}
        className={`kui-drawer kui-drawer-${position} ${className}`}
      >
        {/* Sticky Header */}
        {(title || description || icon) && (
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
                  {typeof title === 'string' ? (
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
                  ) : (
                    title
                  )}
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
              aria-label="Close drawer"
              icon={<XIcon size={16} />}
              onClick={onClose}
            />
          </div>
        )}

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
        {footer && (
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
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
