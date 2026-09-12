'use client';

import { Button } from '@/shared/components/ui/button';
import { Dialog } from '@/shared/components/ui/dialog';
import { useToast } from '@/shared/components/ui/toast';
import { Delete02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteDialogProps {
  name: string;
  description?: string;
  variant?: 'icon' | 'button';
  redirectTo?: string;
  onConfirm: () => Promise<unknown>;
}

export function DeleteDialog({
  name,
  description,
  variant = 'icon',
  redirectTo,
  onConfirm,
}: DeleteDialogProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await onConfirm();
      toast({ title: 'deleted', variant: 'success' });
      setOpen(false);
      if (redirectTo) router.replace(redirectTo);
      router.refresh();
    } catch (error) {
      toast({
        title: "couldn't delete",
        description: error instanceof Error ? error.message : undefined,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        {variant === 'icon' ? (
          <Button variant="ghost" size="icon" aria-label={`delete ${name}`}>
            <HugeiconsIcon icon={Delete02Icon} size={16} />
          </Button>
        ) : (
          <Button
            variant="outline"
            fullWidth
            className="text-muted-foreground"
            leftIcon={<HugeiconsIcon icon={Delete02Icon} size={14} />}
          >
            delete
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>delete “{name}”?</Dialog.Title>
          <Dialog.Description>
            {description ?? 'this is permanent, there is no trash.'}
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Button variant="outline" onClick={() => setOpen(false)}>
            cancel
          </Button>
          <Button variant="destructive" loading={loading} onClick={handleDelete}>
            delete
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
