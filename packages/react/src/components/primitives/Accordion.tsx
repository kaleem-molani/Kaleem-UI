import React, { useState, useId } from 'react';
import { ChevronDownIcon } from '../common/Icons.js';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);
  const baseId = useId();

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const isExpanded = prev.includes(id);
      if (allowMultiple) {
        return isExpanded ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return isExpanded ? [] : [id];
    });
  };

  return (
    <div
      style={{
        border: '1px solid var(--kui-color-border)',
        borderRadius: 'var(--kui-radius-md)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {items.map((item, index) => {
        const isExpanded = expandedIds.includes(item.id);
        const isLast = index === items.length - 1;
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            style={{
              borderBottom: isLast ? 'none' : '1px solid var(--kui-color-border)',
            }}
          >
            <h3 style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit' }}>
              <button
                id={triggerId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: isExpanded ? 'var(--kui-color-surface-subtle)' : 'var(--kui-color-surface)',
                  color: 'var(--kui-color-text-primary)',
                  fontSize: 'var(--kui-font-size-sm)',
                  fontWeight: 'var(--kui-font-weight-medium)',
                  fontFamily: 'var(--kui-font-sans)',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.5 : 1,
                  textAlign: 'left',
                  transition: 'background-color 150ms ease',
                }}
              >
                <span>{item.title}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 180ms ease',
                    color: 'var(--kui-color-text-secondary)',
                  }}
                >
                  <ChevronDownIcon size={16} />
                </span>
              </button>
            </h3>
            {isExpanded && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--kui-color-surface)',
                  color: 'var(--kui-color-text-secondary)',
                  fontSize: 'var(--kui-font-size-sm)',
                  lineHeight: 'var(--kui-line-height-normal)',
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
