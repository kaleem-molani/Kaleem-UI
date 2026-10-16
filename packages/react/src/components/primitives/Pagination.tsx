import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons.js';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  siblingCount?: number;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): (number | 'ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, 'ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  );
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  siblingCount = 1,
  ariaLabel = 'Pagination Navigation',
  className = '',
  style,
}: PaginationProps): React.ReactElement {
  const pages = getPaginationRange(currentPage, totalPages, siblingCount);
  const effectivePageSize = pageSize || 10;

  const startItem = totalItems !== undefined ? (currentPage - 1) * effectivePageSize + 1 : undefined;
  const endItem = totalItems !== undefined ? Math.min(currentPage * effectivePageSize, totalItems) : undefined;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      aria-label={ariaLabel}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--kui-space-3)',
        fontSize: 'var(--kui-font-size-sm)',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-3)', flexWrap: 'wrap' }}>
        {totalItems !== undefined && (
          <span style={{ color: 'var(--kui-color-text-secondary)', fontSize: 'var(--kui-font-size-sm)' }}>
            Showing{' '}
            <strong style={{ color: 'var(--kui-color-text-primary)' }}>
              {totalItems === 0 ? 0 : startItem}
            </strong>
            {' '}&ndash;{' '}
            <strong style={{ color: 'var(--kui-color-text-primary)' }}>{endItem}</strong> of{' '}
            <strong style={{ color: 'var(--kui-color-text-primary)' }}>{totalItems}</strong> results
          </span>
        )}

        {pageSizeOptions && onPageSizeChange && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-1-5)' }}>
            <label
              htmlFor="kui-pagination-pagesize"
              style={{ color: 'var(--kui-color-text-secondary)', fontSize: 'var(--kui-font-size-xs)' }}
            >
              Rows per page:
            </label>
            <select
              id="kui-pagination-pagesize"
              value={effectivePageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              aria-label="Rows per page"
              style={{
                height: '28px',
                padding: '0 8px',
                borderRadius: 'var(--kui-radius-sm)',
                border: '1px solid var(--kui-color-border)',
                backgroundColor: 'var(--kui-color-surface)',
                color: 'var(--kui-color-text-primary)',
                fontSize: 'var(--kui-font-size-xs)',
                cursor: 'pointer',
              }}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-1)' }}>
        <button
          type="button"
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          aria-label="Previous page"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '32px',
            height: '32px',
            padding: '0 8px',
            borderRadius: 'var(--kui-radius-sm)',
            border: '1px solid var(--kui-color-border)',
            backgroundColor: 'transparent',
            color: isFirstPage ? 'var(--kui-color-text-muted)' : 'var(--kui-color-text-primary)',
            cursor: isFirstPage ? 'not-allowed' : 'pointer',
            opacity: isFirstPage ? 0.5 : 1,
            transition: 'background-color 120ms ease, border-color 120ms ease',
          }}
        >
          <ChevronLeftIcon size={14} />
          <span style={{ marginLeft: '4px', fontSize: 'var(--kui-font-size-xs)' }}>Prev</span>
        </button>

        {pages.map((p, idx) => {
          if (p === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${idx}`}
                aria-hidden="true"
                style={{
                  minWidth: '24px',
                  textAlign: 'center',
                  color: 'var(--kui-color-text-muted)',
                  fontSize: 'var(--kui-font-size-sm)',
                }}
              >
                &hellip;
              </span>
            );
          }

          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={isActive ? 'page' : undefined}
              style={{
                minWidth: '32px',
                height: '32px',
                padding: '0 6px',
                borderRadius: 'var(--kui-radius-sm)',
                border: isActive
                  ? '1px solid var(--kui-color-brand-primary)'
                  : '1px solid var(--kui-color-border)',
                backgroundColor: isActive
                  ? 'var(--kui-color-brand-primary)'
                  : 'transparent',
                color: isActive
                  ? 'var(--kui-color-brand-contrast)'
                  : 'var(--kui-color-text-primary)',
                fontWeight: isActive
                  ? 'var(--kui-font-weight-semibold)'
                  : 'var(--kui-font-weight-normal)',
                fontSize: 'var(--kui-font-size-sm)',
                cursor: isActive ? 'default' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 120ms ease, color 120ms ease',
              }}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          disabled={isLastPage}
          aria-label="Next page"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '32px',
            height: '32px',
            padding: '0 8px',
            borderRadius: 'var(--kui-radius-sm)',
            border: '1px solid var(--kui-color-border)',
            backgroundColor: 'transparent',
            color: isLastPage ? 'var(--kui-color-text-muted)' : 'var(--kui-color-text-primary)',
            cursor: isLastPage ? 'not-allowed' : 'pointer',
            opacity: isLastPage ? 0.5 : 1,
            transition: 'background-color 120ms ease, border-color 120ms ease',
          }}
        >
          <span style={{ marginRight: '4px', fontSize: 'var(--kui-font-size-xs)' }}>Next</span>
          <ChevronRightIcon size={14} />
        </button>
      </div>
    </nav>
  );
}
