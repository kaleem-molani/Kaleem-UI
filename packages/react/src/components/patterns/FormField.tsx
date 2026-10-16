import React, { useId } from 'react';
import { Text } from '../primitives/Typography.js';
import { Stack } from '../primitives/Layout.js';

export interface FormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  error,
  required,
  htmlFor,
  children,
}) => {
  const autoId = useId();
  const fieldId = htmlFor || autoId;
  const descId = `${fieldId}-desc`;
  const errorId = `${fieldId}-error`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-1)',
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
      }}
    >
      {label && (
        <label
          htmlFor={fieldId}
          style={{
            fontSize: 'var(--kui-font-size-sm)',
            fontWeight: 'var(--kui-font-weight-medium)',
            color: error ? 'var(--kui-color-danger)' : 'var(--kui-color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--kui-space-1)',
          }}
        >
          <span>{label}</span>
          {required && (
            <span
              aria-hidden="true"
              style={{ color: 'var(--kui-color-danger)', fontWeight: 'bold' }}
            >
              *
            </span>
          )}
        </label>
      )}

      {description && (
        <Text id={descId} variant="caption" color="secondary">
          {description}
        </Text>
      )}

      <div style={{ marginTop: '2px' }}>{children}</div>

      {error && (
        <Text id={errorId} variant="caption" style={{ color: 'var(--kui-color-danger)' }}>
          {error}
        </Text>
      )}
    </div>
  );
};

export interface FormLayoutProps {
  children: React.ReactNode;
  gap?: 2 | 3 | 4 | 5 | 6;
  onSubmit?: (e: React.FormEvent) => void;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  gap = 4,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <Stack gap={gap}>{children}</Stack>
    </form>
  );
};
