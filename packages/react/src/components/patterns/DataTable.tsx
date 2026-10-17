import React from 'react';
import { Checkbox } from '../primitives/FormControls.js';
import { Spinner } from '../primitives/Feedback.js';
import { ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from '../common/Icons.js';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export type DataTableHeightMode = 'auto' | 'fill' | 'fixed';

export type DataTableDensity = 'compact' | 'balanced' | 'comfortable';

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  loading?: boolean;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (selectedKeys: string[]) => void;
  ariaLabel?: string;
  sortConfig?: SortConfig;
  onSortChange?: (sortConfig: SortConfig) => void;
  pagination?: React.ReactNode;
  density?: DataTableDensity;
  bulkActions?: React.ReactNode;
  /**
   * Sizing strategy for the table's vertical height:
   * - 'auto' (default): Collapses and adjusts height dynamically to fit the number of rows.
   * - 'fill': Stretches to fill 100% of the parent container or viewport space. If only a few rows exist, the empty space is preserved inside the table below the last row, and pagination stays docked at the bottom.
   * - 'fixed': Enforces a fixed height container with sticky header and internal scrolling.
   */
  heightMode?: DataTableHeightMode;
  /**
   * Convenience boolean flag: when true, activates 'fill' heightMode.
   */
  fullHeight?: boolean;
  /**
   * Explicit height CSS value (e.g., '400px', '70vh', 'calc(100vh - 240px)', '100%').
   */
  height?: string | number;
  /**
   * Minimum height constraint for the table container (defaults to '320px' in 'fill' mode).
   */
  minHeight?: string | number;
  /**
   * Maximum height constraint with internal vertical scrolling.
   */
  maxHeight?: string | number;
  /**
   * Custom style overrides for the outer table container card.
   */
  style?: React.CSSProperties;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyState,
  errorState,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  ariaLabel = 'Data table',
  sortConfig,
  onSortChange,
  pagination,
  density = 'balanced',
  bulkActions,
  heightMode = 'auto',
  fullHeight = false,
  height,
  minHeight,
  maxHeight,
  style,
}: DataTableProps<T>): React.ReactElement {
  const effectiveHeightMode: DataTableHeightMode = fullHeight
    ? 'fill'
    : height && heightMode === 'auto'
      ? 'fixed'
      : heightMode;

  const isFill = effectiveHeightMode === 'fill';
  const isFixed = effectiveHeightMode === 'fixed';
  const isExpanded = isFill || isFixed;

  const containerHeight = isFill
    ? (height ?? '100%')
    : isFixed
      ? (height ?? '500px')
      : height;

  const containerMinHeight = minHeight ?? (isFill ? '320px' : undefined);

  const cellPaddings: Record<DataTableDensity, string> = {
    compact: '6px 12px',
    balanced: '12px 14px',
    comfortable: '16px 18px',
  };

  const headerPaddings: Record<DataTableDensity, string> = {
    compact: '6px 12px',
    balanced: '10px 14px',
    comfortable: '14px 18px',
  };

  const fontSizes: Record<DataTableDensity, string> = {
    compact: '0.8125rem',
    balanced: 'var(--kui-font-size-sm)',
    comfortable: '0.9375rem',
  };

  const allSelected = data.length > 0 && selectedKeys.length === data.length;
  const someSelected = selectedKeys.length > 0 && selectedKeys.length < data.length;

  const handleHeaderClick = (col: DataTableColumn<T>) => {
    if (!col.sortable || !onSortChange) return;
    if (sortConfig && sortConfig.key === col.key) {
      onSortChange({
        key: col.key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onSortChange({
        key: col.key,
        direction: 'asc',
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      onSelectionChange(data.map((item) => keyExtractor(item)));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (key: string, checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      onSelectionChange([...selectedKeys, key]);
    } else {
      onSelectionChange(selectedKeys.filter((k) => k !== key));
    }
  };

  if (errorState) {
    return <div style={{ width: '100%' }}>{errorState}</div>;
  }

  return (
    <div
      data-height-mode={effectiveHeightMode}
      data-density={density}
      style={{
        width: '100%',
        height: containerHeight,
        minHeight: containerMinHeight,
        maxHeight: maxHeight,
        display: isExpanded ? 'flex' : 'block',
        flexDirection: isExpanded ? 'column' : undefined,
        border: '1px solid var(--kui-color-border)',
        borderRadius: 'var(--kui-radius-md)',
        backgroundColor: 'var(--kui-color-surface)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          overflowY: isExpanded ? 'auto' : undefined,
          flex: isExpanded ? '1 1 auto' : undefined,
          minHeight: 0,
        }}
      >
        <table
          aria-label={ariaLabel}
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: fontSizes[density],
            fontFamily: 'var(--kui-font-sans)',
            fontVariantNumeric: 'tabular-nums',
            textAlign: 'left',
          }}
        >
          <thead
            style={{
              position: isExpanded ? 'sticky' : undefined,
              top: 0,
              zIndex: 2,
              backgroundColor: 'var(--kui-color-surface-subtle)',
            }}
          >
            <tr
              style={{
                borderBottom: '1px solid var(--kui-color-border)',
                backgroundColor: 'var(--kui-color-surface-subtle)',
              }}
            >
            {selectable && (
              <th style={{ width: '44px', padding: headerPaddings[density], textAlign: 'center' }}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((col) => {
              const isSorted = sortConfig?.key === col.key;
              const sortAria = col.sortable
                ? isSorted
                  ? sortConfig.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
                : undefined;

              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={sortAria}
                  style={{
                    padding: col.sortable ? '4px 6px' : headerPaddings[density],
                    fontWeight: 'var(--kui-font-weight-semibold)',
                    color: 'var(--kui-color-text-secondary)',
                    fontSize: 'var(--kui-font-size-xs)',
                    letterSpacing: 'var(--kui-letter-spacing-wide)',
                    textTransform: 'uppercase',
                    width: col.width,
                    textAlign: col.align || 'left',
                  }}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleHeaderClick(col)}
                      aria-label={`Sort by ${col.header}${isSorted ? `, currently ${sortConfig?.direction === 'asc' ? 'ascending' : 'descending'}` : ''}`}
                      style={{
                        all: 'unset',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 6px',
                        borderRadius: 'var(--kui-radius-sm)',
                        cursor: 'pointer',
                        fontWeight: 'inherit',
                        color: isSorted ? 'var(--kui-color-brand-primary)' : 'inherit',
                        fontSize: 'inherit',
                        letterSpacing: 'inherit',
                        textTransform: 'inherit',
                        transition: 'background-color 100ms ease, color 100ms ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--kui-color-surface-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>{col.header}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {isSorted ? (
                          sortConfig?.direction === 'asc' ? (
                            <ArrowUpIcon size={13} />
                          ) : (
                            <ArrowDownIcon size={13} />
                          )
                        ) : (
                          <ArrowUpDownIcon size={13} style={{ opacity: 0.4 }} />
                        )}
                      </span>
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                style={{
                  padding: 'var(--kui-space-8)',
                  textAlign: 'center',
                  color: 'var(--kui-color-text-secondary)',
                }}
              >
                <Spinner size={24} label="Loading data records..." />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                style={{ padding: 'var(--kui-space-6)', textAlign: 'center' }}
              >
                {emptyState || (
                  <span style={{ color: 'var(--kui-color-text-secondary)' }}>
                    No records found.
                  </span>
                )}
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const rowKey = keyExtractor(item);
              const isSelected = selectedKeys.includes(rowKey);

              return (
                <tr
                  key={rowKey}
                  aria-selected={selectable ? isSelected : undefined}
                  style={{
                    borderBottom: '1px solid var(--kui-color-border)',
                    backgroundColor: isSelected
                      ? 'var(--kui-color-surface-subtle)'
                      : 'transparent',
                    transition: 'background-color 100ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'var(--kui-color-surface-subtle)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {selectable && (
                    <td style={{ width: '44px', padding: cellPaddings[density], textAlign: 'center' }}>
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(rowKey, e.target.checked)}
                        aria-label={`Select row ${rowKey}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: cellPaddings[density],
                        color: 'var(--kui-color-text-primary)',
                        textAlign: col.align || 'left',
                      }}
                    >
                      {col.render
                        ? col.render(item)
                        : (item as Record<string, unknown>)[col.key] != null
                          ? String((item as Record<string, unknown>)[col.key])
                          : null}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      </div>
      {pagination && (
        <div
          style={{
            borderTop: '1px solid var(--kui-color-border)',
            padding: '12px 16px',
            backgroundColor: 'var(--kui-color-surface-subtle)',
            flexShrink: 0,
            marginTop: isExpanded ? 'auto' : undefined,
          }}
        >
          {pagination}
        </div>
      )}
      {bulkActions && selectedKeys.length > 0 && bulkActions}
    </div>
  );
}

/* ----------------------------------------------------
   BulkActionsBar
---------------------------------------------------- */
export interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection?: () => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  onClearSelection,
  actions,
  children,
  className = '',
  style,
}) => {
  if (selectedCount <= 0) return null;

  return (
    <div
      role="region"
      aria-label="Bulk actions bar"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--kui-space-3)',
        padding: '6px 14px',
        backgroundColor: 'var(--kui-color-surface)',
        border: '1px solid var(--kui-color-border-strong)',
        borderRadius: 'var(--kui-radius-full)',
        boxShadow: 'var(--kui-shadow-lg), 0 8px 32px rgba(0, 0, 0, 0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'kui-scale-in 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
      className={`kui-bulk-actions-bar ${className}`}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--kui-space-2)',
          fontSize: 'var(--kui-font-size-xs)',
          fontWeight: 'var(--kui-font-weight-medium)',
          color: 'var(--kui-color-text-primary)',
          paddingRight: 'var(--kui-space-2)',
          borderRight: '1px solid var(--kui-color-border)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 8px',
            borderRadius: 'var(--kui-radius-full)',
            backgroundColor: 'var(--kui-color-surface-subtle)',
            border: '1px solid var(--kui-color-border)',
            fontWeight: 700,
            fontSize: '11px',
            color: 'var(--kui-color-brand-primary)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {selectedCount}
        </span>
        <span>selected</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
        {actions || children}
      </div>

      {onClearSelection && (
        <button
          type="button"
          onClick={onClearSelection}
          style={{
            all: 'unset',
            fontSize: 'var(--kui-font-size-xs)',
            color: 'var(--kui-color-text-muted)',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: 'var(--kui-radius-sm)',
            transition: 'color 100ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--kui-color-text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--kui-color-text-muted)';
          }}
        >
          Deselect
        </button>
      )}
    </div>
  );
};


export function paginateAndSortData<T>(
  items: T[],
  sortConfig?: SortConfig,
  currentPage = 1,
  pageSize = 10
): { paginatedData: T[]; totalPages: number; totalItems: number } {
  const result = [...items];

  if (sortConfig) {
    result.sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortConfig.key];
      const bVal = (b as Record<string, unknown>)[sortConfig.key];

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }

  const totalItems = result.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (safePage - 1) * pageSize;
  const paginatedData = result.slice(start, start + pageSize);

  return { paginatedData, totalPages, totalItems };
}
