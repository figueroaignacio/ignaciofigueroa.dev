import { LinuxIcon } from '@/shared/components/tech-icons/linux-icon';
import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
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
    <Section id="interests" title={tSection('title')}>
      <TechChipGroup role="list">
        {INTERESTS_CONFIG.map(({ key, icon: Icon, color }) => (
          <TechChip
            key={key}
            role="listitem"
            className="px-2.5 py-1 text-[11px] text-foreground/80 hover:text-foreground transition-colors cursor-default"
            icon={
              typeof Icon === 'function' ? (
                <Icon className={cn('size-full', color)} />
              ) : (
                <HugeiconsIcon icon={Icon} className={cn('size-full', color)} />
              )
            }
          >
            {t(key)}
          </TechChip>
        ))}
      </TechChipGroup>
    </Section>
  );
}
