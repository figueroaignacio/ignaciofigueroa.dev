import { ReactNode } from 'react';

interface AnimatedContributionListProps {
  children: ReactNode[];
}

export function AnimatedContributionList({ children }: AnimatedContributionListProps) {
  return (
    <div className="grid gap-3">
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
}
