import React, { useState, useId } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (id: string) => void;
  ariaLabel?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  ariaLabel,
}) => {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState<string>(() => {
    return defaultTab || (items.length > 0 ? items[0].id : '');
  });

  const isControlled = controlledActiveTab !== undefined;
  const currentTab = isControlled ? controlledActiveTab : uncontrolledActiveTab;
  const baseId = useId();

  const handleSelect = (id: string) => {
    if (!isControlled) {
      setUncontrolledActiveTab(id);
    }
    onChange?.(id);
  };

  const enabledItems = items.filter((item) => !item.disabled);

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (enabledItems.length === 0) return;

    let targetItem: TabItem | undefined;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % enabledItems.length;
      targetItem = enabledItems[nextIndex];
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
      targetItem = enabledItems[prevIndex];
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetItem = enabledItems[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      targetItem = enabledItems[enabledItems.length - 1];
    }

    if (targetItem) {
      handleSelect(targetItem.id);
      const targetBtn = document.getElementById(`${baseId}-tab-${targetItem.id}`);
      targetBtn?.focus();
    }
  };

  const activeItem = items.find((item) => item.id === currentTab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        style={{
          display: 'flex',
          gap: 'var(--kui-space-2)',
          borderBottom: '1px solid var(--kui-color-border)',
          overflowX: 'auto',
        }}
      >
        {items.map((item) => {
          const isSelected = item.id === currentTab;
          const enabledIdx = enabledItems.findIndex((en) => en.id === item.id);

          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${item.id}`}
              disabled={item.disabled}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => handleKeyDown(e, enabledIdx)}
              style={{
                position: 'relative',
                padding: '8px 12px',
                border: 'none',
                background: 'none',
                color: isSelected
                  ? 'var(--kui-color-text-primary)'
                  : 'var(--kui-color-text-secondary)',
                fontWeight: isSelected
                  ? 'var(--kui-font-weight-semibold)'
                  : 'var(--kui-font-weight-medium)',
                fontSize: 'var(--kui-font-size-sm)',
                fontFamily: 'var(--kui-font-sans)',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.5 : 1,
                outline: 'none',
                whiteSpace: 'nowrap',
                transition: 'color 120ms ease',
              }}
            >
              {item.label}
              {isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--kui-color-brand)',
                    borderRadius: '2px 2px 0 0',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeItem && (
        <div
          id={`${baseId}-panel-${activeItem.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeItem.id}`}
          tabIndex={0}
          style={{
            padding: 'var(--kui-space-4) 0',
            outline: 'none',
          }}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};
