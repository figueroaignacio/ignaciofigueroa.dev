interface ItemCardProps {
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ItemCard({ header, children, className }: ItemCardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card ${className || ''}`}>
      <div className="px-4 py-3">{header}</div>
      <div className="mx-1.5 mb-1.5 rounded-lg border border-border bg-background p-4">
        {children}
      </div>
    </div>
  );
}
