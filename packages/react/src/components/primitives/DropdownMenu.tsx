import React, { useState, useRef, useEffect, useId } from 'react';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  items: DropdownMenuItem[];
  align?: 'start' | 'end';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = 'start',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      return;
    }

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < items.length) {
        const item = items[focusedIndex];
        if (!item.disabled) {
          item.onClick?.();
          setIsOpen(false);
        }
      }
    }
  };

  const triggerProps = trigger.props || {};

  const clonedTrigger = React.cloneElement(trigger, {
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
    'aria-controls': isOpen ? id : undefined,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      setIsOpen(!isOpen);
      triggerProps.onClick?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      handleKeyDown(e);
      triggerProps.onKeyDown?.(e);
    },
  });

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      {clonedTrigger}
      {isOpen && (
        <div
          ref={menuRef}
          id={id}
          role="menu"
          aria-orientation="vertical"
          style={{
            position: 'absolute',
            zIndex: 100,
            top: '100%',
            [align === 'end' ? 'right' : 'left']: 0,
            marginTop: 'var(--kui-space-1)',
            minWidth: '180px',
            backgroundColor: 'var(--kui-color-surface)',
            color: 'var(--kui-color-text-primary)',
            borderRadius: 'var(--kui-radius-md)',
            border: '1px solid var(--kui-color-border)',
            boxShadow: 'var(--kui-shadow-lg)',
            padding: 'var(--kui-space-1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {items.map((item, index) => {
            const isFocused = index === focusedIndex;
            return (
              <button
                key={item.id}
                role="menuitem"
                disabled={item.disabled}
                tabIndex={-1}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    setIsOpen(false);
                  }
                }}
                onMouseEnter={() => setFocusedIndex(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--kui-space-2)',
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: 'var(--kui-radius-sm)',
                  border: 'none',
                  backgroundColor: isFocused
                    ? item.danger
                      ? 'var(--kui-color-danger-surface)'
                      : 'var(--kui-color-surface-subtle)'
                    : 'transparent',
                  color: item.disabled
                    ? 'var(--kui-color-text-muted)'
                    : item.danger
                      ? 'var(--kui-color-danger)'
                      : 'var(--kui-color-text-primary)',
                  fontSize: 'var(--kui-font-size-sm)',
                  fontFamily: 'var(--kui-font-sans)',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  textAlign: 'left',
                  outline: 'none',
                  transition: 'background-color 120ms ease',
                }}
              >
                {item.icon && (
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
