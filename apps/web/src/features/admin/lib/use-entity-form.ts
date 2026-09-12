'use client';

import { useToast } from '@/shared/components/ui/toast';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { revalidateContent, type ContentTag } from '../api/revalidate';

interface UseEntityFormOptions<TInput, TResult> {
  create: (input: TInput) => Promise<TResult>;
  update: (input: TInput) => Promise<TResult>;
  isNew: boolean;
  tag?: ContentTag;
  redirectTo: (result: TResult) => string | null;
}

/**
 * Every admin form shares the same lifecycle: validate on the server, toast the
 * outcome, then either navigate to the created record or refresh the current
 * route so server components re-read the API.
 */
export function useEntityForm<TInput, TResult>({
  create,
  update,
  isNew,
  tag,
  redirectTo,
}: UseEntityFormOptions<TInput, TResult>) {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const save = useCallback(
    async (input: TInput) => {
      setSaving(true);
      try {
        const result = isNew ? await create(input) : await update(input);
        if (tag) await revalidateContent(tag);
        toast({ title: isNew ? 'created' : 'saved', variant: 'success' });
        setSavedAt(new Date());
        const target = redirectTo(result);
        if (target) router.replace(target);
        router.refresh();
        return result;
      } catch (error) {
        toast({
          title: "couldn't save",
          description: error instanceof Error ? error.message : undefined,
          variant: 'error',
        });
        return null;
      } finally {
        setSaving(false);
      }
    },
    [create, update, isNew, tag, redirectTo, router, toast],
  );

  return { save, saving, savedAt };
}
