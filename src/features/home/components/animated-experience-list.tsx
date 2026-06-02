import { ReactNode } from 'react';

interface AnimatedExperienceListProps {
  children: ReactNode[];
}

export function AnimatedExperienceList({ children }: AnimatedExperienceListProps) {
  return (
    <ol className="relative space-y-0">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-linear-to-b from-foreground/50 via-border to-border" />

      {children.map((child, index) => (
        <li key={index} className="relative pl-10 pb-8 last:pb-0">
          {child}
        </li>
      ))}
    </ol>
  );
}
