import React from 'react';
import { Skeleton } from './Feedback.js';


/* ----------------------------------------------------
   SkeletonTable Component
   Mimics DataTable geometry during data retrieval
---------------------------------------------------- */
export interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  showCheckbox?: boolean;
  animation?: 'shimmer' | 'pulse' | 'none';
  compact?: boolean;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  showCheckbox = false,
  animation = 'shimmer',
  compact = false,
  style,
  ...props
}) => {
  const rowHeight = compact ? '36px' : '48px';
  const headerHeight = compact ? '36px' : '42px';

  // Realistic natural widths for columns
  const headerWidths = ['45%', '70%', '55%', '30%', '60%', '40%'];
  const cellWidths = [
    ['60%', '80%', '50%', '35%'],
    ['40%', '65%', '70%', '45%'],
    ['75%', '50%', '60%', '30%'],
    ['50%', '75%', '40%', '55%'],
    ['65%', '60%', '55%', '40%'],
  ];

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading table data..."
      style={{
        width: '100%',
        borderRadius: 'var(--kui-radius-md)',
        border: '1px solid var(--kui-color-border)',
        overflow: 'hidden',
        backgroundColor: 'var(--kui-color-surface)',
        ...style,
      }}
      {...props}
    >
      {/* Header Row */}
      {showHeader && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: headerHeight,
            padding: '0 var(--kui-space-4)',
            backgroundColor: 'var(--kui-color-surface-subtle)',
            borderBottom: '1px solid var(--kui-color-border)',
            gap: 'var(--kui-space-4)',
          }}
        >
          {showCheckbox && (
            <Skeleton
              variant="rect"
              width={16}
              height={16}
              radius="sm"
              animation={animation}
              style={{ flexShrink: 0 }}
            />
          )}
          {Array.from({ length: columns }).map((_, cIdx) => (
            <div key={`th-${cIdx}`} style={{ flex: 1, minWidth: 0 }}>
              <Skeleton
                variant="text"
                width={headerWidths[cIdx % headerWidths.length]}
                height="12px"
                radius="sm"
                animation={animation}
              />
            </div>
          ))}
        </div>
      )}

      {/* Body Rows */}
      {Array.from({ length: rows }).map((_, rIdx) => {
        const rowPattern = cellWidths[rIdx % cellWidths.length];
        const isLastRow = rIdx === rows - 1;

        return (
          <div
            key={`tr-${rIdx}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: rowHeight,
              padding: '0 var(--kui-space-4)',
              borderBottom: isLastRow ? 'none' : '1px solid var(--kui-color-border)',
              gap: 'var(--kui-space-4)',
            }}
          >
            {showCheckbox && (
              <Skeleton
                variant="rect"
                width={16}
                height={16}
                radius="sm"
                animation={animation}
                style={{ flexShrink: 0 }}
              />
            )}
            {Array.from({ length: columns }).map((_, cIdx) => (
              <div key={`td-${rIdx}-${cIdx}`} style={{ flex: 1, minWidth: 0 }}>
                <Skeleton
                  variant="text"
                  width={rowPattern[cIdx % rowPattern.length]}
                  height="14px"
                  radius="sm"
                  animation={animation}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

/* ----------------------------------------------------
   SkeletonCard Component
   Mimics Card and MetricCard geometries
---------------------------------------------------- */
export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hasHeader?: boolean;
  hasAvatar?: boolean;
  lines?: number;
  hasAction?: boolean;
  hasMetric?: boolean;
  animation?: 'shimmer' | 'pulse' | 'none';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  hasHeader = true,
  hasAvatar = false,
  lines = 3,
  hasAction = false,
  hasMetric = false,
  animation = 'shimmer',
  style,
  ...props
}) => {
  const linePattern = ['100%', '85%', '65%', '90%', '75%'];

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading card content..."
      style={{
        padding: 'var(--kui-space-4)',
        borderRadius: 'var(--kui-radius-md)',
        border: '1px solid var(--kui-color-border)',
        backgroundColor: 'var(--kui-color-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-3)',
        ...style,
      }}
      {...props}
    >
      {/* Optional Header */}
      {hasHeader && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-3)' }}>
          {hasAvatar && (
            <Skeleton variant="circle" width={36} height={36} animation={animation} style={{ flexShrink: 0 }} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
            <Skeleton variant="text" width="55%" height="16px" radius="sm" animation={animation} />
            <Skeleton variant="text" width="35%" height="12px" radius="sm" animation={animation} />
          </div>
        </div>
      )}

      {/* Optional Bold Metric Area */}
      {hasMetric && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--kui-space-3)', margin: 'var(--kui-space-1) 0' }}>
          <Skeleton variant="rect" width="130px" height="32px" radius="sm" animation={animation} />
          <Skeleton variant="rect" width="60px" height="20px" radius="full" animation={animation} />
        </div>
      )}

      {/* Text Lines */}
      {lines > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Array.from({ length: lines }).map((_, idx) => (
            <Skeleton
              key={`line-${idx}`}
              variant="text"
              width={linePattern[idx % linePattern.length]}
              height="13px"
              radius="sm"
              animation={animation}
            />
          ))}
        </div>
      )}

      {/* Optional Action Footer */}
      {hasAction && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--kui-space-2)',
            marginTop: 'var(--kui-space-2)',
            paddingTop: 'var(--kui-space-3)',
            borderTop: '1px solid var(--kui-color-border)',
          }}
        >
          <Skeleton variant="rect" width="76px" height="30px" radius="sm" animation={animation} />
          <Skeleton variant="rect" width="90px" height="30px" radius="sm" animation={animation} />
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   SkeletonList Component
   Mimics feeds, activity logs, and timelines
---------------------------------------------------- */
export interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number;
  hasAvatar?: boolean;
  lines?: number;
  hasAction?: boolean;
  divided?: boolean;
  animation?: 'shimmer' | 'pulse' | 'none';
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 4,
  hasAvatar = true,
  lines = 2,
  hasAction = false,
  divided = true,
  animation = 'shimmer',
  style,
  ...props
}) => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading list items..."
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--kui-color-surface)',
        borderRadius: 'var(--kui-radius-md)',
        border: '1px solid var(--kui-color-border)',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {Array.from({ length: items }).map((_, idx) => {
        const isLast = idx === items - 1;
        return (
          <div
            key={`list-item-${idx}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--kui-space-3)',
              padding: 'var(--kui-space-3) var(--kui-space-4)',
              borderBottom: divided && !isLast ? '1px solid var(--kui-color-border)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-3)', flex: 1, minWidth: 0 }}>
              {hasAvatar && (
                <Skeleton variant="circle" width={32} height={32} animation={animation} style={{ flexShrink: 0 }} />
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
                <Skeleton variant="text" width={idx % 2 === 0 ? '60%' : '75%'} height="14px" radius="sm" animation={animation} />
                {lines > 1 && (
                  <Skeleton variant="text" width={idx % 2 === 0 ? '40%' : '50%'} height="11px" radius="sm" animation={animation} />
                )}
              </div>
            </div>

            {hasAction && (
              <Skeleton variant="rect" width="60px" height="24px" radius="sm" animation={animation} style={{ flexShrink: 0 }} />
            )}
          </div>
        );
      })}
    </div>
  );
};
