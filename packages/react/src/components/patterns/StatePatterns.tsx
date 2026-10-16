import React from 'react';
import { Heading, Text } from '../primitives/Typography.js';
import { Dialog } from '../primitives/Dialog.js';
import { Button } from '../primitives/Button.js';
import { InlineAlert, AlertVariant } from '../primitives/InlineAlert.js';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--kui-space-8) var(--kui-space-4)',
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
      }}
    >
      {icon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: 'var(--kui-radius-full)',
            backgroundColor: 'var(--kui-color-surface-subtle)',
            color: 'var(--kui-color-text-secondary)',
            marginBottom: 'var(--kui-space-3)',
          }}
        >
          {icon}
        </div>
      )}
      <Heading as="h3" variant="section">
        {title}
      </Heading>
      {description && (
        <Text variant="body" color="secondary" style={{ marginTop: 'var(--kui-space-1)', marginBottom: 'var(--kui-space-4)' }}>
          {description}
        </Text>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

export interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  destructive = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      actions={
        <>
          <Button variant="outline" size="sm" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            variant={destructive ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <Text variant="body" color="secondary">
        {message}
      </Text>
    </Dialog>
  );
};

export interface ToastProps {
  message: string;
  title?: string;
  variant?: AlertVariant;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  title,
  variant = 'info',
  onDismiss,
  action,
}) => {
  return (
    <div
      role="status"
      style={{
        boxShadow: 'var(--kui-shadow-lg)',
        borderRadius: 'var(--kui-radius-md)',
        overflow: 'hidden',
        maxWidth: '380px',
      }}
    >
      <InlineAlert
        variant={variant}
        title={title}
        onDismiss={onDismiss}
        action={action}
      >
        {message}
      </InlineAlert>
    </div>
  );
};
