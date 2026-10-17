import React, { useId, useRef } from 'react';

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  label,
  description,
  disabled = false,
  className = '',
  style,
}: SegmentedControlProps<T>) {
  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const descriptionId = `${generatedId}-desc`;
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const heights: Record<'sm' | 'md' | 'lg', string> = {
    sm: '28px',
    md: '36px',
    lg: '44px',
  };

  const fontSizes: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'var(--kui-font-size-xs)',
    md: 'var(--kui-font-size-sm)',
    lg: 'var(--kui-font-size-md)',
  };

  const paddings: Record<'sm' | 'md' | 'lg', string> = {
    sm: '0 var(--kui-space-2)',
    md: '0 var(--kui-space-3)',
    lg: '0 var(--kui-space-4)',
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (disabled) return;

    const enabledIndices = options
      .map((opt, i) => (!opt.disabled ? i : -1))
      .filter((i) => i !== -1);

    if (enabledIndices.length === 0) return;

    const currentPos = enabledIndices.indexOf(currentIndex);
    let targetIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextPos = (currentPos + 1) % enabledIndices.length;
      targetIndex = enabledIndices[nextPos];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevPos = (currentPos - 1 + enabledIndices.length) % enabledIndices.length;
      targetIndex = enabledIndices[prevPos];
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = enabledIndices[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = enabledIndices[enabledIndices.length - 1];
    } else {
      return;
    }

    const nextOption = options[targetIndex];
    if (nextOption && !nextOption.disabled) {
      onChange(nextOption.value);
      itemRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-1)',
        width: fullWidth ? '100%' : 'fit-content',
        ...style,
      }}
      className={className}
    >
      {label && (
        <span
          id={labelId}
          style={{
            fontSize: 'var(--kui-font-size-xs)',
            fontWeight: 'var(--kui-font-weight-medium)',
            color: 'var(--kui-color-text-primary)',
          }}
        >
          {label}
        </span>
      )}

      {description && (
        <p
          id={descriptionId}
          style={{
            fontSize: 'var(--kui-font-size-xs)',
            color: 'var(--kui-color-text-muted)',
            margin: 0,
          }}
        >
          {description}
        </p>
      )}

      <div
        role="radiogroup"
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: 'var(--kui-color-surface-subtle)',
          border: '1px solid var(--kui-color-border)',
          borderRadius: 'var(--kui-radius-md)',
          padding: '3px',
          gap: '2px',
          width: fullWidth ? '100%' : 'fit-content',
          opacity: disabled ? 0.6 : 1,
          boxSizing: 'border-box',
        }}
      >
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <button
              key={option.value}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isDisabled}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => {
                if (!isDisabled) {
                  onChange(option.value);
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                flex: fullWidth ? 1 : 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--kui-space-2)',
                height: heights[size],
                padding: paddings[size],
                fontSize: fontSizes[size],
                fontWeight: isSelected
                  ? 'var(--kui-font-weight-semibold)'
                  : 'var(--kui-font-weight-medium)',
                fontFamily: 'var(--kui-font-sans)',
                color: isDisabled
                  ? 'var(--kui-color-text-muted)'
                  : isSelected
                  ? 'var(--kui-color-text-primary)'
                  : 'var(--kui-color-text-secondary)',
                backgroundColor: isSelected ? 'var(--kui-color-surface)' : 'transparent',
                border: isSelected ? '1px solid var(--kui-color-border)' : '1px solid transparent',
                borderRadius: 'var(--kui-radius-sm)',
                boxShadow: isSelected ? 'var(--kui-shadow-sm)' : 'none',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                transition:
                  'all var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
                outline: 'none',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {option.icon && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isSelected
                      ? 'var(--kui-color-brand-primary)'
                      : 'var(--kui-color-text-muted)',
                  }}
                >
                  {option.icon}
                </span>
              )}
              <span>{option.label}</span>
              {option.badge && <span>{option.badge}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
