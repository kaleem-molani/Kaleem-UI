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

/* ----------------------------------------------------
   5. AreaChart
---------------------------------------------------- */
export interface AreaChartPoint {
  label: string;
  [seriesKey: string]: string | number;
}

export interface AreaChartSeries {
  key: string;
  name: string;
  color?: string;
  fill?: boolean;
}

export interface AreaChartProps {
  data: AreaChartPoint[];
  series: AreaChartSeries[];
  height?: number;
  valueFormatter?: (val: number) => string;
  gridLines?: boolean;
  showPoints?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  series,
  height = 200,
  valueFormatter = (val) => `${val}`,
  gridLines = true,
  showPoints = true,
  ariaLabel = 'Area chart',
  className = '',
  style,
}) => {
  if (!data || data.length === 0 || !series || series.length === 0) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kui-color-text-muted)', fontSize: 'var(--kui-font-size-xs)' }}>
        No chart data available.
      </div>
    );
  }

  const svgWidth = 500;
  const svgHeight = height;
  const padLeft = 45;
  const padRight = 15;
  const padTop = 15;
  const padBottom = 26;
  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;

  let maxVal = 0;
  data.forEach((p) => {
    series.forEach((s) => {
      const v = Number(p[s.key] ?? 0);
      if (v > maxVal) maxVal = v;
    });
  });
  if (maxVal === 0) maxVal = 10;
  maxVal = Math.ceil(maxVal * 1.1);

  const getX = (i: number) => {
    if (data.length <= 1) return padLeft + chartW / 2;
    return padLeft + (i / (data.length - 1)) * chartW;
  };

  const getY = (val: number) => {
    const fraction = Math.min(1, Math.max(0, val / maxVal));
    return padTop + chartH * (1 - fraction);
  };

  const gridSteps = [0, 0.33, 0.66, 1];

  return (
    <div className={className} style={{ width: '100%', overflow: 'hidden', ...style }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          {series.map((s, idx) => {
            const color = s.color || (idx === 0 ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-accent)');
            return (
              <linearGradient key={s.key} id={`kui-area-grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.0" />
              </linearGradient>
            );
          })}
        </defs>

        {gridLines &&
          gridSteps.map((step) => {
            const y = padTop + chartH * (1 - step);
            const val = Math.round(maxVal * step);
            return (
              <g key={step}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke="var(--kui-color-border)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={padLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  fill="var(--kui-color-text-secondary)"
                  fontSize="10"
                  fontFamily="var(--kui-font-sans)"
                >
                  {valueFormatter(val)}
                </text>
              </g>
            );
          })}

        {series.map((s, idx) => {
          const color = s.color || (idx === 0 ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-accent)');
          const points = data.map((d, i) => ({
            x: getX(i),
            y: getY(Number(d[s.key] ?? 0)),
            val: Number(d[s.key] ?? 0),
            label: d.label,
          }));

          const lineD = points.reduce(
            (acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
            ''
          );

          const baselineY = padTop + chartH;
          const firstX = points[0].x.toFixed(1);
          const lastX = points[points.length - 1].x.toFixed(1);
          const areaD = `${lineD} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;

          return (
            <g key={s.key}>
              {s.fill !== false && (
                <path d={areaD} fill={`url(#kui-area-grad-${s.key})`} />
              )}
              <path
                d={lineD}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {showPoints &&
                points.map((p, pIdx) => (
                  <circle
                    key={pIdx}
                    cx={p.x}
                    cy={p.y}
                    r={3}
                    fill="var(--kui-color-surface)"
                    stroke={color}
                    strokeWidth="2"
                  >
                    <title>{`${s.name} (${p.label}): ${valueFormatter(p.val)}`}</title>
                  </circle>
                ))}
            </g>
          );
        })}

        {data.map((d, i) => {
          const sampleInterval = data.length > 8 ? Math.ceil(data.length / 7) : 1;
          if (i % sampleInterval !== 0 && i !== data.length - 1) return null;

          return (
            <text
              key={i}
              x={getX(i)}
              y={svgHeight - 8}
              textAnchor="middle"
              fill="var(--kui-color-text-secondary)"
              fontSize="10"
              fontFamily="var(--kui-font-sans)"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

/* ----------------------------------------------------
   6. Heatmap
---------------------------------------------------- */
export interface HeatmapCell {
  x: string | number;
  y: string | number;
  value: number;
  label?: string;
}

export interface HeatmapProps {
  data: HeatmapCell[];
  xLabels?: string[];
  yLabels?: string[];
  colorScale?: string[];
  cellSize?: number;
  cellWidth?: number;
  cellHeight?: number;
  cellRadius?: number;
  gap?: number;
  ariaLabel?: string;
  legend?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  xLabels,
  yLabels,
  colorScale = [
    'var(--kui-color-surface-subtle)', // 0: empty (#EEF1EE)
    '#CFE9DC',                         // 1: low (soft mint)
    '#83F0C0',                         // 2: medium-low (cool mint)
    '#4CCF98',                         // 3: medium-high (vibrant emerald)
    '#167653',                         // 4: peak (deep evergreen)
  ],
  cellSize,
  cellWidth,
  cellHeight,
  cellRadius = 4,
  gap = 4,
  ariaLabel = 'Activity heatmap',
  legend = true,
  className = '',
  style,
}) => {
  const computedXLabels = xLabels || Array.from(new Set(data.map((d) => String(d.x))));
  const computedYLabels = yLabels || Array.from(new Set(data.map((d) => String(d.y))));

  const maxVal = Math.max(1, ...data.map((d) => d.value));

  const cellMap = new Map<string, HeatmapCell>();
  data.forEach((d) => {
    cellMap.set(`${d.x}-${d.y}`, d);
  });

  // Calculate cell width to ensure xLabels NEVER collide:
  // If xLabels contain 4+ characters (e.g. "00:00"), cellWidth needs at least 52px.
  const hasLongLabels = computedXLabels.some((l) => String(l).length > 3);
  const resolvedCellWidth =
    cellWidth ?? (cellSize && cellSize >= 48 ? cellSize : hasLongLabels ? 58 : (cellSize || 24));
  const resolvedCellHeight = cellHeight ?? cellSize ?? 26;

  // Sampling step for X labels if columns are narrow (< 44px)
  const labelInterval = resolvedCellWidth < 44 ? Math.ceil(44 / (resolvedCellWidth + gap)) : 1;

  const labelWidth = Math.max(42, ...computedYLabels.map((l) => String(l).length * 8 + 10));
  const headerHeight = 24;
  const gridWidth = computedXLabels.length * (resolvedCellWidth + gap) - gap;
  const gridHeight = computedYLabels.length * (resolvedCellHeight + gap) - gap;
  const totalSvgWidth = labelWidth + gridWidth + 16;
  const totalSvgHeight = headerHeight + gridHeight + (legend ? 34 : 10);

  const getColor = (val: number) => {
    if (val <= 0) return colorScale[0];
    const fraction = val / maxVal;
    if (fraction < 0.25) return colorScale[1];
    if (fraction < 0.5) return colorScale[2];
    if (fraction < 0.75) return colorScale[3];
    return colorScale[4];
  };

  return (
    <div
      className={className}
      style={{
        width: '100%',
        overflowX: 'auto',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${totalSvgWidth} ${totalSvgHeight}`}
        width="100%"
        style={{
          maxWidth: `${totalSvgWidth}px`,
          height: 'auto',
          display: 'block',
          margin: '0 auto',
        }}
        role="img"
        aria-label={ariaLabel}
      >
        {/* X-Axis Header Labels */}
        {computedXLabels.map((xl, xi) => {
          if (xi % labelInterval !== 0 && xi !== computedXLabels.length - 1) return null;
          return (
            <text
              key={xl}
              x={labelWidth + xi * (resolvedCellWidth + gap) + resolvedCellWidth / 2}
              y={headerHeight - 7}
              textAnchor="middle"
              fill="var(--kui-color-text-secondary)"
              fontSize="11"
              fontWeight="var(--kui-font-weight-medium)"
              fontFamily="var(--kui-font-sans)"
            >
              {xl}
            </text>
          );
        })}

        {/* Y-Axis Row Labels and Cells */}
        {computedYLabels.map((yl, yi) => {
          const yPos = headerHeight + yi * (resolvedCellHeight + gap);
          return (
            <g key={yl}>
              <text
                x={labelWidth - 8}
                y={yPos + resolvedCellHeight / 2 + 4}
                textAnchor="end"
                fill="var(--kui-color-text-secondary)"
                fontSize="11"
                fontWeight="var(--kui-font-weight-medium)"
                fontFamily="var(--kui-font-sans)"
              >
                {yl}
              </text>

              {computedXLabels.map((xl, xi) => {
                const xPos = labelWidth + xi * (resolvedCellWidth + gap);
                const cell = cellMap.get(`${xl}-${yl}`);
                const val = cell ? cell.value : 0;
                const fill = getColor(val);

                return (
                  <rect
                    key={`${xl}-${yl}`}
                    x={xPos}
                    y={yPos}
                    width={resolvedCellWidth}
                    height={resolvedCellHeight}
                    rx={cellRadius}
                    fill={fill}
                    stroke="var(--kui-color-surface)"
                    strokeWidth="1"
                    style={{
                      transition: 'opacity 100ms ease',
                      cursor: 'pointer',
                    }}
                  >
                    <title>{cell?.label || `${yl} ${xl}: ${val}`}</title>
                  </rect>
                );
              })}
            </g>
          );
        })}

        {/* Legend */}
        {legend && (
          <g transform={`translate(${labelWidth}, ${headerHeight + gridHeight + 14})`}>
            <text
              x={0}
              y={10}
              fill="var(--kui-color-text-muted)"
              fontSize="10"
              fontFamily="var(--kui-font-sans)"
            >
              Less
            </text>
            {colorScale.map((col, idx) => (
              <rect
                key={idx}
                x={32 + idx * 18}
                y={0}
                width={14}
                height={14}
                rx={3}
                fill={col}
                stroke="var(--kui-color-border)"
                strokeWidth="0.5"
              />
            ))}
            <text
              x={32 + colorScale.length * 18 + 6}
              y={10}
              fill="var(--kui-color-text-muted)"
              fontSize="10"
              fontFamily="var(--kui-font-sans)"
            >
              More
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/* ----------------------------------------------------
   7. GaugeChart
---------------------------------------------------- */
export interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  subtext?: string;
  valueFormatter?: (val: number) => string;
  size?: number;
  thickness?: number;
  color?: string;
  trackColor?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  label,
  subtext,
  valueFormatter = (val) => `${val}%`,
  size = 180,
  thickness = 14,
  color = 'var(--kui-color-brand-primary)',
  trackColor = 'var(--kui-color-surface-subtle)',
  ariaLabel,
  className = '',
  style,
}) => {
  const clamped = Math.min(max, Math.max(min, value));
  const fraction = (clamped - min) / (max - min || 1);

  const cx = size / 2;
  const cy = size / 2 + 10;
  const radius = (size - thickness) / 2;
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - fraction);

  const d = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        ...style,
      }}
      role="img"
      aria-label={ariaLabel || `${label || 'Gauge'}: ${valueFormatter(value)}`}
    >
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.7}`}>
        <path
          d={d}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
          strokeLinecap="round"
        />
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${arcLength}`}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 400ms ease' }}
        />
      </svg>

      <div
        style={{
          marginTop: -size * 0.28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          fontFamily: 'var(--kui-font-sans)',
        }}
      >
        <span
          style={{
            fontSize: 'var(--kui-font-size-xl)',
            fontWeight: 'var(--kui-font-weight-bold)',
            color: 'var(--kui-color-text-primary)',
            lineHeight: 1.1,
          }}
        >
          {valueFormatter(value)}
        </span>
        {label && (
          <span
            style={{
              fontSize: 'var(--kui-font-size-xs)',
              fontWeight: 'var(--kui-font-weight-medium)',
              color: 'var(--kui-color-text-secondary)',
              marginTop: '2px',
            }}
          >
            {label}
          </span>
        )}
        {subtext && (
          <span
            style={{
              fontSize: '11px',
              color: 'var(--kui-color-text-muted)',
              marginTop: '1px',
            }}
          >
            {subtext}
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: size - thickness * 2,
          fontSize: '10px',
          color: 'var(--kui-color-text-secondary)',
          marginTop: '6px',
        }}
      >
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   8. MetricBreakdownList
---------------------------------------------------- */
export interface MetricBreakdownItem {
  id: string;
  label: string;
  value: number;
  secondaryValue?: string;
  badge?: React.ReactNode;
  color?: string;
}

export interface MetricBreakdownListProps {
  items: MetricBreakdownItem[];
  maxTotal?: number;
  valueFormatter?: (val: number) => string;
  showRank?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MetricBreakdownList: React.FC<MetricBreakdownListProps> = ({
  items,
  maxTotal,
  valueFormatter = (val) => String(val),
  showRank = true,
  className = '',
  style,
}) => {
  const max = maxTotal || Math.max(1, ...items.map((i) => i.value));

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-3)',
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      {items.map((item, idx) => {
        const pct = Math.min(100, Math.max(0, (item.value / max) * 100));
        const barColor = item.color || 'var(--kui-color-brand-primary)';

        return (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 'var(--kui-font-size-xs)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {showRank && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 'var(--kui-font-weight-bold)',
                      color: 'var(--kui-color-text-secondary)',
                      width: '18px',
                    }}
                  >
                    {`#${idx + 1}`}
                  </span>
                )}
                <span
                  style={{
                    fontWeight: 'var(--kui-font-weight-medium)',
                    color: 'var(--kui-color-text-primary)',
                  }}
                >
                  {item.label}
                </span>
                {item.badge}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontWeight: 'var(--kui-font-weight-semibold)',
                    color: 'var(--kui-color-text-primary)',
                  }}
                >
                  {valueFormatter(item.value)}
                </span>
                {item.secondaryValue && (
                  <span style={{ color: 'var(--kui-color-text-muted)', fontSize: '11px' }}>
                    ({item.secondaryValue})
                  </span>
                )}
              </div>
            </div>

            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'var(--kui-color-surface-subtle)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  backgroundColor: barColor,
                  borderRadius: '3px',
                  transition: 'width 300ms ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ----------------------------------------------------
   9. FunnelChart
---------------------------------------------------- */
export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  color?: string;
  description?: string;
}

export interface FunnelChartProps {
  stages: FunnelStage[];
  valueFormatter?: (val: number) => string;
  className?: string;
  style?: React.CSSProperties;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({
  stages,
  valueFormatter = (val) => String(val),
  className = '',
  style,
}) => {
  if (!stages || stages.length === 0) return null;

  const initialCount = stages[0].count || 1;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-2)',
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      {stages.map((stage, idx) => {
        const overallRate = Math.round((stage.count / initialCount) * 100);
        const prevCount = idx > 0 ? stages[idx - 1].count : initialCount;
        const dropoff = idx > 0 ? Math.round(((prevCount - stage.count) / prevCount) * 100) : 0;
        const color = stage.color || (idx === 0 ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-accent)');

        return (
          <div key={stage.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--kui-space-2) var(--kui-space-3)',
                backgroundColor: 'var(--kui-color-surface-subtle)',
                border: '1px solid var(--kui-color-border)',
                borderRadius: 'var(--kui-radius-sm)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${overallRate}%`,
                  backgroundColor: color,
                  opacity: 0.15,
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {idx + 1}
                </span>
                <div>
                  <span
                    style={{
                      fontSize: 'var(--kui-font-size-xs)',
                      fontWeight: 'var(--kui-font-weight-semibold)',
                      color: 'var(--kui-color-text-primary)',
                      display: 'block',
                    }}
                  >
                    {stage.name}
                  </span>
                  {stage.description && (
                    <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)' }}>
                      {stage.description}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ position: 'relative', textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: 'var(--kui-font-size-xs)',
                    fontWeight: 'var(--kui-font-weight-bold)',
                    color: 'var(--kui-color-text-primary)',
                  }}
                >
                  {valueFormatter(stage.count)}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--kui-color-text-secondary)' }}>
                  {`${overallRate}% converted`}{' '}
                  {idx > 0 && dropoff > 0 && <span style={{ color: 'var(--kui-color-danger)' }}>{`(-${dropoff}%)`}</span>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ----------------------------------------------------
   10. RadarChart (Spider / Multivariate Scorecard)
---------------------------------------------------- */
export interface RadarMetric {
  key: string;
  label: string;
  max?: number;
}

export interface RadarSeries {
  id: string;
  name: string;
  color?: string;
  data: Record<string, number>;
}

export interface RadarChartProps {
  metrics: RadarMetric[];
  series: RadarSeries[];
  size?: number;
  levels?: number;
  fillOpacity?: number;
  showDots?: boolean;
  showLegend?: boolean;
  valueFormatter?: (val: number, metricKey: string) => string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  metrics,
  series,
  size = 320,
  levels = 4,
  fillOpacity = 0.2,
  showDots = true,
  showLegend = true,
  valueFormatter = (v) => String(v),
  className = '',
  style,
  ariaLabel,
}) => {
  if (!metrics || metrics.length < 3 || !series || series.length === 0) {
    return null;
  }

  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - 100) / 2;
  const n = metrics.length;

  const defaultColors = [
    'var(--kui-color-brand-primary)',
    'var(--kui-color-brand-accent)',
    'var(--kui-color-warning)',
    'var(--kui-color-info)',
  ];

  // Helper to compute (x, y) given metric index and radial ratio [0, 1]
  const getCoord = (idx: number, ratio: number) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * idx) / n;
    return {
      x: cx + radius * ratio * Math.cos(angle),
      y: cy + radius * ratio * Math.sin(angle),
      angle,
    };
  };

  // Concentric polygon rings
  const levelRings = Array.from({ length: levels }, (_, l) => {
    const ratio = (l + 1) / levels;
    const points = metrics
      .map((_, i) => {
        const { x, y } = getCoord(i, ratio);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
    return { ratio, points };
  });

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--kui-space-3)',
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      <div
        role="img"
        aria-label={ariaLabel || `Radar chart comparing ${series.length} series across ${metrics.length} metrics`}
        style={{ width: `${size}px`, height: `${size}px`, maxWidth: '100%' }}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
        >
          {/* Concentric Grid Rings */}
          {levelRings.map((ring, lIdx) => (
            <g key={lIdx}>
              <polygon
                points={ring.points}
                fill="none"
                stroke="var(--kui-color-border)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={cx}
                y={cy - radius * ring.ratio - 3}
                textAnchor="middle"
                fontSize="9"
                fill="var(--kui-color-text-muted)"
              >
                {`${Math.round(ring.ratio * 100)}%`}
              </text>
            </g>
          ))}

          {/* Radial Axis Spokes */}
          {metrics.map((metric, i) => {
            const { x, y, angle } = getCoord(i, 1);
            // Label placement outside the perimeter
            const labelDist = radius + 18;
            const lx = cx + labelDist * Math.cos(angle);
            const ly = cy + labelDist * Math.sin(angle);
            const cos = Math.cos(angle);
            const anchor = cos > 0.1 ? 'start' : cos < -0.1 ? 'end' : 'middle';

            return (
              <g key={metric.key}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="var(--kui-color-border)"
                  strokeWidth="1"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  dominantBaseline="central"
                  fontSize="11"
                  fontWeight="var(--kui-font-weight-medium)"
                  fill="var(--kui-color-text-secondary)"
                >
                  {metric.label}
                </text>
              </g>
            );
          })}

          {/* Series Polygons and Dots */}
          {series.map((s, sIdx) => {
            const color = s.color || defaultColors[sIdx % defaultColors.length];
            const coords = metrics.map((m, i) => {
              const val = s.data[m.key] ?? 0;
              const max = m.max ?? 100;
              const ratio = Math.max(0, Math.min(1, val / max));
              return { ...getCoord(i, ratio), val, label: m.label };
            });

            const pointsStr = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');

            return (
              <g key={s.id}>
                <polygon
                  points={pointsStr}
                  fill={color}
                  fillOpacity={fillOpacity}
                  stroke={color}
                  strokeWidth="2"
                />
                {showDots &&
                  coords.map((c, cIdx) => (
                    <circle
                      key={cIdx}
                      cx={c.x}
                      cy={c.y}
                      r="3.5"
                      fill={color}
                      stroke="var(--kui-color-surface)"
                      strokeWidth="1.5"
                    >
                      <title>{`${s.name} - ${c.label}: ${valueFormatter(c.val, metrics[cIdx].key)}`}</title>
                    </circle>
                  ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      {showLegend && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 'var(--kui-space-3)',
            fontSize: 'var(--kui-font-size-xs)',
            color: 'var(--kui-color-text-secondary)',
          }}
        >
          {series.map((s, sIdx) => {
            const color = s.color || defaultColors[sIdx % defaultColors.length];
            return (
              <span
                key={s.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--kui-space-1)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: color,
                  }}
                />
                <span>{s.name}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   11. ScatterPlot (Correlation & Distribution)
---------------------------------------------------- */
export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
  category?: string;
  color?: string;
  size?: number;
}

export interface ScatterPlotProps {
  data: ScatterPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  xFormatter?: (val: number) => string;
  yFormatter?: (val: number) => string;
  thresholdY?: number;
  thresholdYLabel?: string;
  showGrid?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  xAxisLabel,
  yAxisLabel,
  height = 240,
  xFormatter = (v) => String(v),
  yFormatter = (v) => String(v),
  thresholdY,
  thresholdYLabel,
  showGrid = true,
  className = '',
  style,
  ariaLabel,
}) => {
  if (!data || data.length === 0) return null;

  const width = 600;
  const pad = { top: 20, right: 30, bottom: 40, left: 60 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const rawMinX = Math.min(...data.map((d) => d.x));
  const rawMaxX = Math.max(...data.map((d) => d.x));
  const minX = rawMinX === rawMaxX ? rawMinX - 10 : rawMinX;
  const maxX = rawMinX === rawMaxX ? rawMaxX + 10 : rawMaxX;

  const allY = data.map((d) => d.y);
  if (thresholdY !== undefined) allY.push(thresholdY);
  const rawMinY = Math.min(...allY);
  const rawMaxY = Math.max(...allY);
  const minY = rawMinY === rawMaxY ? rawMinY - 10 : rawMinY;
  const maxY = rawMinY === rawMaxY ? rawMaxY + 10 : rawMaxY;

  const xToPx = (val: number) => pad.left + ((val - minX) / (maxX - minX)) * chartW;
  const yToPx = (val: number) => pad.top + chartH - ((val - minY) / (maxY - minY)) * chartH;

  // Grid ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => minY + f * (maxY - minY));
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => minX + f * (maxX - minX));

  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel || `Scatter plot showing ${data.length} distribution data points`}
      style={{
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        style={{ overflow: 'visible', display: 'block' }}
      >
        {/* Gridlines */}
        {showGrid &&
          yTicks.map((val, idx) => {
            const y = yToPx(val);
            return (
              <g key={idx}>
                <line
                  x1={pad.left}
                  y1={y}
                  x2={pad.left + chartW}
                  y2={y}
                  stroke="var(--kui-color-border)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={pad.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--kui-color-text-muted)"
                >
                  {yFormatter(val)}
                </text>
              </g>
            );
          })}

        {showGrid &&
          xTicks.map((val, idx) => {
            const x = xToPx(val);
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={pad.top}
                  x2={x}
                  y2={pad.top + chartH}
                  stroke="var(--kui-color-border)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={pad.top + chartH + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--kui-color-text-muted)"
                >
                  {xFormatter(val)}
                </text>
              </g>
            );
          })}

        {/* Threshold Line (if provided) */}
        {thresholdY !== undefined && (
          <g>
            <line
              x1={pad.left}
              y1={yToPx(thresholdY)}
              x2={pad.left + chartW}
              y2={yToPx(thresholdY)}
              stroke="var(--kui-color-danger)"
              strokeDasharray="4 2"
              strokeWidth="1.5"
            />
            {thresholdYLabel && (
              <text
                x={pad.left + chartW - 4}
                y={yToPx(thresholdY) - 4}
                textAnchor="end"
                fontSize="10"
                fontWeight="var(--kui-font-weight-semibold)"
                fill="var(--kui-color-danger)"
              >
                {thresholdYLabel}
              </text>
            )}
          </g>
        )}

        {/* Data Points */}
        {data.map((pt, idx) => {
          const px = xToPx(pt.x);
          const py = yToPx(pt.y);
          const color = pt.color || 'var(--kui-color-brand-primary)';
          const r = pt.size || 5;

          return (
            <circle
              key={idx}
              cx={px}
              cy={py}
              r={r}
              fill={color}
              fillOpacity={0.85}
              stroke="var(--kui-color-surface)"
              strokeWidth="1.5"
            >
              <title>{`${pt.label ? `${pt.label}: ` : ''}X: ${xFormatter(pt.x)}, Y: ${yFormatter(pt.y)}`}</title>
            </circle>
          );
        })}

        {/* Axes Titles */}
        {yAxisLabel && (
          <text
            x={14}
            y={pad.top + chartH / 2}
            textAnchor="middle"
            transform={`rotate(-90 14 ${pad.top + chartH / 2})`}
            fontSize="11"
            fill="var(--kui-color-text-secondary)"
          >
            {yAxisLabel}
          </text>
        )}
        {xAxisLabel && (
          <text
            x={pad.left + chartW / 2}
            y={height - 6}
            textAnchor="middle"
            fontSize="11"
            fill="var(--kui-color-text-secondary)"
          >
            {xAxisLabel}
          </text>
        )}
      </svg>
    </div>
  );
};

/* ----------------------------------------------------
   12. StackedBarChart (Multi-Category Composition)
---------------------------------------------------- */
export interface StackedBarSegment {
  key: string;
  label: string;
  value: number;
  color?: string;
}

export interface StackedBarItem {
  label: string;
  segments: StackedBarSegment[];
}

export interface StackedBarChartProps {
  data: StackedBarItem[];
  height?: number;
  orientation?: 'vertical' | 'horizontal';
  valueFormatter?: (val: number) => string;
  showTotal?: boolean;
  showLegend?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  height = 200,
  orientation = 'vertical',
  valueFormatter = (v) => String(v),
  showTotal = true,
  showLegend = true,
  className = '',
  style,
  ariaLabel,
}) => {
  if (!data || data.length === 0) return null;

  const defaultColors = [
    'var(--kui-color-brand-primary)',
    'var(--kui-color-brand-accent)',
    'var(--kui-color-warning)',
    'var(--kui-color-info)',
    'var(--kui-color-danger)',
  ];

  // Calculate totals and max
  const itemsWithTotals = data.map((item) => {
    const total = item.segments.reduce((acc, seg) => acc + seg.value, 0);
    return { ...item, total };
  });

  const maxTotal = Math.max(...itemsWithTotals.map((item) => item.total), 1);

  // Extract distinct segments for legend
  const legendSegments: { key: string; label: string; color: string }[] = [];
  const seenKeys = new Set<string>();
  itemsWithTotals.forEach((item) => {
    item.segments.forEach((seg, sIdx) => {
      if (!seenKeys.has(seg.key)) {
        seenKeys.add(seg.key);
        legendSegments.push({
          key: seg.key,
          label: seg.label,
          color: seg.color || defaultColors[sIdx % defaultColors.length],
        });
      }
    });
  });

  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel || `Stacked bar chart showing ${data.length} categories`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-3)',
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      {orientation === 'vertical' ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 'var(--kui-space-2)',
            height: `${height}px`,
            width: '100%',
            paddingTop: '20px',
          }}
        >
          {itemsWithTotals.map((item, idx) => {
            const barHeightPct = Math.max(4, (item.total / maxTotal) * 100);

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
                  gap: '4px',
                }}
              >
                {showTotal && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 'var(--kui-font-weight-semibold)',
                      color: 'var(--kui-color-text-secondary)',
                      fontFamily: 'var(--kui-font-mono)',
                    }}
                  >
                    {valueFormatter(item.total)}
                  </span>
                )}

                {/* Stacked bar cylinder */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '44px',
                    height: `${barHeightPct}%`,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    borderRadius: 'var(--kui-radius-sm)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--kui-color-surface-subtle)',
                  }}
                >
                  {item.segments.map((seg, sIdx) => {
                    const segHeightPct = item.total > 0 ? (seg.value / item.total) * 100 : 0;
                    const segColor = seg.color || defaultColors[sIdx % defaultColors.length];
                    const pctOfTotal = item.total > 0 ? Math.round((seg.value / item.total) * 100) : 0;

                    return (
                      <div
                        key={seg.key}
                        style={{
                          height: `${segHeightPct}%`,
                          backgroundColor: segColor,
                          transition: 'height 200ms ease',
                        }}
                        title={`${item.label} - ${seg.label}: ${valueFormatter(seg.value)} (${pctOfTotal}%)`}
                      />
                    );
                  })}
                </div>

                <span
                  style={{
                    fontSize: 'var(--kui-font-size-xs)',
                    color: 'var(--kui-color-text-secondary)',
                    textAlign: 'center',
                    marginTop: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        /* Horizontal Mode */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-2)' }}>
          {itemsWithTotals.map((item, idx) => {
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--kui-font-size-xs)' }}>
                  <span style={{ fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-primary)' }}>
                    {item.label}
                  </span>
                  {showTotal && (
                    <span style={{ color: 'var(--kui-color-text-secondary)', fontFamily: 'var(--kui-font-mono)' }}>
                      {valueFormatter(item.total)}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '18px',
                    display: 'flex',
                    borderRadius: 'var(--kui-radius-sm)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--kui-color-surface-subtle)',
                  }}
                >
                  {item.segments.map((seg, sIdx) => {
                    const segWidthPct = item.total > 0 ? (seg.value / item.total) * 100 : 0;
                    const segColor = seg.color || defaultColors[sIdx % defaultColors.length];
                    const pctOfTotal = item.total > 0 ? Math.round((seg.value / item.total) * 100) : 0;

                    return (
                      <div
                        key={seg.key}
                        style={{
                          width: `${segWidthPct}%`,
                          backgroundColor: segColor,
                          transition: 'width 200ms ease',
                        }}
                        title={`${item.label} - ${seg.label}: ${valueFormatter(seg.value)} (${pctOfTotal}%)`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      {showLegend && legendSegments.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--kui-space-3)',
            fontSize: 'var(--kui-font-size-xs)',
            color: 'var(--kui-color-text-secondary)',
            paddingTop: 'var(--kui-space-1)',
          }}
        >
          {legendSegments.map((seg) => (
            <span
              key={seg.key}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--kui-space-1)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  backgroundColor: seg.color,
                }}
              />
              <span>{seg.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   13. Treemap (Proportional Space Allocation)
---------------------------------------------------- */
export interface TreemapNode {
  id: string;
  label: string;
  value: number;
  color?: string;
  category?: string;
}

export interface TreemapProps {
  data: TreemapNode[];
  height?: number;
  valueFormatter?: (val: number) => string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const Treemap: React.FC<TreemapProps> = ({
  data,
  height = 240,
  valueFormatter = (v) => String(v),
  className = '',
  style,
  ariaLabel,
}) => {
  if (!data || data.length === 0) return null;

  const total = data.reduce((acc, d) => acc + d.value, 0);
  const sorted = [...data].sort((a, b) => b.value - a.value);

  const defaultPalette = [
    '#0F4C3A',
    '#165E49',
    '#1E735B',
    '#25876C',
    '#2DD4BF',
    '#14B8A6',
    '#0D9488',
    '#065F46',
  ];

  interface PartitionedRect extends TreemapNode {
    x: number;
    y: number;
    w: number;
    h: number;
    percentage: number;
    color: string;
  }

  // 2D recursive rectangular partition algorithm
  const partition = (
    items: TreemapNode[],
    x: number,
    y: number,
    w: number,
    h: number
  ): PartitionedRect[] => {
    if (items.length === 0) return [];
    if (items.length === 1) {
      const it = items[0];
      const pct = total > 0 ? Math.round((it.value / total) * 100) : 0;
      const c = it.color || defaultPalette[data.findIndex((d) => d.id === it.id) % defaultPalette.length];
      return [{ ...it, x, y, w, h, percentage: pct, color: c }];
    }

    const itemTotal = items.reduce((sum, it) => sum + it.value, 0);
    let cumulative = 0;
    let splitIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < items.length - 1; i++) {
      cumulative += items[i].value;
      const diff = Math.abs(cumulative - (itemTotal - cumulative));
      if (diff < minDiff) {
        minDiff = diff;
        splitIdx = i + 1;
      }
    }

    const left = items.slice(0, splitIdx);
    const right = items.slice(splitIdx);
    const leftSum = left.reduce((s, it) => s + it.value, 0);
    const ratio = itemTotal > 0 ? leftSum / itemTotal : 0.5;

    if (w >= h) {
      const w1 = w * ratio;
      const w2 = w - w1;
      return [
        ...partition(left, x, y, w1, h),
        ...partition(right, x + w1, y, w2, h),
      ];
    } else {
      const h1 = h * ratio;
      const h2 = h - h1;
      return [
        ...partition(left, x, y, w, h1),
        ...partition(right, x, y + h1, w, h2),
      ];
    }
  };

  const viewBoxW = 800;
  const viewBoxH = 400;
  const rects = partition(sorted, 0, 0, viewBoxW, viewBoxH);

  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel || `Treemap showing resource proportions across ${data.length} categories`}
      style={{
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        width="100%"
        height={height}
        style={{ display: 'block', borderRadius: 'var(--kui-radius-sm)', overflow: 'hidden' }}
      >
        {rects.map((r) => {
          const showText = r.w > 60 && r.h > 40;
          const showSubtext = r.w > 80 && r.h > 60;

          return (
            <g key={r.id}>
              <rect
                x={r.x + 1}
                y={r.y + 1}
                width={Math.max(0, r.w - 2)}
                height={Math.max(0, r.h - 2)}
                rx="3"
                fill={r.color}
                stroke="var(--kui-color-surface)"
                strokeWidth="1.5"
                style={{
                  transition: 'opacity 150ms ease',
                  cursor: 'pointer',
                }}
              >
                <title>{`${r.label}: ${valueFormatter(r.value)} (${r.percentage}%)`}</title>
              </rect>

              {showText && (
                <text
                  x={r.x + 8}
                  y={r.y + (showSubtext ? 20 : r.h / 2 + 4)}
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="var(--kui-font-weight-semibold)"
                  style={{ pointerEvents: 'none' }}
                >
                  {r.label}
                </text>
              )}

              {showSubtext && (
                <text
                  x={r.x + 8}
                  y={r.y + 36}
                  fill="rgba(255, 255, 255, 0.85)"
                  fontSize="10"
                  fontFamily="var(--kui-font-mono)"
                  style={{ pointerEvents: 'none' }}
                >
                  {`${valueFormatter(r.value)} (${r.percentage}%)`}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ----------------------------------------------------
   14. UptimeTracker (Service Reliability & 90-Day SLA Grid)
---------------------------------------------------- */
export interface UptimeDay {
  date: string;
  status: 'operational' | 'degraded' | 'outage' | 'nodata';
  uptimePct?: number;
  latencyMs?: number;
  incident?: string;
}

export interface UptimeService {
  id: string;
  name: string;
  currentStatus: 'operational' | 'degraded' | 'outage';
  uptimePercentage: number;
  latencyMs?: number;
  history: UptimeDay[];
}

export interface UptimeTrackerProps {
  services: UptimeService[];
  daysCount?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const UptimeTracker: React.FC<UptimeTrackerProps> = ({
  services,
  daysCount = 60,
  className = '',
  style,
  ariaLabel,
}) => {
  if (!services || services.length === 0) return null;

  const statusColorMap: Record<UptimeDay['status'], string> = {
    operational: 'var(--kui-color-brand-accent)',
    degraded: 'var(--kui-color-warning)',
    outage: 'var(--kui-color-danger)',
    nodata: 'var(--kui-color-border)',
  };

  const statusBadgeVariant: Record<UptimeService['currentStatus'], 'success' | 'warning' | 'danger'> = {
    operational: 'success',
    degraded: 'warning',
    outage: 'danger',
  };

  return (
    <div
      className={className}
      role="region"
      aria-label={ariaLabel || 'Service Uptime and SLA Tracker'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-4)',
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      {services.map((svc) => (
        <div
          key={svc.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--kui-space-2)',
            padding: 'var(--kui-space-3)',
            backgroundColor: 'var(--kui-color-surface)',
            border: '1px solid var(--kui-color-border)',
            borderRadius: 'var(--kui-radius-md)',
          }}
        >
          {/* Service Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--kui-space-2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: statusColorMap[svc.currentStatus],
                }}
              />
              <span
                style={{
                  fontSize: 'var(--kui-font-size-sm)',
                  fontWeight: 'var(--kui-font-weight-semibold)',
                  color: 'var(--kui-color-text-primary)',
                }}
              >
                {svc.name}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  textTransform: 'capitalize',
                  color:
                    statusBadgeVariant[svc.currentStatus] === 'success'
                      ? 'var(--kui-color-brand-primary)'
                      : statusBadgeVariant[svc.currentStatus] === 'warning'
                      ? 'var(--kui-color-warning)'
                      : 'var(--kui-color-danger)',
                  fontWeight: 'var(--kui-font-weight-medium)',
                }}
              >
                {svc.currentStatus}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-3)' }}>
              {svc.latencyMs !== undefined && (
                <span
                  style={{
                    fontSize: 'var(--kui-font-size-xs)',
                    color: 'var(--kui-color-text-secondary)',
                    fontFamily: 'var(--kui-font-mono)',
                  }}
                >
                  {`${svc.latencyMs}ms avg`}
                </span>
              )}
              <span
                style={{
                  fontSize: 'var(--kui-font-size-xs)',
                  fontWeight: 'var(--kui-font-weight-bold)',
                  color: 'var(--kui-color-brand-primary)',
                  fontFamily: 'var(--kui-font-mono)',
                }}
              >
                {`${svc.uptimePercentage}% uptime`}
              </span>
            </div>
          </div>

          {/* Daily Status Bars Ribbon */}
          <div
            role="img"
            aria-label={`${svc.name} ${daysCount}-day availability status ribbon`}
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: '2px',
              height: '28px',
              width: '100%',
              backgroundColor: 'var(--kui-color-surface-subtle)',
              padding: '2px',
              borderRadius: 'var(--kui-radius-sm)',
            }}
          >
            {svc.history.map((day, dIdx) => {
              const bg = statusColorMap[day.status] || statusColorMap.nodata;
              const tooltip = `${day.date}: ${day.status.toUpperCase()}${
                day.uptimePct !== undefined ? ` (${day.uptimePct}%)` : ''
              }${day.latencyMs !== undefined ? ` • ${day.latencyMs}ms` : ''}${
                day.incident ? ` • ${day.incident}` : ''
              }`;

              return (
                <div
                  key={dIdx}
                  tabIndex={0}
                  role="img"
                  title={tooltip}
                  aria-label={tooltip}
                  style={{
                    flex: 1,
                    minWidth: '2px',
                    height: '100%',
                    borderRadius: '2px',
                    backgroundColor: bg,
                    cursor: 'pointer',
                    transition: 'transform 80ms ease, opacity 80ms ease',
                  }}
                />
              );
            })}
          </div>

          {/* Timeframe & Uptime Subtext */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: 'var(--kui-color-text-muted)',
            }}
          >
            <span>{`${daysCount} days ago`}</span>
            <span>{`${svc.uptimePercentage}% uptime`}</span>
            <span>Today</span>
          </div>
        </div>
      ))}

      {/* Global Status Legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          gap: 'var(--kui-space-3)',
          fontSize: '11px',
          color: 'var(--kui-color-text-secondary)',
          paddingTop: 'var(--kui-space-1)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColorMap.operational }} />
          Operational
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColorMap.degraded }} />
          Degraded
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColorMap.outage }} />
          Outage
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColorMap.nodata }} />
          No Data
        </span>
      </div>
    </div>
  );
};

