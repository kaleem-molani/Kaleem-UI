import React, {
  useState,
  useRef,
  useEffect,
  useId,
  createContext,
  useContext,
  cloneElement,
  forwardRef,
} from 'react';

import { CheckIcon } from '../common/Icons.js';

/* ----------------------------------------------------
   Item Types for Declarative Configuration Array
---------------------------------------------------- */
export interface DropdownMenuBaseItem {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface DropdownMenuActionItem extends DropdownMenuBaseItem {
  type?: 'item';
  label: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  badge?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuCheckboxItemConfig extends DropdownMenuBaseItem {
  type: 'checkbox';
  label: React.ReactNode;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  shortcut?: string;
}

export interface DropdownMenuSeparatorConfig extends DropdownMenuBaseItem {
  type: 'separator';
}

export interface DropdownMenuGroupConfig extends DropdownMenuBaseItem {
  type: 'group';
  label?: string;
  items: (DropdownMenuActionItem | DropdownMenuCheckboxItemConfig | DropdownMenuSeparatorConfig)[];
}

export interface DropdownMenuHeaderConfig extends DropdownMenuBaseItem {
  type: 'header';
  content: React.ReactNode;
}

export type DropdownMenuItem =
  | DropdownMenuActionItem
  | DropdownMenuCheckboxItemConfig
  | DropdownMenuSeparatorConfig
  | DropdownMenuGroupConfig
  | DropdownMenuHeaderConfig;

/* ----------------------------------------------------
   Context for Compound Components
---------------------------------------------------- */
interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuId: string;
  triggerRef: React.RefObject<HTMLButtonElement | HTMLElement | null>;
  closeMenu: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('Dropdown compound components must be rendered within a <DropdownMenu>');
  }
  return ctx;
};

/* ----------------------------------------------------
   DropdownMenu Header Primitive
---------------------------------------------------- */
export interface DropdownMenuHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DropdownMenuHeader: React.FC<DropdownMenuHeaderProps> = ({
  children,
  style,
  ...props
}) => (
  <div
    style={{
      padding: 'var(--kui-space-2) var(--kui-space-3)',
      borderBottom: '1px solid var(--kui-color-border)',
      marginBottom: 'var(--kui-space-1)',
      backgroundColor: 'var(--kui-color-surface-subtle)',
      borderTopLeftRadius: 'calc(var(--kui-radius-md) - 1px)',
      borderTopRightRadius: 'calc(var(--kui-radius-md) - 1px)',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

/* ----------------------------------------------------
   DropdownMenu Separator Primitive
---------------------------------------------------- */
export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
  style,
  ...props
}) => (
  <div
    role="separator"
    aria-orientation="horizontal"
    style={{
      height: '1px',
      backgroundColor: 'var(--kui-color-border)',
      margin: 'var(--kui-space-1) 0',
      ...style,
    }}
    {...props}
  />
);

/* ----------------------------------------------------
   DropdownMenu Group & Label Primitives
---------------------------------------------------- */
export interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: React.ReactNode;
}

export const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({
  label,
  children,
  style,
  ...props
}) => (
  <div role="group" aria-label={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px', ...style }} {...props}>
    {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
    {children}
  </div>
);

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({
  children,
  style,
  ...props
}) => (
  <div
    style={{
      padding: 'var(--kui-space-2) var(--kui-space-2) var(--kui-space-1) var(--kui-space-2)',
      fontSize: '11px',
      fontWeight: 'var(--kui-font-weight-semibold)',
      color: 'var(--kui-color-text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      userSelect: 'none',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

/* ----------------------------------------------------
   DropdownMenu Shortcut Primitive
---------------------------------------------------- */
export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const DropdownMenuShortcut: React.FC<DropdownMenuShortcutProps> = ({
  children,
  style,
  ...props
}) => (
  <kbd
    style={{
      marginLeft: 'auto',
      padding: '1px 5px',
      fontSize: '11px',
      fontFamily: 'var(--kui-font-mono)',
      color: 'var(--kui-color-text-muted)',
      backgroundColor: 'var(--kui-color-surface-elevated)',
      border: '1px solid var(--kui-color-border)',
      borderRadius: 'var(--kui-radius-sm)',
      lineHeight: '1',
      letterSpacing: '0.02em',
      ...style,
    }}
    {...props}
  >
    {children}
  </kbd>
);

/* ----------------------------------------------------
   DropdownMenuItem Primitive
---------------------------------------------------- */
export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  shortcut?: string;
  badge?: React.ReactNode;
  description?: string;
  danger?: boolean;
}

export const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  (
    {
      children,
      icon,
      shortcut,
      badge,
      description,
      danger,
      disabled,
      onClick,
      style,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const ctx = useContext(DropdownContext);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      ctx?.closeMenu();
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={(e) => {
          setIsHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--kui-space-3)',
          width: '100%',
          padding: '7px 10px',
          borderRadius: 'var(--kui-radius-sm)',
          border: 'none',
          backgroundColor: isHovered && !disabled
            ? danger
              ? 'var(--kui-color-danger-surface)'
              : 'var(--kui-color-surface-subtle)'
            : 'transparent',
          color: disabled
            ? 'var(--kui-color-text-muted)'
            : danger
              ? 'var(--kui-color-danger)'
              : 'var(--kui-color-text-primary)',
          fontSize: 'var(--kui-font-size-sm)',
          fontFamily: 'var(--kui-font-sans)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          outline: 'none',
          transition: 'background-color 100ms ease, color 100ms ease',
          ...style,
        }}
        {...props}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flex: 1, minWidth: 0 }}>
          {icon && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: disabled
                  ? 'var(--kui-color-text-muted)'
                  : danger
                    ? 'var(--kui-color-danger)'
                    : 'var(--kui-color-text-secondary)',
              }}
            >
              {icon}
            </span>
          )}
          <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontWeight: 'var(--kui-font-weight-medium)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {children}
            </span>
            {description && (
              <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', marginTop: '1px' }}>
                {description}
              </span>
            )}
          </span>
        </span>

        {(badge || shortcut) && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flexShrink: 0 }}>
            {badge}
            {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
          </span>
        )}
      </button>
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

