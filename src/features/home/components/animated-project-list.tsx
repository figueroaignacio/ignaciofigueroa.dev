import { ReactNode } from 'react';

interface AnimatedProjectListProps {
  children: ReactNode[] | ReactNode;
}

export function AnimatedProjectList({ children }: AnimatedProjectListProps) {
  return (
    <div className="grid gap-4">
      {Array.isArray(children) ? (
        children.map((child, index) => <div key={index}>{child}</div>)
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
