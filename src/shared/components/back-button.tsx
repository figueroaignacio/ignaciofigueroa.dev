'use client';

import { useRouter } from '@/i18n/navigation';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  function onBack() {
    router.back();
  }

  return (
    <button
      onClick={onBack}
      className={`hover:scale-[1.1] transition-transform duration-100 ease cursor-pointer ${className}`}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} className="size-6" />
    </button>
  );
}
