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
}: DataTableProps<T>): React.ReactElement {
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
      style={{
        width: '100%',
        overflowX: 'auto',
        border: '1px solid var(--kui-color-border)',
        borderRadius: 'var(--kui-radius-md)',
        backgroundColor: 'var(--kui-color-surface)',
      }}
    >
      <table
        aria-label={ariaLabel}
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 'var(--kui-font-size-sm)',
          fontFamily: 'var(--kui-font-sans)',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: '1px solid var(--kui-color-border)',
              backgroundColor: 'var(--kui-color-surface-subtle)',
            }}
          >
            {selectable && (
              <th style={{ width: '44px', padding: '10px 12px', textAlign: 'center' }}>
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
                    padding: col.sortable ? '6px 8px' : '10px 14px',
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
                    <td style={{ width: '44px', padding: '12px', textAlign: 'center' }}>
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
                        padding: '12px 14px',
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
      {pagination && (
        <div
          style={{
            borderTop: '1px solid var(--kui-color-border)',
            padding: '12px 16px',
            backgroundColor: 'var(--kui-color-surface-subtle)',
          }}
        >
          {pagination}
        </div>
      )}
    </div>
  );
}

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
