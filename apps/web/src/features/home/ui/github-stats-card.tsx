interface GithubStatsCardProps {
  title: string;
  value: number | string;
}

export function GithubStatsCard({ title, value }: GithubStatsCardProps) {
  return (
    <p className="flex flex-col gap-1">
      <span className="type-hero tabular-nums normal-case">{value}</span>
      <span className="text-[15px] text-muted-foreground">{title}</span>
    </p>
  );
}
