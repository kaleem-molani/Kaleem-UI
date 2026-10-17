import React, { useState, useRef, useEffect, useId, useMemo } from 'react';
import { ChevronDownIcon, SearchIcon, CheckIcon } from '../common/Icons.js';



/* ----------------------------------------------------
   Option Types
---------------------------------------------------- */
export interface CustomSelectOption<T = string> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface CustomSelectGroup<T = string> {
  label: string;
  options: CustomSelectOption<T>[];
}

export type CustomSelectItem<T = string> = CustomSelectOption<T> | CustomSelectGroup<T>;

export interface CustomSelectProps<T = string> {
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  options: CustomSelectItem<T>[];
  value?: T | null;
  onChange?: (value: T) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  className?: string;
}

const isGroup = <T,>(item: CustomSelectItem<T>): item is CustomSelectGroup<T> => {
  return 'options' in item && Array.isArray((item as CustomSelectGroup<T>).options);
};

export const CustomSelect = <T extends string | number = string>({
  label,
  description,
  error,
  placeholder = 'Select an option...',
  options,
  value,
  onChange,
  searchable = false,
  searchPlaceholder = 'Search options...',
  clearable = false,
  disabled = false,
  required = false,
  id: customId,
  size = 'md',
  style,
  className = '',
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const generatedId = useId();
  const id = customId || generatedId;
  const listboxId = `${id}-listbox`;
  const errorId = `${id}-error`;

  // Flatten all selectable options
  const flatOptions = useMemo(() => {
    const list: CustomSelectOption<T>[] = [];
    options.forEach((item) => {
      if (isGroup(item)) {
        item.options.forEach((opt) => list.push(opt));
      } else {
        list.push(item);
      }
    });
    return list;
  }, [options]);

  // Find currently selected option
  const selectedOption = useMemo(() => {
    if (value === undefined || value === null) return null;
    return flatOptions.find((opt) => opt.value === value) || null;
  }, [flatOptions, value]);

  // Filter options based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase();

    return options
      .map((item) => {
        if (isGroup(item)) {
          const matchingOptions = item.options.filter(
            (opt) =>
              opt.label.toLowerCase().includes(query) ||
              opt.description?.toLowerCase().includes(query)
          );
          if (matchingOptions.length === 0) return null;
          return { ...item, options: matchingOptions };
        } else {
          const matches =
            item.label.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query);
          return matches ? item : null;
        }
      })
      .filter(Boolean) as CustomSelectItem<T>[];
  }, [options, searchQuery]);

  // Flatten currently visible selectable options for keyboard navigation
  const visibleOptions = useMemo(() => {
    const list: CustomSelectOption<T>[] = [];
    filteredItems.forEach((item) => {
      if (isGroup(item)) {
        item.options.forEach((opt) => list.push(opt));
      } else {
        list.push(item);
      }
    });
    return list;
  }, [filteredItems]);

  // Outside pointer click detection
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setActiveIndex(-1);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
      // Set active index to current selection
      if (selectedOption) {
        const idx = visibleOptions.findIndex((opt) => opt.value === selectedOption.value);
        setActiveIndex(idx >= 0 ? idx : 0);
      } else {
        setActiveIndex(0);
      }
    } else {
      setSearchQuery('');
      setActiveIndex(-1);
    }
  }, [isOpen, searchable, selectedOption, visibleOptions]);

  const handleSelect = (option: CustomSelectOption<T>) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
    setSearchQuery('');
    setActiveIndex(-1);
    triggerRef.current?.focus();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('' as unknown as T);
    setSearchQuery('');
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev >= visibleOptions.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? visibleOptions.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < visibleOptions.length) {
        handleSelect(visibleOptions[activeIndex]);
      }
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  // Dimensions based on size prop
  const heightMap = { sm: '32px', md: '38px', lg: '44px' };
  const fontSizeMap = {
    sm: 'var(--kui-font-size-xs)',
    md: 'var(--kui-font-size-sm)',
    lg: 'var(--kui-font-size-base)',
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-1)',
        width: '100%',
        position: 'relative',
        ...style,
      }}
    >
      {/* Accessible Label */}
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: 'var(--kui-font-size-xs)',
            fontWeight: 'var(--kui-font-weight-medium)',
            color: 'var(--kui-color-text-primary)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--kui-color-danger)', marginLeft: '4px' }}>*</span>}
        </label>
      )}

      {/* Helper Description */}
      {description && (
        <p style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', margin: 0 }}>
          {description}
        </p>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-required={required}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
        onKeyDown={handleKeyDown}
        style={{
          height: heightMap[size],
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--kui-space-2)',
          padding: '0 var(--kui-space-3)',
          backgroundColor: 'var(--kui-color-surface)',
          color: selectedOption ? 'var(--kui-color-text-primary)' : 'var(--kui-color-text-muted)',
          border: error ? '1px solid var(--kui-color-danger)' : '1px solid var(--kui-color-border)',
          borderRadius: 'var(--kui-radius-md)',
          fontSize: fontSizeMap[size],
          fontFamily: 'var(--kui-font-sans)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 2px var(--kui-color-focus-ring)' : 'none',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          opacity: disabled ? 0.6 : 1,
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flex: 1, minWidth: 0, overflow: 'hidden' }}>
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, color: 'var(--kui-color-brand-primary)' }}>
                  {selectedOption.icon}
                </span>
              )}
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'var(--kui-font-weight-medium)' }}>
                {selectedOption.label}
              </span>
              {selectedOption.badge && <span style={{ flexShrink: 0 }}>{selectedOption.badge}</span>}
            </>
          ) : (
            <span style={{ color: 'var(--kui-color-text-muted)' }}>{placeholder}</span>
          )}
        </span>

        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-1)', flexShrink: 0 }}>
          {clearable && selectedOption && !disabled && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Clear selection"
              onClick={handleClear}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 18,
                height: 18,
                borderRadius: 'var(--kui-radius-full)',
                color: 'var(--kui-color-text-muted)',
                cursor: 'pointer',
                fontSize: '12px',
                lineHeight: 1,
              }}
            >
              ✕
            </span>
          )}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'var(--kui-color-text-muted)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 150ms ease',
            }}
          >
            <ChevronDownIcon size={16} />
          </span>
        </span>
      </button>

      {/* Error Message */}
      {error && (
        <p id={errorId} role="alert" style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-danger)', margin: 0 }}>
          {error}
        </p>
      )}

      {/* Dropdown Popover Listbox */}
      {isOpen && (
        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          style={{
            position: 'absolute',
            zIndex: 110,
            top: 'calc(100% + var(--kui-space-1))',
            left: 0,
            right: 0,
            backgroundColor: 'var(--kui-color-surface)',
            color: 'var(--kui-color-text-primary)',
            borderRadius: 'var(--kui-radius-md)',
            border: '1px solid var(--kui-color-border)',
            boxShadow: 'var(--kui-shadow-lg)',
            maxHeight: '280px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--kui-space-1)',
            animation: 'kui-dropdown-enter 140ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Optional Search Filter Bar */}
          {searchable && (
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
                backgroundColor: 'var(--kui-color-surface)',
                padding: 'var(--kui-space-1) var(--kui-space-1) var(--kui-space-2) var(--kui-space-1)',
                borderBottom: '1px solid var(--kui-color-border)',
                marginBottom: 'var(--kui-space-1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--kui-space-2)',
                  padding: '0 var(--kui-space-2)',
                  height: '32px',
                  borderRadius: 'var(--kui-radius-sm)',
                  backgroundColor: 'var(--kui-color-surface-subtle)',
                  border: '1px solid var(--kui-color-border)',
                }}
              >
                <SearchIcon size={14} style={{ color: 'var(--kui-color-text-muted)', flexShrink: 0 }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--kui-color-text-primary)',
                    fontSize: 'var(--kui-font-size-xs)',
                    fontFamily: 'var(--kui-font-sans)',
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--kui-color-text-muted)',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '11px',
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Render Items */}
          {visibleOptions.length === 0 ? (
            <div
              style={{
                padding: 'var(--kui-space-4) var(--kui-space-2)',
                textAlign: 'center',
                color: 'var(--kui-color-text-muted)',
                fontSize: 'var(--kui-font-size-xs)',
              }}
            >
              No options found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredItems.map((item, groupIdx) => {
              if (isGroup(item)) {
                return (
                  <div key={`group-${groupIdx}`} role="group" aria-label={item.label} style={{ marginBottom: 'var(--kui-space-1)' }}>
                    <div
                      style={{
                        padding: 'var(--kui-space-2) var(--kui-space-2) var(--kui-space-1) var(--kui-space-2)',
                        fontSize: '11px',
                        fontWeight: 'var(--kui-font-weight-semibold)',
                        color: 'var(--kui-color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.label}
                    </div>
                    {item.options.map((opt) => renderOptionRow(opt))}
                  </div>
                );
              }
              return renderOptionRow(item);
            })
          )}
        </div>
      )}
    </div>
  );

  function renderOptionRow(opt: CustomSelectOption<T>) {
    const isSelected = selectedOption?.value === opt.value;
    const optIndex = visibleOptions.findIndex((o) => o.value === opt.value);
    const isActive = optIndex === activeIndex;

    return (
      <div
        key={String(opt.value)}
        role="option"
        aria-selected={isSelected}
        aria-disabled={opt.disabled}
        onClick={() => handleSelect(opt)}
        onMouseEnter={() => setActiveIndex(optIndex)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--kui-space-2)',
          padding: '8px 10px',
          borderRadius: 'var(--kui-radius-sm)',
          borderLeft: isSelected ? '3px solid var(--kui-color-brand-primary)' : '3px solid transparent',
          backgroundColor: isActive
            ? 'var(--kui-color-surface-subtle)'
            : isSelected
              ? 'var(--kui-color-surface-subtle)'
              : 'transparent',
          color: opt.disabled
            ? 'var(--kui-color-text-muted)'
            : isSelected
              ? 'var(--kui-color-brand-primary)'
              : 'var(--kui-color-text-primary)',
          fontSize: 'var(--kui-font-size-sm)',
          cursor: opt.disabled ? 'not-allowed' : 'pointer',
          opacity: opt.disabled ? 0.5 : 1,
          transition: 'all 120ms ease',
        }}

      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flex: 1, minWidth: 0 }}>
          {opt.icon && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexShrink: 0,
                color: isSelected ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-text-secondary)',
              }}
            >
              {opt.icon}
            </span>
          )}
          <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontWeight: isSelected ? 'var(--kui-font-weight-semibold)' : 'var(--kui-font-weight-medium)' }}>
              {opt.label}
            </span>
            {opt.description && (
              <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', marginTop: '1px' }}>
                {opt.description}
              </span>
            )}
          </span>
        </span>

        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flexShrink: 0 }}>
          {opt.badge}
          {isSelected && (
            <span style={{ color: 'var(--kui-color-brand-primary)', display: 'inline-flex', alignItems: 'center' }}>
              <CheckIcon size={14} strokeWidth={2.5} />
            </span>
          )}
        </span>
      </div>
    );
  }
};
