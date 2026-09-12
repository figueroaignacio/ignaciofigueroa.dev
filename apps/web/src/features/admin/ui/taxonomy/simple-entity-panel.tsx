'use client';

import { Button } from '@/shared/components/ui/button';
import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { Table } from '@/shared/components/ui/table';
import { useToast } from '@/shared/components/ui/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteDialog } from '../delete-dialog';

export interface SimpleEntity {
  id: string;
  label: string;
  meta?: string;
}

interface SimpleEntityPanelProps {
  title: string;
  description: string;
  inputLabel: string;
  items: SimpleEntity[];
  onCreate: (value: string) => Promise<unknown>;
  onRename: (id: string, value: string) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
}

export function SimpleEntityPanel({
  title,
  description,
  inputLabel,
  items,
  onCreate,
  onRename,
  onDelete,
}: SimpleEntityPanelProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  async function run(action: () => Promise<unknown>, successTitle: string) {
    try {
      await action();
      toast({ title: successTitle, variant: 'success' });
      router.refresh();
      return true;
    } catch (error) {
      toast({
        title: "couldn't save",
        description: error instanceof Error ? error.message : undefined,
        variant: 'error',
      });
      return false;
    }
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim()) return;
    setSaving(true);
    const ok = await run(() => onCreate(value.trim()), 'created');
    if (ok) setValue('');
    setSaving(false);
  }

  return (
    <Frame>
      <Frame.Header className="px-2.5 py-2">
        <Frame.Title>{title}</Frame.Title>
        <Frame.Description>{description}</Frame.Description>
      </Frame.Header>
      <Frame.Panel className="bg-background flex flex-col gap-4">
        <form className="flex items-end gap-2" onSubmit={handleCreate}>
          <Input
            label={inputLabel}
            className="flex-1"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button type="submit" loading={saving}>
            add
          </Button>
        </form>

        {items.length === 0 ? (
          <p className="text-muted-foreground text-xs">nothing here yet.</p>
        ) : (
          <Table>
            <Table.Body>
              {items.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell className="text-[13px]">
                    {editingId === item.id ? (
                      <Input
                        autoFocus
                        value={editingValue}
                        onChange={(event) => setEditingValue(event.target.value)}
                        onBlur={async () => {
                          if (editingValue.trim() && editingValue !== item.label) {
                            await run(() => onRename(item.id, editingValue.trim()), 'renamed');
                          }
                          setEditingId(null);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') event.currentTarget.blur();
                          if (event.key === 'Escape') setEditingId(null);
                        }}
                      />
                    ) : (
                      <button
                        type="button"
                        className="hover:underline hover:underline-offset-4"
                        onClick={() => {
                          setEditingId(item.id);
                          setEditingValue(item.label);
                        }}
                      >
                        {item.label}
                      </button>
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-muted-foreground w-32 font-mono text-xs">
                    {item.meta ?? ''}
                  </Table.Cell>
                  <Table.Cell className="w-14 py-2">
                    <div className="flex justify-end">
                      <DeleteDialog name={item.label} onConfirm={() => onDelete(item.id)} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Frame.Panel>
    </Frame>
  );
}
