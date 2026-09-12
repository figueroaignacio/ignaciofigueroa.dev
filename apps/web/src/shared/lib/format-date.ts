export function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const shortFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
});

export function formatShortDate(value: string | Date | null | undefined): string {
  if (!value) return '—';
  return shortFormatter.format(new Date(value));
}
