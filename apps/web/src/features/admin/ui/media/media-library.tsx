'use client';

import { Button } from '@/shared/components/ui/button';
import { Empty } from '@/shared/components/ui/empty';
import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { useToast } from '@/shared/components/ui/toast';
import type { MediaDto } from '@repo/contracts';
import { ImageUpload01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { mediaApi } from '../../api/admin.client';
import { DeleteDialog } from '../delete-dialog';

export function MediaLibrary({ media }: { media: MediaDto[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      await mediaApi.upload(file, file.name);
      toast({ title: 'uploaded', variant: 'success' });
      router.refresh();
    } catch (error) {
      toast({
        title: "couldn't upload",
        description: error instanceof Error ? error.message : undefined,
        variant: 'error',
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleUpload(file);
            event.target.value = '';
          }}
        />
        <Button
          loading={uploading}
          leftIcon={<HugeiconsIcon icon={ImageUpload01Icon} size={14} />}
          onClick={() => inputRef.current?.click()}
        >
          upload image
        </Button>
      </div>

      {media.length === 0 ? (
        <Empty variant="outline">
          <Empty.Header>
            <Empty.Title>no images yet</Empty.Title>
            <Empty.Description>uploads land in the supabase bucket.</Empty.Description>
          </Empty.Header>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <Frame key={item.id}>
              <Frame.Panel className="bg-background flex flex-col gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.alt}
                  className="border-border aspect-video w-full rounded-sm border object-cover"
                />
                <AltField id={item.id} alt={item.alt} />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    {item.width && item.height ? `${item.width}×${item.height}` : item.mimeType}
                    {' · '}
                    {Math.round(item.size / 1024)}kb
                  </span>
                  <DeleteDialog
                    name={item.alt || item.path}
                    description="the file is removed from storage too."
                    onConfirm={() => mediaApi.remove(item.id)}
                  />
                </div>
              </Frame.Panel>
            </Frame>
          ))}
        </div>
      )}
    </div>
  );
}

function AltField({ id, alt }: { id: string; alt: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [value, setValue] = useState(alt);

  return (
    <Input
      label="alt text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={async () => {
        if (value === alt) return;
        try {
          await mediaApi.update(id, value);
          toast({ title: 'alt text saved', variant: 'success' });
          router.refresh();
        } catch {
          toast({ title: "couldn't save the alt text", variant: 'error' });
        }
      }}
    />
  );
}
