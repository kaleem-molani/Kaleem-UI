import React from 'react';
import { SearchIcon, XIcon } from '../common/Icons.js';
import { Badge } from '../primitives/Badge.js';
import { Button } from '../primitives/Button.js';
import { Inline } from '../primitives/Layout.js';

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  style,
  ...props
}) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '320px',
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: '10px',
          display: 'inline-flex',
          alignItems: 'center',
          color: 'var(--kui-color-text-secondary)',
          pointerEvents: 'none',
        }}
      >
        <SearchIcon size={15} />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: '36px',
          paddingLeft: '32px',
          paddingRight: value && onClear ? '30px' : '12px',
          fontSize: 'var(--kui-font-size-sm)',
          fontFamily: 'var(--kui-font-sans)',
          color: 'var(--kui-color-text-primary)',
          backgroundColor: 'var(--kui-color-surface)',
          border: '1px solid var(--kui-color-border)',
          borderRadius: 'var(--kui-radius-md)',
          outline: 'none',
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          style={{
            position: 'absolute',
            right: '8px',
            border: 'none',
            background: 'none',
            color: 'var(--kui-color-text-secondary)',
            cursor: 'pointer',
            padding: 2,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
};

export interface ActiveFilter {
  id: string;
  label: string;
  onRemove: () => void;
}

export interface FilterBarProps {
  searchField?: React.ReactNode;
  filters?: React.ReactNode;
  activeFilters?: ActiveFilter[];
  onReset?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchField,
  filters,
  activeFilters = [],
  onReset,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-3)',
        width: '100%',
        marginBottom: 'var(--kui-space-3)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--kui-space-3)',
        }}
      >
        <div style={{ flex: '1 1 240px', maxWidth: '340px' }}>
          {searchField}
        </div>
        {filters && (
          <Inline gap={2} align="center">
            {filters}
          </Inline>
        )}
      </div>

      {activeFilters.length > 0 && (
        <Inline gap={2} align="center">
          <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-secondary)' }}>
            Active filters:
          </span>
          {activeFilters.map((filter) => (
            <Badge key={filter.id} variant="neutral" size="sm">
              <span>{filter.label}</span>
              <button
                type="button"
                aria-label={`Remove filter ${filter.label}`}
                onClick={filter.onRemove}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: 4,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <XIcon size={12} />
              </button>
            </Badge>
          ))}
          {onReset && (
            <Button variant="ghost" size="sm" onClick={onReset} style={{ height: '24px', fontSize: 'var(--kui-font-size-xs)' }}>
              Reset all
            </Button>
          )}
        </Inline>
      )}
    </div>
  );
};
