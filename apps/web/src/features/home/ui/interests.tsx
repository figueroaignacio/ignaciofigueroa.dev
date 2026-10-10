import {
  CodeIcon,
  EyeIcon,
  LayoutIcon,
  ListIcon,
  PuzzleIcon,
  SparklesIcon,
} from '@/shared/components/icons';
import { LinuxIcon } from '@/shared/components/tech-icons/linux-icon';
import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import type { Icon } from '@/shared/lib/constants';
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
  { key: 'frontend', icon: LayoutIcon },
  { key: 'software', icon: PuzzleIcon },
  { key: 'programming', icon: CodeIcon },
  { key: 'linux', icon: LinuxIcon },
  { key: 'uxui', icon: EyeIcon },
  { key: 'sdd', icon: ListIcon },
  { key: 'aiOrchestration', icon: SparklesIcon },
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
            icon={<Icon className="size-full" />}
          >
            {t(key)}
          </TechChip>
        ))}
      </TechChipGroup>
    </Section>
  );
}
