import React from 'react';

export interface AppShellProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  mobileNavOpen?: boolean;
  onMobileNavClose?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  sidebar,
  header,
  children,
  mobileNavOpen = false,
  onMobileNavClose,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--kui-color-canvas)',
        color: 'var(--kui-color-text-primary)',
        fontFamily: 'var(--kui-font-sans)',
      }}
    >
      {header && (
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            height: '56px',
            backgroundColor: 'var(--kui-color-surface)',
            borderBottom: '1px solid var(--kui-color-border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--kui-space-4)',
          }}
        >
          {header}
        </header>
      )}

      <div
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          position: 'relative',
        }}
      >
        {sidebar && (
          <>
            {/* Desktop persistent sidebar */}
            <aside
              style={{
                width: '260px',
                flexShrink: 0,
                backgroundColor: 'var(--kui-color-surface)',
                borderRight: '1px solid var(--kui-color-border)',
                display: 'flex',
                flexDirection: 'column',
              }}
              className="kui-desktop-sidebar"
            >
              {sidebar}
            </aside>

            {/* Mobile drawer backdrop */}
            {mobileNavOpen && (
              <div
                role="presentation"
                onClick={onMobileNavClose}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 40,
                  backgroundColor: 'var(--kui-color-overlay)',
                }}
              />
            )}

            {/* Mobile slide-out sidebar */}
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Navigation drawer"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                width: '280px',
                zIndex: 50,
                backgroundColor: 'var(--kui-color-surface)',
                boxShadow: 'var(--kui-shadow-lg)',
                transform: mobileNavOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 200ms ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              className="kui-mobile-sidebar"
            >
              {sidebar}
            </aside>
          </>
        )}

        <main
          style={{
            flex: 1,
            padding: 'var(--kui-space-6) var(--kui-space-4)',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
