import type { ReactNode } from 'react';

export function ProjectsTabs({ personal }: { personal: ReactNode }) {
  return <div className="flex flex-col gap-6">{personal}</div>;
}
