import React from 'react';

/* ----------------------------------------------------
   Spinner Primitive
---------------------------------------------------- */
export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 20,
  label = 'Loading...',
  style,
  ...props
}) => {
  return (
    <span
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          animation: 'kui-spin 0.8s linear infinite',
          ...style,
        }}
        {...props}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {label}
      </span>
    </span>
  );
};

/* ----------------------------------------------------
   Skeleton Primitive
---------------------------------------------------- */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'text' | 'rect' | 'circle';
  animation?: 'shimmer' | 'pulse' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  radius,
  variant = 'text',
  animation = 'shimmer',
  style,
  ...props
}) => {
  const resolvedRadius = radius
    ? `var(--kui-radius-${radius})`
    : variant === 'circle'
      ? 'var(--kui-radius-full)'
      : variant === 'text'
        ? 'var(--kui-radius-sm)'
        : 'var(--kui-radius-md)';

  const resolvedWidth = width ?? (variant === 'circle' ? 40 : '100%');
  const resolvedHeight = height ?? (variant === 'circle' ? 40 : variant === 'text' ? '1rem' : '4rem');

  const animationStyles: React.CSSProperties =
    animation === 'shimmer'
      ? {
          backgroundImage:
            'linear-gradient(90deg, var(--kui-color-surface-subtle) 25%, var(--kui-color-border) 50%, var(--kui-color-surface-subtle) 75%)',
          backgroundSize: '200% 100%',
          animation: 'kui-shimmer 1.8s ease-in-out infinite',
        }
      : animation === 'pulse'
        ? {
            backgroundColor: 'var(--kui-color-surface-subtle)',
            animation: 'kui-pulse 1.6s ease-in-out infinite',
          }
        : {
            backgroundColor: 'var(--kui-color-surface-subtle)',
            animation: 'none',
          };

  return (
    <div
      aria-hidden="true"
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        borderRadius: resolvedRadius,
        ...animationStyles,
        ...style,
      }}
      {...props}
    />
  );
};

