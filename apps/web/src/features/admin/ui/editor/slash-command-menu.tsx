'use client';

import { cn } from '@/shared/lib/cn';
import { HugeiconsIcon } from '@hugeicons/react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type { SlashCommandItem } from './slash-command-items';

export interface SlashCommandMenuHandle {
  onKeyDown: (event: KeyboardEvent) => boolean;
}

interface SlashCommandMenuProps {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
}

export const SlashCommandMenu = forwardRef<SlashCommandMenuHandle, SlashCommandMenuProps>(
  function SlashCommandMenu({ items, command }, ref) {
    const [selected, setSelected] = useState(0);

    useEffect(() => setSelected(0), [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: (event) => {
        if (event.key === 'ArrowUp') {
          setSelected((current) => (current + items.length - 1) % items.length);
          return true;
        }
        if (event.key === 'ArrowDown') {
          setSelected((current) => (current + 1) % items.length);
          return true;
        }
        if (event.key === 'Enter') {
          const item = items[selected];
          if (item) command(item);
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) {
      return (
        <div className="bg-card border-border text-muted-foreground rounded-md border p-3 text-sm shadow-md">
          no results
        </div>
      );
    }

    return (
      <div className="bg-card border-border flex w-64 flex-col rounded-md border p-1 shadow-md">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onMouseEnter={() => setSelected(index)}
            onClick={() => command(item)}
            className={cn(
              'flex items-center gap-3 rounded-sm px-2 py-1.5 text-left text-sm transition-colors',
              index === selected ? 'bg-muted text-foreground' : 'text-foreground hover:bg-muted/50',
            )}
          >
            <span className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-sm">
              <HugeiconsIcon icon={item.icon} size={16} />
            </span>
            <span className="flex flex-col">
              <span>{item.title}</span>
              <span className="text-muted-foreground text-xs">{item.description}</span>
            </span>
          </button>
        ))}
      </div>
    );
  },
);
