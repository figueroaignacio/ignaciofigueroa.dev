import { NachUICtaClient } from '../ui/nach-ui-cta-client';
import { NachUiCtaSkeleton } from '../ui/nach-ui-cta-skeleton';

type NachUiCtaTranslations = React.ComponentProps<typeof NachUICtaClient>['t'];

interface NachUiCtaWidgetProps {
  count?: number | null;
  t?: NachUiCtaTranslations;
}

export function NachUiCtaWidget({ count, t }: NachUiCtaWidgetProps) {
  if (count === undefined || t === undefined) return <NachUiCtaSkeleton />;
  if (count === null) return null;

  return <NachUICtaClient t={t} count={count} />;
}
