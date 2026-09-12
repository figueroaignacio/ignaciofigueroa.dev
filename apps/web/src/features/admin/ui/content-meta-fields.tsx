'use client';

import { Label } from '@/shared/components/ui/label';
import { Select } from '@/shared/components/ui/select';
import type { ContentStatus, Locale } from '@repo/contracts';

interface ContentMetaFieldsProps {
  locale: Locale;
  status: ContentStatus;
  onChange: (patch: { locale?: Locale; status?: ContentStatus }) => void;
}

export function ContentMetaFields({ locale, status, onChange }: ContentMetaFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>status</Label>
        <Select
          value={status}
          onValueChange={(value) => onChange({ status: value as ContentStatus })}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="draft">draft</Select.Item>
            <Select.Item value="published">published</Select.Item>
          </Select.Content>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>locale</Label>
        <Select value={locale} onValueChange={(value) => onChange({ locale: value as Locale })}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="en">english</Select.Item>
            <Select.Item value="es">español</Select.Item>
          </Select.Content>
        </Select>
      </div>
    </div>
  );
}
