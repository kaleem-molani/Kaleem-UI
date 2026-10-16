import React, { useState, useRef, useEffect, useId } from 'react';

export interface PopoverProps {
  trigger: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  content: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-start',
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const placementStyles: Record<NonNullable<PopoverProps['placement']>, React.CSSProperties> = {
    'bottom-start': { top: '100%', left: 0, marginTop: 'var(--kui-space-1)' },
    'bottom-end': { top: '100%', right: 0, marginTop: 'var(--kui-space-1)' },
    'top-start': { bottom: '100%', left: 0, marginBottom: 'var(--kui-space-1)' },
    'top-end': { bottom: '100%', right: 0, marginBottom: 'var(--kui-space-1)' },
  };

  const triggerProps = trigger.props || {};

  const clonedTrigger = React.cloneElement(trigger, {
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': isOpen ? id : undefined,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      setOpen(!isOpen);
      triggerProps.onClick?.(e);
    },
  });

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      {clonedTrigger}
      {isOpen && (
        <div
          id={id}
          role="dialog"
          style={{
            position: 'absolute',
            zIndex: 100,
            minWidth: '220px',
            backgroundColor: 'var(--kui-color-surface)',
            color: 'var(--kui-color-text-primary)',
            borderRadius: 'var(--kui-radius-md)',
            border: '1px solid var(--kui-color-border)',
            boxShadow: 'var(--kui-shadow-lg)',
            padding: 'var(--kui-space-3)',
            ...placementStyles[placement],
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
