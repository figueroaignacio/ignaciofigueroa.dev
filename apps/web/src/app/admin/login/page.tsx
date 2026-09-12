import { getCurrentUser } from '@/features/auth/api/current-user';
import { LoginForm } from '@/features/auth/ui/login-form';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'sign in' };

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect('/admin');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 py-12">
      <span className="text-[15px] font-semibold tracking-tight">ignaciofigueroa.dev</span>
      <LoginForm />
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground text-[13px] transition-colors"
      >
        back to the site
      </Link>
    </main>
  );
}
