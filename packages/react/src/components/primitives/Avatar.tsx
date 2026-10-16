import React, { useState } from 'react';
import { UserIcon } from '../common/Icons.js';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  src?: string;
  alt: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className = '',
  style,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizePixels: Record<AvatarSize, { dimension: number; fontSize: string; iconSize: number }> = {
    sm: { dimension: 24, fontSize: '10px', iconSize: 12 },
    md: { dimension: 34, fontSize: 'var(--kui-font-size-xs)', iconSize: 16 },
    lg: { dimension: 44, fontSize: 'var(--kui-font-size-sm)', iconSize: 20 },
  };

  const getInitials = (text?: string): string => {
    if (!text) return '';
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name || alt);
  const currentSize = sizePixels[size];

  return (
    <div
      role="img"
      aria-label={alt}
      title={name || alt}
      style={{
        width: `${currentSize.dimension}px`,
        height: `${currentSize.dimension}px`,
        borderRadius: 'var(--kui-radius-full)',
        backgroundColor: 'var(--kui-brand-50)',
        color: 'var(--kui-brand-800)',
        border: '1px solid var(--kui-color-border-strong)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'var(--kui-font-weight-semibold)',
        fontSize: currentSize.fontSize,
        overflow: 'hidden',
        userSelect: 'none',
        flexShrink: 0,
        ...style,
      }}
      className={`kui-avatar kui-avatar-${size} ${className}`}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <UserIcon size={currentSize.iconSize} />
      )}
    </div>
  );
};
