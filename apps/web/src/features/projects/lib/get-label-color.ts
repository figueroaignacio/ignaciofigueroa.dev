export function getLabelColor(text: string): string {
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const hue = hash % 360;
  const saturation = 65 + (hash % 20);
  const lightness = 45 + (hash % 10);

  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}
