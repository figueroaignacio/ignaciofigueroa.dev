import { ReactNode } from 'react';

interface AnimatedSectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  id?: string;
}

export function AnimatedSectionHeader({
  title,
  description,
  className,
  id,
}: AnimatedSectionHeaderProps) {
  return (
    <div className={className}>
      <h2 id={id} className="text-xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
