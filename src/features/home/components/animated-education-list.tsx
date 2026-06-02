import { ReactNode } from 'react';

interface AnimatedEducationListProps {
  children: ReactNode[];
}

export function AnimatedEducationList({ children }: AnimatedEducationListProps) {
  return (
    <div className="space-y-6">
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
}