/* ----------------------------------------------------
   DropdownMenuCheckboxItem Primitive
---------------------------------------------------- */
export interface DropdownMenuCheckboxItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: string;
  shortcut?: string;
}

export const DropdownMenuCheckboxItem = forwardRef<HTMLButtonElement, DropdownMenuCheckboxItemProps>(
  (
    {
      children,
      checked,
      onCheckedChange,
      description,
      shortcut,
      disabled,
      style,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        ref={ref}
        type="button"
        role="menuitemcheckbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => {
          if (!disabled) onCheckedChange(!checked);
        }}
        onMouseEnter={(e) => {
          setIsHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--kui-space-3)',
          width: '100%',
          padding: '7px 10px',
          borderRadius: 'var(--kui-radius-sm)',
          border: 'none',
          backgroundColor: isHovered && !disabled ? 'var(--kui-color-surface-subtle)' : 'transparent',
          color: disabled ? 'var(--kui-color-text-muted)' : 'var(--kui-color-text-primary)',
          fontSize: 'var(--kui-font-size-sm)',
          fontFamily: 'var(--kui-font-sans)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          outline: 'none',
          transition: 'background-color 100ms ease',
          ...style,
        }}
        {...props}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flex: 1, minWidth: 0 }}>
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 'var(--kui-radius-sm)',
              border: checked ? '1px solid var(--kui-color-brand-primary)' : '1px solid var(--kui-color-border-strong)',
              backgroundColor: checked ? 'var(--kui-color-brand-primary)' : 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--kui-color-surface)',
              flexShrink: 0,
              transition: 'background-color 120ms ease, border-color 120ms ease',
            }}
          >
            {checked && <CheckIcon size={12} strokeWidth={2.5} />}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontWeight: 'var(--kui-font-weight-medium)' }}>{children}</span>
            {description && (
              <span style={{ fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)', marginTop: '1px' }}>
                {description}
              </span>
            )}
          </span>
        </span>

        {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
      </button>
    );
  }
);
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

/* ----------------------------------------------------
   DropdownMenu Trigger Component
---------------------------------------------------- */
export interface DropdownMenuTriggerProps {
  children: React.ReactElement<any>;
  asChild?: boolean;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children }) => {
  const { isOpen, setIsOpen, menuId, triggerRef } = useDropdown();

  return cloneElement(children, {
    ref: triggerRef as any,
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
    'aria-controls': isOpen ? menuId : undefined,

    onClick: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onClick?.(e);
      setIsOpen((prev) => !prev);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      children.props.onKeyDown?.(e);
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
    },
  });
};

