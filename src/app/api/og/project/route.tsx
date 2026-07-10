import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'Project';
  const description = searchParams.get('description') ?? '';
  const slug = searchParams.get('slug') ?? '';

  const truncDesc = description.length > 180 ? `${description.slice(0, 180)}...` : description;

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '76px 92px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.15em',
          }}
        >
          PROJECT // {slug}
        </span>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.05em',
          }}
        >
          ignaciofigueroa.dev
        </span>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, flexGrow: 1, justifyContent: 'center' }}>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 64,
            fontWeight: 400,
            color: '#e5e5e5',
            lineHeight: 1.15,
            margin: 0,
            padding: 0,
            textTransform: 'lowercase',
          }}
        >
          {title}
        </h1>

        {truncDesc && (
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 22,
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.6,
              maxWidth: 920,
              margin: 0,
              padding: 0,
            }}
          >
            {truncDesc}
          </p>
        )}
      </div>

      {/* Decorative Bottom Line */}
      <div style={{ display: 'flex', width: '100%', height: 1, background: 'rgba(255, 255, 255, 0.08)' }} />
    </div>,
    { width: 1200, height: 630 },
  );
}
