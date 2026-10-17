import React, { useState } from 'react';
import {
  Input,
  Checkbox,
  Textarea,


  RadioGroup,
  Button,
  Badge,
  InlineAlert,
} from '../primitives';
import { CustomSelect } from '@kaleem-ui/react';


export const SettingsFormPattern: React.FC<{
  onCancel?: () => void;
  onSuccess?: () => void;
}> = ({ onCancel, onSuccess }) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [environment, setEnvironment] = useState('Production');
  const [validity, setValidity] = useState('90');
  const [autoRotate, setAutoRotate] = useState(true);
  const [ipRestricted, setIpRestricted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Key name is required');
      return;
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessBanner(true);
      if (onSuccess) {
        setTimeout(onSuccess, 1000);
      }
    }, 800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-5)',
        backgroundColor: 'var(--kui-color-surface)',
        border: '1px solid var(--kui-color-border)',
        borderRadius: 'var(--kui-radius-lg)',
        padding: 'var(--kui-space-6)',
        maxWidth: '620px',
        width: '100%',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', marginBottom: 'var(--kui-space-1)' }}>
          <h3 id="modal-title" style={{ fontSize: 'var(--kui-font-size-md)', margin: 0 }}>Provision API Access Key</h3>
          <Badge variant="neutral" size="sm">Scoped</Badge>
        </div>
        <p style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-secondary)', margin: 0 }}>
          Generate a cryptographic access token configured with role-based runtime restrictions.
        </p>
      </div>

      {successBanner && (
        <InlineAlert variant="success" title="Credential provisioned">
          Authentication token successfully generated. Returning to table...
        </InlineAlert>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-4)' }}>
        <Input
          label="Key Identifier Name"
          description="A descriptive name to distinguish this service token in audit logs."
          required
          placeholder="e.g., payment-gateway-sync"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          error={error || undefined}
        />

        <Textarea
          label="Scope Description / Purpose"
          description="Explain why this credential exists and which microservices consume it."
          placeholder="e.g., Ingests webhook payloads from stripe-sync-service into event queues."
          showCount
          maxLength={240}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <CustomSelect
          label="Target Environment"
          description="Access credentials cannot cross boundary perimeters."
          options={[
            {
              value: 'Production',
              label: 'Production (Highly Restricted)',
              description: 'Strict mTLS & audit logging enabled',
              badge: <Badge variant="danger" size="sm">Restricted</Badge>,
            },
            {
              value: 'Staging',
              label: 'Staging (Internal Integration)',
              description: 'Shared integration cluster',
              badge: <Badge variant="warning" size="sm">Staging</Badge>,
            },
            {
              value: 'Development',
              label: 'Development (Sandbox Sandbox)',
              description: 'Ephemeral local test runner',
              badge: <Badge variant="neutral" size="sm">Sandbox</Badge>,
            },
          ]}
          value={environment}
          onChange={(val) => setEnvironment(val)}
        />


        <RadioGroup
          label="Credential Lifespan"
          description="Determine the maximum automated token validity period."
          name="credential-lifespan"
          value={validity}
          onChange={setValidity}
          options={[
            { value: '30', label: '30 Days', description: 'Recommended for ephemeral pipeline jobs' },
            { value: '90', label: '90 Days (Standard)', description: 'Standard quarterly rotation cycle' },
            { value: '365', label: '1 Year', description: 'Requires approval for production workloads' },
          ]}
        />

        <div style={{ borderTop: '1px solid var(--kui-color-border)', paddingTop: 'var(--kui-space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-3)' }}>
          <span
            style={{
              fontSize: 'var(--kui-font-size-xs)',
              fontWeight: 'var(--kui-font-weight-medium)',
              color: 'var(--kui-color-text-primary)',
            }}
          >
            Access & Security Policies
          </span>

          <Checkbox
            label="Automatic 90-day Credential Rotation"
            description="Issues rolling warning notifications 14 days before rotation expiration."
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
          />

          <Checkbox
            label="Restrict requests to VPC / CIDR block"
            description="Rejects any invocation originating from public ingress gateways."
            checked={ipRestricted}
            onChange={(e) => setIpRestricted(e.target.checked)}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 'var(--kui-space-2)',
          borderTop: '1px solid var(--kui-color-border)',
          paddingTop: 'var(--kui-space-4)',
        }}
      >
        {onCancel && (
          <Button variant="ghost" size="sm" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
        <Button variant="primary" size="sm" type="submit" loading={loading}>
          Save and Issue Token
        </Button>
      </div>
    </form>
  );
};
