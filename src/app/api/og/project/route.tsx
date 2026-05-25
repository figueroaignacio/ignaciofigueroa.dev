import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'Project';
  const description = searchParams.get('description') ?? '';
  const subtitle = searchParams.get('subtitle') ?? '';
  const slug = searchParams.get('slug') ?? '';

  const titleSize = title.length > 20 ? 28 : title.length > 12 ? 36 : 44;
  const truncDesc = description.length > 100 ? `${description.slice(0, 100)}...` : description;

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: '#13131b',
        display: 'flex',
        flexDirection: 'column',
        padding: '52px 68px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {[
        { top: 16, left: 16, borderWidth: '1px 0 0 1px' },
        { top: 16, right: 16, borderWidth: '1px 1px 0 0' },
        { bottom: 16, left: 16, borderWidth: '0 0 1px 1px' },
        { bottom: 16, right: 16, borderWidth: '0 1px 1px 0' },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderStyle: 'solid',
            borderColor: '#252535',
            opacity: 0.7,
            ...s,
          }}
        />
      ))}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 52 }}>
        <div style={{ width: 13, height: 13, borderRadius: 7, background: '#ff5f57' }} />
        <div style={{ width: 13, height: 13, borderRadius: 7, background: '#ffbd2e' }} />
        <div style={{ width: 13, height: 13, borderRadius: 7, background: '#28ca41' }} />
        <span
          style={{
            marginLeft: 16,
            fontFamily: 'sans-serif',
            fontSize: 16,
            color: '#2e2e42',
            letterSpacing: '0.08em',
          }}
        >
          ~/ignaciofigueroa.dev/projects/{slug}
        </span>
      </div>

      <div
        style={{
          fontFamily: 'sans-serif',
          fontSize: 13,
          color: '#353548',
          letterSpacing: '0.2em',
          marginBottom: 24,
          display: 'flex',
        }}
      >
        PROJECT
      </div>

      <div
        style={{
          fontFamily: 'sans-serif',
          fontWeight: 700,
          fontSize: titleSize,
          color: '#e3e3e3',
          lineHeight: 1.6,
          marginBottom: 28,
          display: 'flex',
        }}
      >
        {title.toUpperCase()}
      </div>

      <div
        style={{ width: 44, height: 1, background: '#303044', marginBottom: 22, display: 'flex' }}
      />

      {subtitle && (
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: 18,
            color: '#505065',
            letterSpacing: '0.06em',
            marginBottom: 14,
            display: 'flex',
          }}
        >
          {subtitle}
        </div>
      )}

      {/* description */}
      {truncDesc && (
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: 17,
            color: '#40404f',
            lineHeight: 1.6,
            maxWidth: 860,
            display: 'flex',
          }}
        >
          {truncDesc}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 44,
          left: 68,
          right: 68,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'sans-serif',
            fontSize: 15,
            color: '#252535',
            letterSpacing: '0.06em',
          }}
        >
          ignaciofigueroa.dev
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          {[true, false, false].map((on, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: on ? 'rgba(227,227,227,0.3)' : '#1c1c28',
              }}
            />
          ))}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
