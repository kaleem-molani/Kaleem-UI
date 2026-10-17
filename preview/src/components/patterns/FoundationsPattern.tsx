import React from 'react';
import {
  Heading,
  Text,
  Stack,
  Inline,
  Grid,
  Card,
  Badge,
} from '@kaleemmolani/react';


export const FoundationsPattern: React.FC = () => {
  const brandScale = [
    { name: '50', hex: '#EAF5F0' },
    { name: '100', hex: '#CFE9DC' },
    { name: '200', hex: '#A5D8C0' },
    { name: '300', hex: '#83F0C0', highlight: 'Mint Accent' },
    { name: '400', hex: '#4CCF98' },
    { name: '500', hex: '#167653', highlight: 'Focus Ring' },
    { name: '600', hex: '#126246' },
    { name: '700', hex: '#104F3C' },
    { name: '800', hex: '#102C27', highlight: 'Deep Evergreen' },
    { name: '900', hex: '#0B211D' },
  ];

  const neutralScale = [
    { name: '0', hex: '#FFFFFF' },
    { name: '50', hex: '#F6F7F5', highlight: 'Canvas Light' },
    { name: '100', hex: '#EEF1EE' },
    { name: '200', hex: '#DDE3DE', highlight: 'Border Light' },
    { name: '300', hex: '#C3CEC6' },
    { name: '400', hex: '#9BAAA0' },
    { name: '500', hex: '#718176' },
    { name: '600', hex: '#53635A', highlight: 'Secondary Text' },
    { name: '700', hex: '#39483F' },
    { name: '800', hex: '#252F2A' },
    { name: '900', hex: '#17231E', highlight: 'Primary Text Light' },
    { name: '950', hex: '#151A18', highlight: 'Canvas Dark' },
  ];

  return (
    <Stack gap={6}>
      {/* Brand Color Scales */}
      <div>
        <Heading as="h2" variant="section" style={{ marginBottom: 'var(--kui-space-2)' }}>
          Brand Palette: Evergreen & Mint
        </Heading>
        <Text variant="body" color="secondary" style={{ marginBottom: 'var(--kui-space-3)' }}>
          Rooted in natural evergreen forest greens, balanced by cool mint accents.
        </Text>
        <Grid columns="repeat(auto-fit, minmax(130px, 1fr))" gap={2}>
          {brandScale.map((swatch) => (
            <div
              key={swatch.name}
              style={{
                borderRadius: 'var(--kui-radius-sm)',
                border: '1px solid var(--kui-color-border)',
                overflow: 'hidden',
                backgroundColor: 'var(--kui-color-surface)',
              }}
            >
              <div style={{ height: '48px', backgroundColor: swatch.hex }} />
              <div style={{ padding: '6px 8px' }}>
                <Text variant="label" style={{ fontSize: '12px' }}>
                  brand-{swatch.name}
                </Text>
                <Text variant="caption">{swatch.hex}</Text>
                {swatch.highlight && (
                  <Badge variant="neutral" size="sm" style={{ marginTop: '4px', fontSize: '10px' }}>
                    {swatch.highlight}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </Grid>
      </div>

      {/* Neutral Scales */}
      <div>
        <Heading as="h2" variant="section" style={{ marginBottom: 'var(--kui-space-2)' }}>
          Warm Neutral Scale
        </Heading>
        <Text variant="body" color="secondary" style={{ marginBottom: 'var(--kui-space-3)' }}>
          Mineral-tinted neutrals providing soft surfaces, accessible borders, and high-contrast text.
        </Text>
        <Grid columns="repeat(auto-fit, minmax(130px, 1fr))" gap={2}>
          {neutralScale.map((swatch) => (
            <div
              key={swatch.name}
              style={{
                borderRadius: 'var(--kui-radius-sm)',
                border: '1px solid var(--kui-color-border)',
                overflow: 'hidden',
                backgroundColor: 'var(--kui-color-surface)',
              }}
            >
              <div style={{ height: '48px', backgroundColor: swatch.hex }} />
              <div style={{ padding: '6px 8px' }}>
                <Text variant="label" style={{ fontSize: '12px' }}>
                  neutral-{swatch.name}
                </Text>
                <Text variant="caption">{swatch.hex}</Text>
                {swatch.highlight && (
                  <Badge variant="neutral" size="sm" style={{ marginTop: '4px', fontSize: '10px' }}>
                    {swatch.highlight}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </Grid>
      </div>

      {/* Typography Scale */}
      <div>
        <Heading as="h2" variant="section" style={{ marginBottom: 'var(--kui-space-2)' }}>
          Typography Foundations
        </Heading>
        <Card variant="bordered">
          <Stack gap={4}>
            <div style={{ borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-3)' }}>
              <Text variant="caption">DISPLAY (30px / 1.875rem - Bold)</Text>
              <Heading variant="display">Platform Telemetry Mesh</Heading>
            </div>
            <div style={{ borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-3)' }}>
              <Text variant="caption">PAGE TITLE (24px / 1.5rem - Semibold)</Text>
              <Heading variant="title">API Gateway Credentials</Heading>
            </div>
            <div style={{ borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-3)' }}>
              <Text variant="caption">SECTION HEADING (20px / 1.25rem - Semibold)</Text>
              <Heading variant="section">Workload Authentication Policies</Heading>
            </div>
            <div style={{ borderBottom: '1px solid var(--kui-color-border)', paddingBottom: 'var(--kui-space-3)' }}>
              <Text variant="caption">SUBSECTION (16px / 1rem - Semibold)</Text>
              <Heading variant="subsection">Certificate Expiration Warning</Heading>
            </div>
            <div>
              <Text variant="caption">BODY & LABELS (14px / 0.875rem - Regular)</Text>
              <Text variant="body">
                Body text utilizes balanced line height (1.5) with accessible contrast ratios in both light and dark themes.
              </Text>
            </div>
          </Stack>
        </Card>
      </div>

      {/* Spacing & Radius Rhythms */}
      <div>
        <Heading as="h2" variant="section" style={{ marginBottom: 'var(--kui-space-2)' }}>
          Spacing & Radius Rhythms
        </Heading>
        <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap={4}>
          <Card variant="bordered" header={<Text variant="label">4px Base Rhythm Spacing</Text>}>
            <Stack gap={2}>
              <Inline gap={2} align="center"><Text variant="code">--kui-space-1</Text><Text variant="caption">4px (Micro gaps)</Text></Inline>
              <Inline gap={2} align="center"><Text variant="code">--kui-space-2</Text><Text variant="caption">8px (Element padding)</Text></Inline>
              <Inline gap={2} align="center"><Text variant="code">--kui-space-3</Text><Text variant="caption">12px (Control padding)</Text></Inline>
              <Inline gap={2} align="center"><Text variant="code">--kui-space-4</Text><Text variant="caption">16px (Standard gap)</Text></Inline>
              <Inline gap={2} align="center"><Text variant="code">--kui-space-6</Text><Text variant="caption">24px (Section separation)</Text></Inline>
              <Inline gap={2} align="center"><Text variant="code">--kui-space-8</Text><Text variant="caption">32px (Layout margin)</Text></Inline>
            </Stack>
          </Card>
          <Card variant="bordered" header={<Text variant="label">Subtle Rounding Radius</Text>}>
            <Stack gap={2}>
              <Inline gap={2} align="center"><Text variant="code">--kui-radius-sm</Text><Text variant="caption">6px (Small controls, tags)</Text></Inline>
              <Inline gap={2} align="center"><Text variant="code">--kui-radius-md</Text><Text variant="caption">8px (Standard buttons, inputs, cards)</Text></Inline>
              <Inline gap={2} align="center"><Text variant="code">--kui-radius-lg</Text><Text variant="caption">10px (Dialogs, popovers)</Text></Inline>
              <Inline gap={2} align="center"><Text variant="code">--kui-radius-full</Text><Text variant="caption">9999px (Status pills, round avatars)</Text></Inline>
            </Stack>
          </Card>
        </Grid>
      </div>
    </Stack>
  );
};
