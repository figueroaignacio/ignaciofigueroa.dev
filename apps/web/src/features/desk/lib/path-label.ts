export function pathLabel(label: string) {
  const slug = label.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().replace(/\s+/g, '-').toLowerCase();
  return `./${slug}`;
}
