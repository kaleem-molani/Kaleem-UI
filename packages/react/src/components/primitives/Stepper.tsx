import React from 'react';
import { CheckIcon } from '../common/Icons.js';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  optional?: boolean;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = 'horizontal',
  className = '',
  style,
  ariaLabel = 'Progress',
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <nav
      aria-label={ariaLabel}
      className={className}
      style={{
        width: '100%',
        fontFamily: 'var(--kui-font-sans)',
        ...style,
      }}
    >
      <ol
        role="list"
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: isHorizontal ? 'center' : 'flex-start',
          justifyContent: isHorizontal ? 'space-between' : 'flex-start',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: isHorizontal ? 'var(--kui-space-2)' : 'var(--kui-space-4)',
        }}
      >
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isLast = index === steps.length - 1;
          const isClickable = Boolean(onStepClick);

          const stepStatusText = isCompleted ? 'Completed' : isActive ? 'Current step' : 'Upcoming';

          return (
            <li
              key={step.id}
              style={{
                display: 'flex',
                flex: isHorizontal ? (isLast ? '0 0 auto' : '1 1 0%') : '0 0 auto',
                alignItems: isHorizontal ? 'center' : 'flex-start',
                width: isHorizontal ? (isLast ? 'auto' : '100%') : '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--kui-space-3)',
                }}
              >
                {/* Step Circle Button / Indicator */}
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => onStepClick && onStepClick(index)}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${index + 1}: ${step.title} (${stepStatusText})`}
                  style={{
                    all: 'unset',
                    cursor: isClickable ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    fontSize: 'var(--kui-font-size-sm)',
                    fontWeight: 'var(--kui-font-weight-semibold)',
                    backgroundColor: isCompleted
                      ? 'var(--kui-color-brand-primary)'
                      : isActive
                        ? 'var(--kui-color-surface)'
                        : 'var(--kui-color-surface-subtle)',
                    color: isCompleted
                      ? 'var(--kui-color-brand-contrast)'
                      : isActive
                        ? 'var(--kui-color-brand-primary)'
                        : 'var(--kui-color-text-muted)',
                    border: isCompleted
                      ? '2px solid var(--kui-color-brand-primary)'
                      : isActive
                        ? '2px solid var(--kui-color-brand-primary)'
                        : '1.5px solid var(--kui-color-border)',
                    boxShadow: isActive ? '0 0 0 3px var(--kui-color-accent-subtle)' : 'none',
                    transition: 'all 150ms ease',
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? <CheckIcon size={16} /> : index + 1}
                </button>

                {/* Step Text Info */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: 'var(--kui-font-size-sm)',
                      fontWeight: isActive
                        ? 'var(--kui-font-weight-semibold)'
                        : 'var(--kui-font-weight-medium)',
                      color: isActive || isCompleted
                        ? 'var(--kui-color-text-primary)'
                        : 'var(--kui-color-text-secondary)',
                      whiteSpace: isHorizontal ? 'nowrap' : 'normal',
                    }}
                  >
                    {step.title}
                    {step.optional && (
                      <span
                        style={{
                          fontSize: 'var(--kui-font-size-xs)',
                          color: 'var(--kui-color-text-muted)',
                          marginLeft: '6px',
                          fontWeight: 'var(--kui-font-weight-normal)',
                        }}
                      >
                        (Optional)
                      </span>
                    )}
                  </div>
                  {step.description && (
                    <div
                      style={{
                        fontSize: 'var(--kui-font-size-xs)',
                        color: 'var(--kui-color-text-muted)',
                        marginTop: '2px',
                      }}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting Line (Horizontal) */}
              {isHorizontal && !isLast && (
                <div
                  aria-hidden="true"
                  style={{
                    flex: '1 1 0%',
                    height: '2px',
                    marginLeft: 'var(--kui-space-3)',
                    marginRight: 'var(--kui-space-3)',
                    backgroundColor: isCompleted
                      ? 'var(--kui-color-brand-primary)'
                      : 'var(--kui-color-border)',
                    transition: 'background-color 200ms ease',
                  }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
