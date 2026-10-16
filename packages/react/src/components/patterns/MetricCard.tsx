import React from 'react';
import { Card } from './Card.js';
import { Badge } from '../primitives/Badge.js';
import { ArrowUpIcon, ArrowDownIcon } from '../common/Icons.js';

export interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: 'increase' | 'decrease' | 'neutral';
  deltaSentiment?: 'positive' | 'negative' | 'neutral';
  subtext?: string;
  icon?: React.ReactNode;
  sparkline?: React.ReactNode;
  variant?: 'bordered' | 'elevated' | 'plain';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delta,
  deltaType = 'neutral',
  deltaSentiment,
  subtext,
  icon,
  sparkline,
  variant = 'bordered',
  onClick,
  className = '',
  style,
}) => {
  // Infer sentiment if not explicitly provided
  const resolvedSentiment = deltaSentiment
    ? deltaSentiment
    : deltaType === 'increase'
      ? 'positive'
      : deltaType === 'decrease'
        ? 'negative'
        : 'neutral';

  const badgeVariant =
    resolvedSentiment === 'positive' ? 'success' : resolvedSentiment === 'negative' ? 'danger' : 'neutral';

  const DeltaIcon =
    deltaType === 'increase' ? ArrowUpIcon : deltaType === 'decrease' ? ArrowDownIcon : undefined;

  return (
    <Card
      variant={variant}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: onClick ? 'border-color 150ms ease, box-shadow 150ms ease' : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      <div>
        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--kui-space-2)',
            gap: 'var(--kui-space-2)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--kui-font-size-xs)',
              fontWeight: 'var(--kui-font-weight-medium)',
              color: 'var(--kui-color-text-secondary)',
              letterSpacing: 'var(--kui-letter-spacing-wide)',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
          {icon && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: 'var(--kui-radius-sm)',
                backgroundColor: 'var(--kui-color-surface-subtle)',
                color: 'var(--kui-color-brand-primary)',
              }}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>

        {/* Primary Value */}
        <div
          style={{
            fontSize: 'var(--kui-font-size-2xl)',
            fontWeight: 'var(--kui-font-weight-bold)',
            color: 'var(--kui-color-text-primary)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--kui-font-sans)',
            marginBottom: delta || subtext ? 'var(--kui-space-3)' : 0,
          }}
        >
          {value}
        </div>
      </div>

      {/* Optional Sparkline Slot */}
      {sparkline && (
        <div style={{ margin: 'var(--kui-space-1) 0 var(--kui-space-3) 0' }}>
          {sparkline}
        </div>
      )}

      {/* Bottom Trend / Subtext Row */}
      {(delta || subtext) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--kui-space-2)',
            fontSize: 'var(--kui-font-size-xs)',
            color: 'var(--kui-color-text-secondary)',
          }}
        >
          {delta && (
            <Badge variant={badgeVariant} size="sm">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                {DeltaIcon && <DeltaIcon size={12} />}
                <span>{delta}</span>
              </span>
            </Badge>
          )}
          {subtext && (
            <span style={{ color: 'var(--kui-color-text-muted)' }}>
              {subtext}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
