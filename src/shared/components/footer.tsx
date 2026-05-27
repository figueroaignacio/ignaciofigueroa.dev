import { CTAContact } from '@/features/home/components/cta-contact';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="container w-full flex flex-col space-y-8 py-12">
      <div className="flex flex-col space-y-4 ">
        <div className="space-y-1 flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">{t('components.footer.name')}</h3>
            <p className="text-sm text-muted-foreground">{t('components.footer.role')}</p>
          </div>
          <LocaleSwitcher />
        </div>
        <p className="text-muted-foreground pt-2">{t('components.footer.thanks')}</p>
      </div>
      <CTAContact />
      <p className="text-sm text-muted-foreground/60 italic">{t('components.footer.kiss')}</p>
    </footer>
  );
}
