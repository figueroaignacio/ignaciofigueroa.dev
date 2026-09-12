'use client';

import { Button } from '@/shared/components/ui/button';
import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { ApiError } from '@/shared/lib/api-error';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '../api/auth';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { redirectTo } = await login(email, password);
      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 401
          ? 'wrong email or password'
          : "couldn't sign in",
      );
      setLoading(false);
    }
  }

  return (
    <Frame className="w-full max-w-sm">
      <Frame.Header className="px-2.5 py-2">
        <Frame.Title>sign in</Frame.Title>
        <Frame.Description>author only. there is no sign up.</Frame.Description>
      </Frame.Header>
      <Frame.Panel className="bg-background">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error ?? undefined}
          />
          <Button type="submit" fullWidth loading={loading}>
            sign in
          </Button>
        </form>
      </Frame.Panel>
    </Frame>
  );
}
