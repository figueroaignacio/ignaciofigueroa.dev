import { LinuxIcon } from '@/shared/components/tech-icons/linux-icon';
import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
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
};

/*
 * Icons stay monochrome on purpose. Thirteen saturated hues here used to compete
 * with each other and with the single amber accent; the labels carry the meaning.
 */
const INTERESTS_CONFIG: InterestConfig[] = [
  { key: 'frontend', icon: Layout01Icon },
  { key: 'backend', icon: CloudServerIcon },
  { key: 'ai', icon: AiBrain01Icon },
  { key: 'prompts', icon: ComputerTerminal01Icon },
  { key: 'arch', icon: PuzzleIcon },
  { key: 'clean', icon: SecurityIcon },
  { key: 'ui', icon: Layout01Icon },
  { key: 'a11y', icon: FaceIdIcon },
  { key: 'perf', icon: FlashIcon },
  { key: 'qa', icon: TestTube01Icon },
  { key: 'devops', icon: FlowCircleIcon },
  { key: 'opensource', icon: Globe02Icon },
  { key: 'linux', icon: LinuxIcon },
];

export function Interests() {
  const t = useTranslations('sections.interests.items');
  const tSection = useTranslations('sections.interests');

  return (
    <Section id="interests" title={tSection('title')}>
      <TechChipGroup role="list">
        {INTERESTS_CONFIG.map(({ key, icon: Icon }) => (
          <TechChip
            key={key}
            role="listitem"
            tone="lead"
            className="cursor-default transition-colors [&>span]:text-muted-foreground"
            icon={
              typeof Icon === 'function' ? (
                <Icon className="size-full" />
              ) : (
                <HugeiconsIcon icon={Icon} className="size-full" />
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
