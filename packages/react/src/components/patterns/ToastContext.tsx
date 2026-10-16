import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Toast } from './StatePatterns.js';
import type { AlertVariant } from '../primitives/InlineAlert.js';

export interface ToastOptions {
  id?: string;
  title?: string;
  message: string;
  variant?: AlertVariant;
  duration?: number; // duration in ms, 0 means sticky
  action?: React.ReactNode;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  show: (options: ToastOptions | string) => string;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
  info: (message: string, title?: string) => string;
  dismiss: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultDuration?: number;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultDuration = 4000,
  position = 'bottom-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const show = useCallback(
    (options: ToastOptions | string): string => {
      const opts: ToastOptions = typeof options === 'string' ? { message: options } : options;
      const id = opts.id || `toast-${++toastCounter}`;
      const duration = opts.duration !== undefined ? opts.duration : defaultDuration;

      const newItem: ToastItem = {
        ...opts,
        id,
        variant: opts.variant || 'info',
      };

      setToasts((prev) => [...prev.filter((t) => t.id !== id), newItem]);

      if (duration > 0) {
        if (timersRef.current.has(id)) {
          clearTimeout(timersRef.current.get(id));
        }
        const timer = setTimeout(() => {
          dismiss(id);
        }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [defaultDuration, dismiss]
  );

  const success = useCallback((message: string, title?: string) => show({ message, title, variant: 'success' }), [show]);
  const error = useCallback((message: string, title?: string) => show({ message, title, variant: 'danger' }), [show]);
  const warning = useCallback((message: string, title?: string) => show({ message, title, variant: 'warning' }), [show]);
  const info = useCallback((message: string, title?: string) => show({ message, title, variant: 'info' }), [show]);

  useEffect(() => {
    const currentTimers = timersRef.current;
    return () => {
      currentTimers.forEach((timer) => clearTimeout(timer));
      currentTimers.clear();
    };
  }, []);

  const positionStyles: Record<string, React.CSSProperties> = {
    'bottom-right': { bottom: 'var(--kui-space-4)', right: 'var(--kui-space-4)' },
    'bottom-left': { bottom: 'var(--kui-space-4)', left: 'var(--kui-space-4)' },
    'top-right': { top: 'var(--kui-space-4)', right: 'var(--kui-space-4)' },
    'top-left': { top: 'var(--kui-space-4)', left: 'var(--kui-space-4)' },
  };

  return (
    <ToastContext.Provider value={{ toasts, show, success, error, warning, info, dismiss, clearAll }}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        style={{
          position: 'fixed',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--kui-space-2)',
          maxWidth: '400px',
          width: 'calc(100% - 32px)',
          pointerEvents: 'none',
          ...positionStyles[position],
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              animation: 'kui-toast-in 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Toast
              title={t.title}
              message={t.message}
              variant={t.variant}
              action={t.action}
              onDismiss={() => dismiss(t.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return context;
}
