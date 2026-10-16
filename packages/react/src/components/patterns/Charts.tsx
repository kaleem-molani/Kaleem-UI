import React from 'react';
import { Card } from './Card.js';

/* ----------------------------------------------------
   1. ChartContainer
---------------------------------------------------- */
export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  legend?: React.ReactNode;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  actions,
  legend,
  children,
  ariaLabel,
  className = '',
  style,
}) => {
  return (
    <Card
      variant="bordered"
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-3)',
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--kui-space-2)',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 'var(--kui-font-size-md)',
              fontWeight: 'var(--kui-font-weight-semibold)',
              color: 'var(--kui-color-text-primary)',
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              style={{
                margin: '2px 0 0 0',
                fontSize: 'var(--kui-font-size-xs)',
                color: 'var(--kui-color-text-muted)',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>

      {/* Main Chart Graphic */}
      <div
        role="img"
        aria-label={ariaLabel || title}
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        {children}
      </div>

      {/* Optional Legend */}
      {legend && (
        <div
          style={{
            borderTop: '1px solid var(--kui-color-border)',
            paddingTop: 'var(--kui-space-2)',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--kui-space-3)',
            fontSize: 'var(--kui-font-size-xs)',
            color: 'var(--kui-color-text-secondary)',
          }}
        >
          {legend}
        </div>
      )}
    </Card>
  );
};

/* ----------------------------------------------------
   2. Sparkline
---------------------------------------------------- */
export interface SparklineProps {
  data: number[];
  width?: number | string;
  height?: number;
  color?: string;
  fill?: boolean;
  showMinMax?: boolean;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = '100%',
  height = 44,
  color = 'var(--kui-color-brand-primary)',
  fill = true,
  showMinMax = false,
  strokeWidth = 2,
  className = '',
  style,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const paddingX = 4;
  const paddingY = 6;
  const viewWidth = 120;
  const viewHeight = height;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * (viewWidth - paddingX * 2);
    const y = viewHeight - paddingY - ((val - min) / range) * (viewHeight - paddingY * 2);
    return { x, y, val };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${viewHeight} L ${points[0].x} ${viewHeight} Z`;

  const gradientId = `kui-spark-grad-${Math.random().toString(36).substring(2, 7)}`;

  const minPoint = points.find((p) => p.val === min);
  const maxPoint = points.find((p) => p.val === max);

  return (
    <svg
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      preserveAspectRatio="none"
      width={width}
      height={height}
      className={className}
      style={{ overflow: 'visible', display: 'block', ...style }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {fill && <path d={areaD} fill={`url(#${gradientId})`} />}

      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {showMinMax && minPoint && (
        <circle cx={minPoint.x} cy={minPoint.y} r={3} fill="var(--kui-color-danger)" />
      )}
      {showMinMax && maxPoint && (
        <circle cx={maxPoint.x} cy={maxPoint.y} r={3} fill="var(--kui-color-success)" />
      )}
    </svg>
  );
};

/* ----------------------------------------------------
   3. BarChart
---------------------------------------------------- */
export interface BarChartItem {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartItem[];
  height?: number;
  valueFormatter?: (val: number) => string;
  showValues?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 160,
  valueFormatter = (v) => String(v),
  showValues = true,
  className = '',
  style,
}) => {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 'var(--kui-space-3)',
        height: `${height}px`,
        paddingTop: '20px',
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      {data.map((item, idx) => {
        const percent = Math.max(4, Math.round((item.value / maxVal) * 100));
        const barColor = item.color || 'var(--kui-color-brand-primary)';

        return (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              height: '100%',
              justifyContent: 'flex-end',
              gap: '6px',
            }}
          >
            {showValues && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 'var(--kui-font-weight-medium)',
                  color: 'var(--kui-color-text-secondary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {valueFormatter(item.value)}
              </span>
            )}
            <div
              style={{
                width: '100%',
                maxWidth: '42px',
                height: `${percent}%`,
                backgroundColor: barColor,
                borderRadius: 'var(--kui-radius-sm) var(--kui-radius-sm) 0 0',
                transition: 'height 250ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              title={`${item.label}: ${valueFormatter(item.value)}`}
            />
            <span
              style={{
                fontSize: 'var(--kui-font-size-xs)',
                color: 'var(--kui-color-text-muted)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ----------------------------------------------------
   4. DonutChart
---------------------------------------------------- */
export interface DonutSegment {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: React.ReactNode;
  centerSubtext?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_CHART_COLORS = [
  'var(--kui-color-brand-primary)',
  'var(--kui-color-accent)',
  'var(--kui-color-warning)',
  'var(--kui-color-danger)',
  'var(--kui-color-info)',
];

export const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  size = 160,
  strokeWidth = 20,
  centerLabel,
  centerSubtext,
  className = '',
  style,
}) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--kui-color-surface-subtle)"
          strokeWidth={strokeWidth}
        />

        {/* Segments */}
        {segments.map((seg, idx) => {
          const strokeLength = (seg.value / total) * circumference;
          const strokeDasharray = `${strokeLength} ${circumference - strokeLength}`;
          const strokeDashoffset = -cumulativeOffset;
          cumulativeOffset += strokeLength;

          const color = seg.color || DEFAULT_CHART_COLORS[idx % DEFAULT_CHART_COLORS.length];

          return (
            <circle
              key={idx}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              style={{ transition: 'stroke-dasharray 300ms ease' }}
            >
              <title>{`${seg.label}: ${seg.value} (${Math.round((seg.value / total) * 100)}%)`}</title>
            </circle>
          );
        })}
      </svg>

      {/* Center Readout */}
      {(centerLabel || centerSubtext) && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'var(--kui-font-sans)',
            pointerEvents: 'none',
          }}
        >
          {centerLabel && (
            <div
              style={{
                fontSize: 'var(--kui-font-size-xl)',
                fontWeight: 'var(--kui-font-weight-bold)',
                color: 'var(--kui-color-text-primary)',
                lineHeight: 1.1,
              }}
            >
              {centerLabel}
            </div>
          )}
          {centerSubtext && (
            <div
              style={{
                fontSize: '11px',
                color: 'var(--kui-color-text-muted)',
                marginTop: '2px',
              }}
            >
              {centerSubtext}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
