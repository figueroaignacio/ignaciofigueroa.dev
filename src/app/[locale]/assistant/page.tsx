import { ChatPage } from '@/features/assistant/components/chat-page';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

interface AssistantPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function AssistantPage({ params }: AssistantPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <ChatPage />;
}

export async function generateMetadata({ params }: AssistantPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.chat' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      images: [
        {
          url: '/images/og-assistant.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}
