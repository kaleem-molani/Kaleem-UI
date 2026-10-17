import React, { useState, useEffect, useRef, useId, useMemo } from 'react';
import { SearchIcon, XIcon } from '../common/Icons.js';
import { Kbd } from '../primitives/Kbd.js';

export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  category?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  keywords?: string[];
  disabled?: boolean;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItem[];
  placeholder?: string;
  defaultCategory?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  items,
  placeholder = 'Type a command or search...',
  className = '',
  style,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Filter items by query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase().trim();
    return items.filter((item) => {
      const matchLabel = item.label.toLowerCase().includes(lower);
      const matchDesc = item.description?.toLowerCase().includes(lower);
      const matchCategory = item.category?.toLowerCase().includes(lower);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(lower));
      return matchLabel || matchDesc || matchCategory || matchKeywords;
    });
  }, [items, query]);

  // Reset active index when query or open changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[activeIndex];
        if (selected && !selected.disabled) {
          selected.onSelect();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredItems, activeIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  if (!open) return null;

  // Group filtered items by category
  const groups: Record<string, CommandPaletteItem[]> = {};
  filteredItems.forEach((item) => {
    const cat = item.category || 'General';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });

  let runningIndex = 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'var(--kui-space-8) var(--kui-space-4)',
        boxSizing: 'border-box',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--kui-color-overlay)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'kui-fade-in 160ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Spotlight Window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Menu"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '580px',
          backgroundColor: 'var(--kui-color-surface)',
          border: '1px solid var(--kui-color-border-strong)',
          borderRadius: 'var(--kui-radius-lg)',
          boxShadow: 'var(--kui-shadow-lg), 0 0 40px rgba(0, 0, 0, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 101,
          animation: 'kui-scale-in 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          ...style,
        }}
        className={`kui-command-palette ${className}`}
      >
        {/* Search Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--kui-space-3)',
            padding: 'var(--kui-space-3) var(--kui-space-4)',
            borderBottom: '1px solid var(--kui-color-border)',
            backgroundColor: 'var(--kui-color-surface)',
          }}
        >
          <div style={{ color: 'var(--kui-color-brand-primary)', display: 'flex', alignItems: 'center' }}>
            <SearchIcon size={18} />
          </div>

          <input
            ref={inputRef}
            id={id}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 'var(--kui-font-size-md)',
              color: 'var(--kui-color-text-primary)',
              fontFamily: 'var(--kui-font-sans)',
            }}
          />

          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--kui-color-text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Clear query"
            >
              <XIcon size={14} />
            </button>
          ) : (
            <Kbd size="sm">ESC</Kbd>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          role="listbox"
          className="kui-scrollbar-subtle"
          style={{
            maxHeight: '360px',
            overflowY: 'auto',
            padding: 'var(--kui-space-2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--kui-space-1)',
          }}
        >
          {filteredItems.length === 0 ? (
            <div
              style={{
                padding: 'var(--kui-space-8) var(--kui-space-4)',
                textAlign: 'center',
                color: 'var(--kui-color-text-muted)',
                fontSize: 'var(--kui-font-size-sm)',
              }}
            >
              No commands or actions found for "{query}".
            </div>
          ) : (
            Object.entries(groups).map(([category, groupItems]) => (
              <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{
                    padding: 'var(--kui-space-2) var(--kui-space-3) 4px var(--kui-space-3)',
                    fontSize: '11px',
                    fontWeight: 'var(--kui-font-weight-semibold)',
                    color: 'var(--kui-color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--kui-letter-spacing-wide)',
                  }}
                >
                  {category}
                </span>

                {groupItems.map((item) => {
                  const currentIndex = runningIndex++;
                  const isSelected = activeIndex === currentIndex;

                  return (
                    <div
                      key={item.id}
                      data-index={currentIndex}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        if (!item.disabled) {
                          item.onSelect();
                          onClose();
                        }
                      }}
                      onMouseEnter={() => setActiveIndex(currentIndex)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--kui-space-2) var(--kui-space-3)',
                        borderRadius: 'var(--kui-radius-md)',
                        backgroundColor: isSelected ? 'var(--kui-color-surface-subtle)' : 'transparent',
                        border: isSelected ? '1px solid var(--kui-color-border)' : '1px solid transparent',
                        cursor: item.disabled ? 'not-allowed' : 'pointer',
                        opacity: item.disabled ? 0.5 : 1,
                        transition: 'background-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-3)', minWidth: 0 }}>
                        {item.icon && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '26px',
                              height: '26px',
                              borderRadius: 'var(--kui-radius-sm)',
                              backgroundColor: isSelected ? 'var(--kui-color-surface)' : 'var(--kui-color-surface-subtle)',
                              border: '1px solid var(--kui-color-border)',
                              color: isSelected ? 'var(--kui-color-brand-primary)' : 'var(--kui-color-text-secondary)',
                              flexShrink: 0,
                            }}
                          >
                            {item.icon}
                          </div>
                        )}
                        <div style={{ minWidth: 0 }}>
                          <span
                            style={{
                              display: 'block',
                              fontSize: 'var(--kui-font-size-sm)',
                              fontWeight: isSelected ? 'var(--kui-font-weight-semibold)' : 'var(--kui-font-weight-medium)',
                              color: 'var(--kui-color-text-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.label}
                          </span>
                          {item.description && (
                            <span
                              style={{
                                display: 'block',
                                fontSize: 'var(--kui-font-size-xs)',
                                color: 'var(--kui-color-text-muted)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {item.description}
                            </span>
                          )}
                        </div>
                      </div>

                      {item.shortcut && (
                        <div style={{ flexShrink: 0, marginLeft: 'var(--kui-space-3)' }}>
                          <Kbd size="sm" keys={item.shortcut} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer Hints */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--kui-space-2) var(--kui-space-4)',
            borderTop: '1px solid var(--kui-color-border)',
            backgroundColor: 'var(--kui-color-surface-subtle)',
            fontSize: '11px',
            color: 'var(--kui-color-text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Kbd size="sm">↑</Kbd>
              <Kbd size="sm">↓</Kbd>
              <span>navigate</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginLeft: '6px' }}>
              <Kbd size="sm">↵</Kbd>
              <span>select</span>
            </span>
          </div>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <Kbd size="sm">esc</Kbd>
            <span>close</span>
          </span>
        </div>
      </div>
    </div>
  );
};
