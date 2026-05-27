import { Link } from '@/i18n/navigation';

export function Logo() {
  return (
    <Link href="/">
      <img
        src="https://github.com/figueroaignacio.png"
        alt="Ignacio's Avatar"
        className="size-7 rounded-full"
      />
    </Link>
  );
}
