import React from 'react';
import { Avatar } from '../primitives/Avatar.js';
import { CheckIcon, AlertCircleIcon, AlertTriangleIcon, InfoIcon } from '../common/Icons.js';

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  timestamp: string;
  description?: React.ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  icon?: React.ReactNode;
  actor?: { name: string; avatarUrl?: string };
}

export interface TimelineProps {
  items: TimelineItem[];
  dense?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  dense = false,
  className = '',
  style,
}) => {
  const getStatusNode = (status: TimelineItem['status'] = 'neutral', customIcon?: React.ReactNode) => {
    if (customIcon) return customIcon;

    switch (status) {
      case 'success':
        return <CheckIcon size={12} />;
      case 'warning':
        return <AlertTriangleIcon size={12} />;
      case 'danger':
        return <AlertCircleIcon size={12} />;
      case 'info':
        return <InfoIcon size={12} />;
      default:
        return (
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--kui-color-text-muted)',
            }}
          />
        );
    }
  };

  const getStatusColors = (status: TimelineItem['status'] = 'neutral') => {
    switch (status) {
      case 'success':
        return {
          bg: 'var(--kui-color-success-subtle)',
          border: 'var(--kui-color-success)',
          fg: 'var(--kui-color-success)',
        };
      case 'warning':
        return {
          bg: 'var(--kui-color-warning-subtle)',
          border: 'var(--kui-color-warning)',
          fg: 'var(--kui-color-warning)',
        };
      case 'danger':
        return {
          bg: 'var(--kui-color-danger-subtle)',
          border: 'var(--kui-color-danger)',
          fg: 'var(--kui-color-danger)',
        };
      case 'info':
        return {
          bg: 'var(--kui-color-info-subtle)',
          border: 'var(--kui-color-info)',
          fg: 'var(--kui-color-info)',
        };
      default:
        return {
          bg: 'var(--kui-color-surface-subtle)',
          border: 'var(--kui-color-border)',
          fg: 'var(--kui-color-text-secondary)',
        };
    }
  };

  return (
    <ol
      role="list"
      className={className}
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'relative',
        ...style,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const colors = getStatusColors(item.status);

        return (
          <li
            key={item.id}
            style={{
              position: 'relative',
              paddingLeft: '36px',
              paddingBottom: isLast ? 0 : dense ? 'var(--kui-space-4)' : 'var(--kui-space-6)',
            }}
          >
            {/* Connecting Vertical Track Line */}
            {!isLast && (
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '11px',
                  bottom: 0,
                  width: '2px',
                  backgroundColor: 'var(--kui-color-border)',
                }}
              />
            )}

            {/* Milestone Node Badge */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.bg,
                border: `1.5px solid ${colors.border}`,
                color: colors.fg,
                boxShadow: 'var(--kui-shadow-sm)',
              }}
            >
              {getStatusNode(item.status, item.icon)}
            </div>

            {/* Event Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--kui-space-2)',
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--kui-font-size-sm)',
                    fontWeight: 'var(--kui-font-weight-semibold)',
                    color: 'var(--kui-color-text-primary)',
                  }}
                >
                  {item.title}
                </div>
                <time
                  style={{
                    fontSize: 'var(--kui-font-size-xs)',
                    color: 'var(--kui-color-text-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.timestamp}
                </time>
              </div>

              {item.description && (
                <div
                  style={{
                    fontSize: 'var(--kui-font-size-sm)',
                    color: 'var(--kui-color-text-secondary)',
                    marginTop: '2px',
                    lineHeight: 1.45,
                  }}
                >
                  {item.description}
                </div>
              )}

              {item.actor && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: 'var(--kui-space-2)',
                  }}
                >
                  <Avatar name={item.actor.name} alt={item.actor.name} src={item.actor.avatarUrl} size="sm" />
                  <span
                    style={{
                      fontSize: 'var(--kui-font-size-xs)',
                      color: 'var(--kui-color-text-secondary)',
                    }}
                  >
                    {item.actor.name}
                  </span>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
