'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/cn';
import { useMemo, useState } from 'react';

interface RelationOption {
  id: string;
  label: string;
}

interface RelationPickerProps {
  label: string;
  description?: string;
  options: RelationOption[];
  value: string[];
  searchable?: boolean;
  onChange: (value: string[]) => void;
}

export function RelationPicker({
  label,
  description,
  options,
  value,
  searchable = false,
  onChange,
}: RelationPickerProps) {
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return options;
    return options.filter((option) => option.label.toLowerCase().includes(term));
  }, [options, query]);

  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((item) => item !== id) : [...value, id]);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {description ? <p className="text-muted-foreground text-xs">{description}</p> : null}
      {searchable ? (
        <Input
          placeholder="filter"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-8 text-[13px]"
        />
      ) : null}
      <div className="border-border max-h-48 overflow-y-auto rounded-md border p-2">
        {visible.length === 0 ? (
          <p className="text-muted-foreground p-1 text-xs">nothing here yet</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {visible.map((option) => {
              const selected = value.includes(option.id);
              return (
                <button key={option.id} type="button" onClick={() => toggle(option.id)}>
                  <Badge
                    variant={selected ? 'default' : 'outline'}
                    className={cn('cursor-pointer', !selected && 'text-muted-foreground')}
                  >
                    {option.label}
                  </Badge>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
