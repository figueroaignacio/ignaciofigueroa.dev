import createNextIntlPlugin from 'next-intl/plugin';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;

const baseConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'www.linkedin.com' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      ...(supabaseHost ? [{ protocol: 'https', hostname: supabaseHost }] : []),
      ...(apiUrl.startsWith('https')
        ? [{ protocol: 'https', hostname: new URL(apiUrl).hostname }]
        : []),
    ],
  },
};

export default createNextIntlPlugin()(baseConfig);
