import { type IconSvgElement } from '@hugeicons/react';

export const BASE_URL = 'https://ignaciofigueroa.dev';

export const SITE_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD && process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV;

export const MATE_UI_API = 'http://api-nach-ui.vercel.app';

export const ASSISTANT_API_URL =
  process.env.NEXT_PUBLIC_ASSISTANT_API_URL || 'http://localhost:8000';

export type Icon = React.FC<React.SVGAttributes<SVGAElement>> | IconSvgElement;
