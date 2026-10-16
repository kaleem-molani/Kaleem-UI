import React from 'react';
import { Heading, Text } from '../primitives/Typography.js';
import { Inline } from '../primitives/Layout.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
}) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--kui-space-2)',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontSize: 'var(--kui-font-size-xs)',
          fontFamily: 'var(--kui-font-sans)',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current;

          return (
            <li
              key={index}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}
            >
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  style={{
                    color: 'var(--kui-color-text-secondary)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--kui-color-text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--kui-color-text-secondary)')}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    color: isLast
                      ? 'var(--kui-color-text-primary)'
                      : 'var(--kui-color-text-secondary)',
                    fontWeight: isLast
                      ? 'var(--kui-font-weight-medium)'
                      : 'var(--kui-font-weight-regular)',
                  }}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{ color: 'var(--kui-color-text-muted)', userSelect: 'none' }}
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
}) => {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-3)',
        marginBottom: 'var(--kui-space-4)',
        width: '100%',
      }}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--kui-space-3)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-1)', flex: 1, minWidth: '240px' }}>
          <Heading as="h1" variant="title">
            {title}
          </Heading>
          {description && (
            <Text variant="body" color="secondary">
              {description}
            </Text>
          )}
        </div>
        {actions && (
          <Inline gap={2} align="center">
            {actions}
          </Inline>
        )}
      </div>
    </header>
  );
};
