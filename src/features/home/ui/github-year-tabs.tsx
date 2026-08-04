import { Tabs } from '@/shared/components/ui/tabs';

interface GithubYearTabsProps {
  activeYear: string;
  availableYears: number[];
  onChange: (value: string) => void;
}

export function GithubYearTabs({ activeYear, availableYears, onChange }: GithubYearTabsProps) {
  return (
    <Tabs
      value={activeYear}
      onValueChange={onChange}
      variant="ghost"
      size="sm"
      className="w-auto self-start sm:self-auto"
    >
      <Tabs.List>
        {availableYears.map((year) => (
          <Tabs.Trigger key={year} value={year.toString()} className="px-4 py-1.5 text-xs">
            {year}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
