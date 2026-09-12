'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Add01Icon, Delete02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface StringListFieldProps {
  label: string;
  description?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export function StringListField({
  label,
  description,
  placeholder,
  value,
  onChange,
}: StringListFieldProps) {
  function update(index: number, next: string) {
    onChange(value.map((item, current) => (current === index ? next : item)));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <Label>{label}</Label>
        {description ? <p className="text-muted-foreground text-xs">{description}</p> : null}
      </div>
      {value.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(event) => update(index, event.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`remove item ${index + 1}`}
            onClick={() => onChange(value.filter((_, current) => current !== index))}
          >
            <HugeiconsIcon icon={Delete02Icon} size={16} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="self-start"
        leftIcon={<HugeiconsIcon icon={Add01Icon} size={14} />}
        onClick={() => onChange([...value, ''])}
      >
        add
      </Button>
    </div>
  );
}
