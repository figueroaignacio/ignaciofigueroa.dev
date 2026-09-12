'use client';

import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { useToast } from '@/shared/components/ui/toast';
import { cn } from '@/shared/lib/cn';
import type { MediaDto } from '@repo/contracts';
import { Delete02Icon, ImageUpload01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useRef, useState } from 'react';
import { mediaApi } from '../api/admin.client';

interface MediaPickerProps {
  label: string;
  media: MediaDto[];
  value: string | null;
  onChange: (id: string | null) => void;
}

export function MediaPicker({ label, media, value, onChange }: MediaPickerProps) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState(media);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const uploaded = await mediaApi.upload(file, file.name);
      setItems((current) => [uploaded, ...current]);
      onChange(uploaded.id);
      toast({ title: 'image uploaded', variant: 'success' });
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="clear image"
            onClick={() => onChange(null)}
          >
            <HugeiconsIcon icon={Delete02Icon} size={14} />
          </Button>
        ) : null}
      </div>
      <div className="border-border grid max-h-56 grid-cols-3 gap-2 overflow-y-auto rounded-md border p-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              'border-border aspect-video overflow-hidden rounded-sm border transition-opacity',
              value === item.id ? 'ring-primary ring-2' : 'opacity-70 hover:opacity-100',
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt={item.alt} className="size-full object-cover" />
          </button>
        ))}
        {items.length === 0 ? (
          <p className="text-muted-foreground col-span-3 p-1 text-xs">no images yet</p>
        ) : null}
      </div>
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
        type="button"
        variant="outline"
        size="sm"
        loading={uploading}
        className="self-start"
        leftIcon={<HugeiconsIcon icon={ImageUpload01Icon} size={14} />}
        onClick={() => inputRef.current?.click()}
      >
        upload image
      </Button>
    </div>
  );
}
