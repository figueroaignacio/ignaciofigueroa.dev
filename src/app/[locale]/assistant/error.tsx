'use client';

import { Button } from '@/shared/components/ui/button';

import { useEffect } from 'react';
import { AlertCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Chat route error:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <HugeiconsIcon icon={AlertCircleIcon} className="size-10 text-destructive" />
        <h2 className="text-xl font-semibold">Chat unavailable</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          There was an error loading the chat. Please try again.
        </p>
      </div>
      <Button onClick={() => reset()} variant="outline">
        Reload
      </Button>
    </div>
  );
}
