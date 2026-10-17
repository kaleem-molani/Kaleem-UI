import React, { useState } from 'react';
import {
  Input,
  Checkbox,
  Textarea,
  Button,
  Badge,
  InlineAlert,
  SegmentedControl,
  FormSection,
} from '@kaleemmolani/react';
import { KeyIcon, ShieldIcon, LayersIcon, SlidersIcon } from '../common/Icons';

export const SettingsFormPattern: React.FC<{
  onCancel?: () => void;
  onSuccess?: () => void;
}> = ({ onCancel, onSuccess }) => {
  const [name, setName] = useState('');
  const [rateLimit, setRateLimit] = useState('5000');
  const [notes, setNotes] = useState('');
  const [environment, setEnvironment] = useState<'production' | 'staging' | 'dev'>('production');
  const [validity, setValidity] = useState<'30' | '90' | '365'>('90');
  const [autoRotate, setAutoRotate] = useState(true);
  const [ipRestricted, setIpRestricted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Key identifier is required');
      return;
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessBanner(true);
      if (onSuccess) {
        setTimeout(onSuccess, 800);
      }
    }, 600);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-4)',
        width: '100%',
      }}
    >
      {successBanner && (
        <InlineAlert variant="success" title="Credential provisioned">
          Authentication token successfully generated. Syncing registry...
        </InlineAlert>
      )}

      {/* Section 1: Identification */}
      <FormSection
        title="Primary Identifier"
        description="Configure cryptographic service identity and routing namespace."
        icon={<KeyIcon size={16} />}
        variant="card"
      >
        <Input
          label="Key Identifier"
          required
          placeholder="e.g. stripe-webhook-ingest"
          leadingAddon={<span style={{ color: 'var(--kui-color-brand-primary)', fontWeight: 600 }}>@</span>}
          trailingAddon={<Badge variant="neutral" size="sm">kui-v1</Badge>}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          error={error || undefined}
        />

        <Textarea
          label="Operational Scope & Purpose"
          description="Specify which microservices and event pipelines consume this token."
          placeholder="e.g., Ingests webhook payloads from Stripe into Redis event queue."
          showCount
          maxLength={180}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </FormSection>

      {/* Section 2: Deployment & Lifespan */}
      <FormSection
        title="Environment & Lifecycle"
        description="Access tokens are isolated to designated security perimeters."
        icon={<LayersIcon size={16} />}
        variant="card"
      >
        <SegmentedControl<'production' | 'staging' | 'dev'>
          label="Target Environment"
          fullWidth
          value={environment}
          onChange={setEnvironment}
          options={[
            {
              value: 'production',
              label: 'Production',
              badge: <Badge variant="danger" size="sm">Restricted</Badge>,
            },
            {
              value: 'staging',
              label: 'Staging',
              badge: <Badge variant="warning" size="sm">Shared</Badge>,
            },
            {
              value: 'dev',
              label: 'Development',
              badge: <Badge variant="neutral" size="sm">Sandbox</Badge>,
            },
          ]}
        />

        <SegmentedControl<'30' | '90' | '365'>
          label="Token Rotation Lifespan"
          fullWidth
          value={validity}
          onChange={setValidity}
          options={[
            { value: '30', label: '30 Days (Ephemeral)' },
            { value: '90', label: '90 Days (Standard)' },
            { value: '365', label: '1 Year (Extended)' },
          ]}
        />
      </FormSection>

      {/* Section 3: Throughput Hero Metric */}
      <FormSection
        title="Throughput & Rate Limiting"
        description="Maximum permissible API invocations before automatic throttling."
        icon={<SlidersIcon size={16} />}
        variant="card"
      >
        <Input
          label="Allowed Invocations"
          size="hero"
          type="number"
          value={rateLimit}
          onChange={(e) => setRateLimit(e.target.value)}
          trailingAddon={
            <Badge variant="info" size="md">
              req / min
            </Badge>
          }
        />
      </FormSection>

      {/* Section 4: Security Policies */}
      <FormSection
        title="Security & Ingress Policies"
        description="Runtime assertions enforced at the edge API gateway."
        icon={<ShieldIcon size={16} />}
        variant="card"
      >
        <Checkbox
          label="Automated 90-day Credential Rotation"
          description="Issues rolling notifications 14 days before rotation expiration."
          checked={autoRotate}
          onChange={(e) => setAutoRotate(e.target.checked)}
        />

        <Checkbox
          label="Strict VPC / CIDR Ingress Restriction"
          description="Rejects any request originating from outside authorized VPC subnets."
          checked={ipRestricted}
          onChange={(e) => setIpRestricted(e.target.checked)}
        />
      </FormSection>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 'var(--kui-space-2)',
          paddingTop: 'var(--kui-space-2)',
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
