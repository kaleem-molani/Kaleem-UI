import React, { useId } from 'react';
import { ChevronDownIcon, CheckIcon } from '../common/Icons.js';

/* ----------------------------------------------------
   TextInput
---------------------------------------------------- */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  description,
  error,
  id: customId,
  required,
  disabled,
  style,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const id = customId || generatedId;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)', width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: 'var(--kui-font-size-xs)',
            fontWeight: 'var(--kui-font-weight-medium)',
            color: 'var(--kui-color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--kui-space-1)',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--kui-color-danger)' }} aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      {description && (
        <p id={descriptionId} style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', margin: 0 }}>
          {description}
        </p>
      )}

      <input
        id={id}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={[description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
        style={{
          height: '38px',
          padding: '0 var(--kui-space-3)',
          backgroundColor: 'var(--kui-color-surface)',
          color: 'var(--kui-color-text-primary)',
          border: `1px solid ${error ? 'var(--kui-color-danger)' : 'var(--kui-color-border)'}`,
          borderRadius: 'var(--kui-radius-md)',
          fontSize: 'var(--kui-font-size-sm)',
          transition: 'border-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
          outline: 'none',
          width: '100%',
          ...style,
        }}
        className={`kui-input ${className}`}
        {...props}
      />

      {error && (
        <p id={errorId} role="alert" style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-danger)', margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   Select
---------------------------------------------------- */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  description,
  error,
  options,
  id: customId,
  required,
  disabled,
  style,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const id = customId || generatedId;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)', width: '100%' }}>
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

      {description && (
        <p style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', margin: 0 }}>
          {description}
        </p>
      )}

      <div style={{ position: 'relative', width: '100%' }}>
        <select
          id={id}
          disabled={disabled}
          style={{
            height: '38px',
            width: '100%',
            appearance: 'none',
            padding: '0 var(--kui-space-8) 0 var(--kui-space-3)',
            backgroundColor: 'var(--kui-color-surface)',
            color: 'var(--kui-color-text-primary)',
            border: `1px solid ${error ? 'var(--kui-color-danger)' : 'var(--kui-color-border)'}`,
            borderRadius: 'var(--kui-radius-md)',
            fontSize: 'var(--kui-font-size-sm)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            outline: 'none',
            ...style,
          }}
          className={`kui-select ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div
          style={{
            position: 'absolute',
            right: 'var(--kui-space-3)',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--kui-color-text-muted)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ChevronDownIcon size={14} />
        </div>
      </div>

      {error && (
        <p style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-danger)', margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   Checkbox
---------------------------------------------------- */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  id: customId,
  checked,
  indeterminate,
  onChange,
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const id = customId || generatedId;
  const isCheckedOrIndeterminate = checked || indeterminate;

  return (
    <label
      htmlFor={id}
      style={{
        display: 'inline-flex',
        alignItems: label ? 'flex-start' : 'center',
        gap: label ? 'var(--kui-space-2)' : 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <div
        style={{
          width: '18px',
          height: '18px',
          minWidth: '18px',
          borderRadius: 'var(--kui-radius-sm)',
          border: `1.5px solid ${isCheckedOrIndeterminate ? 'var(--kui-color-brand)' : 'var(--kui-color-border-strong)'}`,
          backgroundColor: isCheckedOrIndeterminate ? 'var(--kui-color-brand)' : 'var(--kui-color-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: label ? '2px' : 0,
          position: 'relative',
          transition: 'all var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
        }}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...props}
        />
        {indeterminate ? (
          <div
            style={{
              width: '8px',
              height: '2px',
              backgroundColor: 'var(--kui-color-canvas)',
              borderRadius: '1px',
              pointerEvents: 'none',
            }}
          />
        ) : checked ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              color: 'var(--kui-color-canvas)',
            }}
          >
            <CheckIcon size={12} />
          </div>
        ) : null}
      </div>

      {(label || description) && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {label && (
            <span style={{ fontSize: 'var(--kui-font-size-sm)', color: 'var(--kui-color-text-primary)' }}>
              {label}
            </span>
          )}
          {description && (
            <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', lineHeight: 'var(--kui-line-height-normal)' }}>
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};

/* ----------------------------------------------------
   Switch
---------------------------------------------------- */
export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--kui-space-3)',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontSize: 'var(--kui-font-size-sm)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-primary)' }}>
          {label}
        </span>
        {description && (
          <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', lineHeight: 'var(--kui-line-height-normal)' }}>
            {description}
          </span>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width: '38px',
          height: '22px',
          minWidth: '38px',
          flexShrink: 0,
          borderRadius: 'var(--kui-radius-full)',
          backgroundColor: checked ? 'var(--kui-color-brand)' : 'var(--kui-color-border-strong)',
          position: 'relative',
          padding: '2px',
          marginTop: '2px',
          transition: 'background-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <span
          style={{
            display: 'block',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            transform: checked ? 'translateX(16px)' : 'translateX(0)',
            transition: 'transform var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
            boxShadow: 'var(--kui-shadow-sm)',
          }}
        />
      </button>
    </div>
  );
};

/* ----------------------------------------------------
   Textarea
---------------------------------------------------- */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  showCount?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  description,
  error,
  showCount = false,
  maxLength,
  value,
  id: customId,
  required,
  disabled,
  style,
  className = '',
  onChange,
  ...props
}) => {
  const generatedId = useId();
  const id = customId || generatedId;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)', width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label
            htmlFor={id}
            style={{
              fontSize: 'var(--kui-font-size-xs)',
              fontWeight: 'var(--kui-font-weight-medium)',
              color: 'var(--kui-color-text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--kui-space-1)',
            }}
          >
            {label}
            {required && <span style={{ color: 'var(--kui-color-danger)' }}>*</span>}
          </label>
          {showCount && maxLength && (
            <span style={{ fontSize: '11px', color: currentLength >= maxLength ? 'var(--kui-color-danger)' : 'var(--kui-color-text-muted)' }}>
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
      )}

      {description && (
        <p id={descriptionId} style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', margin: 0 }}>
          {description}
        </p>
      )}

      <textarea
        id={id}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={[description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
        style={{
          minHeight: '84px',
          padding: 'var(--kui-space-2) var(--kui-space-3)',
          backgroundColor: 'var(--kui-color-surface)',
          color: 'var(--kui-color-text-primary)',
          border: `1px solid ${error ? 'var(--kui-color-danger)' : 'var(--kui-color-border)'}`,
          borderRadius: 'var(--kui-radius-md)',
          fontSize: 'var(--kui-font-size-sm)',
          lineHeight: 'var(--kui-line-height-normal)',
          transition: 'border-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
          outline: 'none',
          resize: 'vertical',
          width: '100%',
          ...style,
        }}
        className={`kui-textarea ${className}`}
        {...props}
      />

      {error && (
        <p id={errorId} style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-danger)', margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   RadioGroup
---------------------------------------------------- */
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label: string;
  description?: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  description,
  name,
  options,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const groupId = useId();
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-desc`;

  return (
    <fieldset
      role="radiogroup"
      aria-labelledby={labelId}
      aria-describedby={description ? descriptionId : undefined}
      style={{
        border: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-2)',
      }}
    >
      <legend
        id={labelId}
        style={{
          fontSize: 'var(--kui-font-size-xs)',
          fontWeight: 'var(--kui-font-weight-medium)',
          color: 'var(--kui-color-text-primary)',
          padding: 0,
          marginBottom: 'var(--kui-space-1)',
        }}
      >
        {label}
      </legend>

      {description && (
        <p id={descriptionId} style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', margin: 0 }}>
          {description}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-2)' }}>
        {options.map((opt) => {
          const optId = `${groupId}-${opt.value}`;
          const isChecked = value === opt.value;
          const isOptDisabled = disabled || opt.disabled;

          return (
            <label
              key={opt.value}
              htmlFor={optId}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--kui-space-2)',
                cursor: isOptDisabled ? 'not-allowed' : 'pointer',
                opacity: isOptDisabled ? 0.6 : 1,
                userSelect: 'none',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  minWidth: '18px',
                  borderRadius: '50%',
                  border: `1.5px solid ${isChecked ? 'var(--kui-color-brand)' : 'var(--kui-color-border-strong)'}`,
                  backgroundColor: 'var(--kui-color-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                  position: 'relative',
                  transition: 'border-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
                }}
              >
                <input
                  type="radio"
                  id={optId}
                  name={name}
                  value={opt.value}
                  checked={isChecked}
                  disabled={isOptDisabled}
                  onChange={() => !isOptDisabled && onChange(opt.value)}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    cursor: isOptDisabled ? 'not-allowed' : 'pointer',
                  }}
                />
                {isChecked && (
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--kui-color-brand)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 'var(--kui-font-size-sm)', color: 'var(--kui-color-text-primary)' }}>
                  {opt.label}
                </span>
                {opt.description && (
                  <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)' }}>
                    {opt.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error && (
        <p style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-danger)', margin: 0 }}>
          {error}
        </p>
      )}
    </fieldset>
  );
};
