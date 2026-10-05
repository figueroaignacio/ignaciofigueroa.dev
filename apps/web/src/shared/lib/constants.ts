import { type IconComponent } from '@/shared/components/icons';

export const BASE_URL = 'https://ignaciofigueroa.dev';

export const SITE_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD && process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV;

export const ASSISTANT_API_URL =
  process.env.NEXT_PUBLIC_ASSISTANT_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:4000';

export type Icon = IconComponent;
