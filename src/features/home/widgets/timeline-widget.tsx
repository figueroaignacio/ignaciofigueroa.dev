import { Section } from '@/shared/components/ui/section';
import { Timeline, type TimelineItem } from '../ui/timeline';
import { TimelineSkeleton } from '../ui/timeline-skeleton';

interface TimelineWidgetProps {
  id: string;
  title?: string;
  items?: TimelineItem[] | null;
}

export function TimelineWidget({ id, title = '', items }: TimelineWidgetProps) {
  if (items === undefined) return <TimelineSkeleton />;
  if (items === null || items.length === 0) return null;

  return (
    <Section id={id} title={title}>
      <Timeline items={items} />
    </Section>
  );
}
