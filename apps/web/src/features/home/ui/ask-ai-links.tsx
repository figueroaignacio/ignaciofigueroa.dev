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
    iconClassName: 'text-foreground group-hover:text-background',
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
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {TARGETS.map(({ id, label, base, Icon, iconClassName }) => (
        <a
          key={id}
          href={`${base}${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-secondary px-5 text-[15px] font-medium transition-colors hover:bg-foreground hover:text-background active:translate-y-px"
        >
          <Icon
            className={cn(
              'size-4 shrink-0 transition-transform group-hover:rotate-[-8deg]',
              iconClassName,
            )}
          />
          {label}
        </a>
      ))}
    </div>
  );
}
