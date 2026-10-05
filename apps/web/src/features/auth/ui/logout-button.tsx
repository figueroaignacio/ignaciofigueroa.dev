'use client';

import { LogOutIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout } from '../api/auth';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await logout();
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      loading={loading}
      onClick={handleLogout}
      leftIcon={<LogOutIcon size={14} />}
    >
      log out
    </Button>
  );
}
