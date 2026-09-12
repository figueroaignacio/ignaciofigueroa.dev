import { ClaudeIcon } from '@/shared/components/tech-icons/claude-icon';
import { OpenAIIcon } from '@/shared/components/tech-icons/openai-icon';
import { PerplexityIcon } from '@/shared/components/tech-icons/perplexity-icon';
import { cn } from '@/shared/lib/cn';
import { BASE_URL } from '@/shared/lib/constants';
import { getTranslations } from 'next-intl/server';

const TARGETS = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    base: 'https://chatgpt.com/?q=',
    Icon: OpenAIIcon,
    /*
     * The only one pinned to a token. OpenAI's mark is monochrome by design, so
     * black on light and white on dark *is* its brand rendering — but left on
     * plain `currentColor` it would inherit the link's muted grey and read as
     * washed out beside two logos sitting at full strength.
     */
    iconClassName: 'text-foreground',
  },
  { id: 'claude', label: 'Claude', base: 'https://claude.ai/new?q=', Icon: ClaudeIcon },
  {
    id: 'perplexity',
    label: 'Perplexity',
    base: 'https://www.perplexity.ai/search?q=',
    Icon: PerplexityIcon,
  },
];

export async function AskAiLinks({ className }: { className?: string }) {
  const t = await getTranslations('sections.askAi');
  const encoded = encodeURIComponent(t('prompt', { url: `${BASE_URL}/llms.txt` }));

  return (
    <div className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {TARGETS.map(({ id, label, base, Icon, iconClassName }) => (
        <a
          key={id}
          href={`${base}${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <Icon className={cn('size-4 shrink-0', iconClassName)} />
          {label}
        </a>
      ))}
    </div>
  );
}
