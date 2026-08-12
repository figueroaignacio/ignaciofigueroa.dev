import { BASE_URL } from './constants';

export const PERSON_ID = `${BASE_URL}/#person`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const RECLEE_ID = 'https://reclee.com/#organization';

export const CONTACT_EMAIL = 'contact@ignaciofigueroa.dev';

export const PERSON_SAME_AS = [
  'https://github.com/figueroaignacio',
  'https://www.linkedin.com/in/figueroa-ignacio',
  'https://www.tiktok.com/@ignaciofigueroa.dev',
  'https://discord.com/users/ignaciofigueroa',
  'https://nachui.tech',
  'https://links.ignaciofigueroa.dev',
];

export const KNOWS_ABOUT = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'NestJS',
  'FastAPI',
  'Python',
  'AI Integration',
  'Large Language Models',
  'Design Systems',
  'PostgreSQL',
  'Linux',
  'Tailwind CSS',
];

type JsonLdNode = Record<string, unknown>;

export function jsonLdGraph(nodes: JsonLdNode[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

const MONTHS: Record<string, string> = {
  jan: '01',
  ene: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  abr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  ago: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
  dic: '12',
};

export function toIsoMonth(value?: string | null): string | undefined {
  if (!value) return undefined;
  const [month, year] = value.trim().split(/\s+/);
  const code = MONTHS[month?.slice(0, 3).toLowerCase() ?? ''];
  if (!code || !/^\d{4}$/.test(year ?? '')) return undefined;
  return `${year}-${code}`;
}

export interface CredentialInput {
  title: string;
  issuer: string;
  credentialId?: string;
  credentialUrl?: string;
  issueDate?: string;
}

function toCredentialNode(item: CredentialInput): JsonLdNode {
  const issued = toIsoMonth(item.issueDate);

  return {
    '@type': 'EducationalOccupationalCredential',
    name: item.title,
    credentialCategory: 'certificate',
    ...(item.credentialId ? { identifier: item.credentialId } : {}),
    ...(item.credentialUrl ? { url: encodeURI(`${BASE_URL}${item.credentialUrl}`) } : {}),
    ...(issued ? { dateCreated: issued } : {}),
    recognizedBy: { '@type': 'Organization', name: item.issuer },
  };
}

export interface PersonNodeInput {
  locale: string;
  jobTitle: string;
  description: string;
  university: string;
  credentials?: CredentialInput[];
}

export function buildPersonNode({
  locale,
  jobTitle,
  description,
  university,
  credentials = [],
}: PersonNodeInput): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Ignacio Figueroa',
    alternateName: 'Nacho',
    url: `${BASE_URL}/${locale}`,
    image: `${BASE_URL}/images/profile-photo.webp`,
    jobTitle,
    description,
    email: `mailto:${CONTACT_EMAIL}`,
    knowsLanguage: ['es', 'en'],
    knowsAbout: KNOWS_ABOUT,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
    nationality: { '@type': 'Country', name: 'Argentina' },
    worksFor: {
      '@type': 'Organization',
      '@id': RECLEE_ID,
      name: 'Reclee LLC',
      url: 'https://reclee.com',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: university,
      url: 'https://www.utn.edu.ar',
    },
    ...(credentials.length ? { hasCredential: credentials.map(toCredentialNode) } : {}),
    sameAs: PERSON_SAME_AS,
  };
}

export function personRef(locale: string): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Ignacio Figueroa',
    url: `${BASE_URL}/${locale}`,
  };
}

export function buildWebSiteNode(locale: string): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Ignacio Figueroa',
    url: BASE_URL,
    inLanguage: [locale === 'es' ? 'es-AR' : 'en'],
    publisher: { '@id': PERSON_ID },
  };
}

export interface WebPageNodeInput {
  url: string;
  name: string;
  description: string;
  locale: string;
  type?: 'WebPage' | 'ProfilePage' | 'CollectionPage';
  datePublished?: string;
  dateModified?: string;
  breadcrumbId?: string;
  extra?: JsonLdNode;
}

export function buildWebPageNode({
  url,
  name,
  description,
  locale,
  type = 'WebPage',
  datePublished,
  dateModified,
  breadcrumbId,
  extra,
}: WebPageNodeInput): JsonLdNode {
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale === 'es' ? 'es-AR' : 'en',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
    ...extra,
  };
}

export function buildBreadcrumbNode(
  id: string,
  crumbs: { name: string; url: string }[],
): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}
