import { Badge } from '@/shared/components/ui/badge';
import type { ContentStatus, Locale } from '@repo/contracts';

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <Badge variant={status === 'published' ? 'success' : 'outline'} className="font-mono">
      {status}
    </Badge>
  );
}

export function LocaleBadge({ locale }: { locale: Locale }) {
  return (
    <Badge variant="outline" className="font-mono uppercase">
      {locale}
    </Badge>
  );
}
