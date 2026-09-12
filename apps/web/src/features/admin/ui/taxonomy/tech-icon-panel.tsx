'use client';

import { Button } from '@/shared/components/ui/button';
import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Select } from '@/shared/components/ui/select';
import { Table } from '@/shared/components/ui/table';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/components/ui/toast';
import type { TechIconDto, TechStackDto } from '@repo/contracts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { techIconsApi, techStackApi } from '../../api/admin.client';
import { DeleteDialog } from '../delete-dialog';

const NO_ICON = '__none__';

interface TechIconPanelProps {
  icons: TechIconDto[];
  technologies: TechStackDto[];
}

export function TechIconPanel({ icons, technologies }: TechIconPanelProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [svg, setSvg] = useState('');
  const [saving, setSaving] = useState(false);

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
    if (!name.trim() || !svg.trim()) return;
    setSaving(true);
    const ok = await run(() => techIconsApi.create({ name: name.trim(), svg }), 'icon created');
    if (ok) {
      setName('');
      setSvg('');
    }
    setSaving(false);
  }

  return (
    <Frame>
      <Frame.Header className="px-2.5 py-2">
        <Frame.Title>tech icons</Frame.Title>
        <Frame.Description>svg markup, assigned to a technology.</Frame.Description>
      </Frame.Header>
      <Frame.Panel className="bg-background flex flex-col gap-4">
        <form className="flex flex-col gap-3" onSubmit={handleCreate}>
          <Input label="icon name" value={name} onChange={(event) => setName(event.target.value)} />
          <Textarea
            label="svg"
            className="font-mono text-xs"
            value={svg}
            onChange={(event) => setSvg(event.target.value)}
          />
          <Button type="submit" loading={saving} className="self-start">
            add icon
          </Button>
        </form>

        {icons.length > 0 ? (
          <Table>
            <Table.Body>
              {icons.map((icon) => (
                <Table.Row key={icon.id}>
                  <Table.Cell className="w-10">
                    <span
                      className="flex size-4 items-center justify-center [&>svg]:size-full"
                      dangerouslySetInnerHTML={{ __html: icon.svg }}
                    />
                  </Table.Cell>
                  <Table.Cell className="text-[13px]">{icon.name}</Table.Cell>
                  <Table.Cell className="w-14 py-2">
                    <div className="flex justify-end">
                      <DeleteDialog
                        name={icon.name}
                        onConfirm={() => techIconsApi.remove(icon.id)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : null}

        <div className="flex flex-col gap-2">
          <Label>assign icons</Label>
          {technologies.map((tech) => (
            <div key={tech.id} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-[13px]">{tech.name}</span>
              <Select
                value={tech.iconId ?? NO_ICON}
                onValueChange={(value) =>
                  void run(
                    () =>
                      techStackApi.update(tech.id, {
                        iconId: value === NO_ICON ? null : value,
                      }),
                    'icon assigned',
                  )
                }
              >
                <Select.Trigger placeholder="no icon" />
                <Select.Content>
                  <Select.Item value={NO_ICON}>no icon</Select.Item>
                  {icons.map((icon) => (
                    <Select.Item key={icon.id} value={icon.id}>
                      {icon.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>
          ))}
        </div>
      </Frame.Panel>
    </Frame>
  );
}
