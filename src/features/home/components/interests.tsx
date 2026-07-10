import { LinuxIcon } from '@/shared/components/tech-icons/linux-icon';
import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/cn';
import type { Icon } from '@/shared/lib/constants';
import {
  AiBrain01Icon,
  CloudServerIcon,
  ComputerTerminal01Icon,
  FaceIdIcon,
  FlashIcon,
  FlowCircleIcon,
  Globe02Icon,
  Layout01Icon,
  PuzzleIcon,
  SecurityIcon,
  TestTube01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

type InterestConfig = {
  key: string;
  icon: Icon;
  color: string;
};

const INTERESTS_CONFIG: InterestConfig[] = [
  { key: 'frontend', icon: Layout01Icon, color: 'text-cyan-500' },
  { key: 'backend', icon: CloudServerIcon, color: 'text-emerald-500' },
  { key: 'ai', icon: AiBrain01Icon, color: 'text-violet-500' },
  { key: 'prompts', icon: ComputerTerminal01Icon, color: 'text-amber-500' },
  { key: 'arch', icon: PuzzleIcon, color: 'text-blue-500' },
  { key: 'clean', icon: SecurityIcon, color: 'text-rose-500' },
  { key: 'ui', icon: Layout01Icon, color: 'text-pink-500' },
  { key: 'a11y', icon: FaceIdIcon, color: 'text-indigo-500' },
  { key: 'perf', icon: FlashIcon, color: 'text-orange-500' },
  { key: 'qa', icon: TestTube01Icon, color: 'text-lime-500' },
  { key: 'devops', icon: FlowCircleIcon, color: 'text-sky-500' },
  { key: 'opensource', icon: Globe02Icon, color: 'text-green-500' },
  { key: 'linux', icon: LinuxIcon, color: 'text-foreground' },
];

export function Interests() {
  const t = useTranslations('sections.interests.items');
  const tSection = useTranslations('sections.interests');

  return (
    <section id="interests" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {tSection('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono text-foreground/80" role="list">
        {INTERESTS_CONFIG.map(({ key, icon: Icon, color }) => (
          <li key={key} className="flex items-center gap-1.5 hover:text-foreground transition-colors group" role="listitem">
            <span aria-hidden="true" className={cn("size-3.5 flex items-center justify-center grayscale opacity-60 dark:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200", color)}>
              {typeof Icon === 'function' ? (
                <Icon className="size-3.5" />
              ) : (
                <HugeiconsIcon icon={Icon} className="size-3.5" />
              )}
            </span>
            <span>{t(key)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