/* ----------------------------------------------------
   DropdownMenu Content Component
---------------------------------------------------- */
export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end';
  minWidth?: string | number;
  children: React.ReactNode;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  align = 'start',
  minWidth = 220,
  children,
  style,
  ...props
}) => {
  const { isOpen, setIsOpen, menuId, triggerRef } = useDropdown();
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on outside pointer click
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, setIsOpen, triggerRef]);

  // Keyboard navigation inside content
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const getItems = () =>
      Array.from(
        contentRef.current?.querySelectorAll<HTMLButtonElement>(
          'button[role="menuitem"]:not([disabled]), button[role="menuitemcheckbox"]:not([disabled])'
        ) || []
      );

    const items = getItems();
    if (items.length > 0) {
      items[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentItems = getItems();
      if (currentItems.length === 0) return;

      const activeIndex = currentItems.indexOf(document.activeElement as HTMLButtonElement);

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        (triggerRef.current as HTMLElement)?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = activeIndex >= currentItems.length - 1 ? 0 : activeIndex + 1;
        currentItems[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = activeIndex <= 0 ? currentItems.length - 1 : activeIndex - 1;
        currentItems[prevIndex]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        currentItems[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        currentItems[currentItems.length - 1]?.focus();
      } else if (e.key === 'Tab') {
        setIsOpen(false);
      }
    };

    const node = contentRef.current;
    node.addEventListener('keydown', handleKeyDown);
    return () => node.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      id={menuId}
      role="menu"
      aria-orientation="vertical"
      style={{
        position: 'absolute',
        zIndex: 100,
        top: 'calc(100% + var(--kui-space-1))',
        [align === 'end' ? 'right' : 'left']: 0,
        minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
        maxWidth: '380px',
        backgroundColor: 'var(--kui-color-surface)',
        color: 'var(--kui-color-text-primary)',
        borderRadius: 'var(--kui-radius-md)',
        border: '1px solid var(--kui-color-border)',
        boxShadow: 'var(--kui-shadow-lg)',
        padding: 'var(--kui-space-1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        animation: 'kui-dropdown-enter 140ms cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: align === 'end' ? 'top right' : 'top left',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/* ----------------------------------------------------
   Main DropdownMenu Component
   Supports both Declarative (`items={...}`) and Compound Child APIs
---------------------------------------------------- */
export interface DropdownMenuProps {
  trigger?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  items?: DropdownMenuItem[];
  align?: 'start' | 'end';
  minWidth?: string | number;
  children?: React.ReactNode;
}

export interface DropdownMenuComponent extends React.FC<DropdownMenuProps> {
  Trigger: typeof DropdownMenuTrigger;
  Content: typeof DropdownMenuContent;
  Item: typeof DropdownMenuItem;
  CheckboxItem: typeof DropdownMenuCheckboxItem;
  Group: typeof DropdownMenuGroup;
  Label: typeof DropdownMenuLabel;
  Separator: typeof DropdownMenuSeparator;
  Header: typeof DropdownMenuHeader;
  Shortcut: typeof DropdownMenuShortcut;
}

export const DropdownMenu: DropdownMenuComponent = ({
  trigger,
  items,
  align = 'start',
  minWidth = 220,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);

  const contextValue: DropdownContextValue = {
    isOpen,
    setIsOpen,
    menuId,
    triggerRef,
    closeMenu: () => setIsOpen(false),
  };

  // Helper to render declarative item array
  const renderItem = (item: DropdownMenuItem, idx: number) => {
    if (item.type === 'separator') {
      return <DropdownMenuSeparator key={`sep-${idx}`} style={item.style} className={item.className} />;
    }

    if (item.type === 'header') {
      return (
        <DropdownMenuHeader key={`hdr-${idx}`} style={item.style} className={item.className}>
          {item.content}
        </DropdownMenuHeader>
      );
    }

    if (item.type === 'group') {
      return (
        <DropdownMenuGroup key={`grp-${idx}-${item.label || ''}`} label={item.label} style={item.style} className={item.className}>
          {item.items.map((sub, sIdx) => renderItem(sub, sIdx))}
        </DropdownMenuGroup>
      );
    }

    if (item.type === 'checkbox') {
      return (
        <DropdownMenuCheckboxItem
          key={item.id || `chk-${idx}`}
          checked={item.checked}
          onCheckedChange={item.onCheckedChange}
          description={item.description}
          shortcut={item.shortcut}
          disabled={item.disabled}
          style={item.style}
          className={item.className}
        >
          {item.label}
        </DropdownMenuCheckboxItem>
      );
    }

    // Default: 'item'
    return (
      <DropdownMenuItem
        key={item.id || `itm-${idx}`}
        icon={item.icon}
        shortcut={item.shortcut}
        badge={item.badge}
        description={item.description}
        danger={item.danger}
        disabled={item.disabled}
        onClick={item.onClick}
        style={item.style}
        className={item.className}
      >
        {item.label}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {trigger ? (
          <>
            <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
            {items ? (
              <DropdownMenuContent align={align} minWidth={minWidth}>
                {items.map(renderItem)}
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent align={align} minWidth={minWidth}>
                {children}
              </DropdownMenuContent>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </DropdownContext.Provider>
  );
};

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem;
DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Header = DropdownMenuHeader;
DropdownMenu.Shortcut = DropdownMenuShortcut;
