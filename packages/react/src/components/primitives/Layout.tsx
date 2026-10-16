import React from 'react';

function resolveSpacing(gap: number | string | undefined): string {
  if (gap === undefined) return 'var(--kui-space-4)';
  if (typeof gap === 'number') return `var(--kui-space-${gap})`;
  return gap;
}

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'main' | 'article';
  size?: 'sm' | 'md' | 'lg' | 'fluid';
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  as = 'div',
  size = 'lg',
  style,
  children,
  ...props
}) => {
  const Component = as as React.ElementType;
  const maxSizes: Record<NonNullable<ContainerProps['size']>, string> = {
    sm: '640px',
    md: '960px',
    lg: '1200px',
    fluid: '100%',
  };

  return (
    <Component
      style={{
        width: '100%',
        maxWidth: maxSizes[size],
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 'var(--kui-space-4)',
        paddingRight: 'var(--kui-space-4)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'ul' | 'ol' | 'nav' | 'main' | 'aside';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  children?: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({
  as = 'div',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  style,
  children,
  ...props
}) => {
  const Component = as as React.ElementType;
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
  };

  return (
    <Component
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: resolveSpacing(gap),
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface InlineProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'ul' | 'ol' | 'nav';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | string;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  children?: React.ReactNode;
}

export const Inline: React.FC<InlineProps> = ({
  as = 'div',
  gap = 3,
  align = 'center',
  justify = 'start',
  wrap = true,
  style,
  children,
  ...props
}) => {
  const Component = as as React.ElementType;
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    baseline: 'baseline',
    stretch: 'stretch',
  };

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
  };

  return (
    <Component
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: resolveSpacing(gap),
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'ul' | 'ol';
  columns?: number | string;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | string;
  children?: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  as = 'div',
  columns = 1,
  gap = 4,
  style,
  children,
  ...props
}) => {
  const Component = as as React.ElementType;
  const gridTemplateColumns = typeof columns === 'number'
    ? `repeat(${columns}, minmax(0, 1fr))`
    : columns;

  return (
    <Component
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap: resolveSpacing(gap),
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
