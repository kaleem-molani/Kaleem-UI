import React from 'react';
import { Checkbox } from '../primitives/FormControls.js';
import { Spinner } from '../primitives/Feedback.js';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
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
}: DataTableProps<T>): React.ReactElement {
  const allSelected = data.length > 0 && selectedKeys.length === data.length;
  const someSelected = selectedKeys.length > 0 && selectedKeys.length < data.length;

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
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{
                  padding: '10px 14px',
                  fontWeight: 'var(--kui-font-weight-semibold)',
                  color: 'var(--kui-color-text-secondary)',
                  fontSize: 'var(--kui-font-size-xs)',
                  letterSpacing: 'var(--kui-letter-spacing-wide)',
                  textTransform: 'uppercase',
                  width: col.width,
                  textAlign: col.align || 'left',
                }}
              >
                {col.header}
              </th>
            ))}
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
    </div>
  );
}
