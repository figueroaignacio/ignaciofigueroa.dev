import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ignacio Figueroa · Fullstack Developer',
    short_name: 'Ignacio Figueroa',
    description:
      'Portfolio of Ignacio Figueroa, a fullstack developer in Buenos Aires, Argentina working with React, Next.js, Python, and FastAPI.',
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    lang: 'en',
    categories: ['portfolio', 'developer', 'technology'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
