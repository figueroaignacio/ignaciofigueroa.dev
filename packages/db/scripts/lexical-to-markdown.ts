type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  format?: number | string;
  listType?: string;
  language?: string;
  fields?: { url?: string; newTab?: boolean };
  value?: { url?: string; alt?: string } | number;
  children?: LexicalNode[];
};

const BOLD = 1;
const ITALIC = 2;
const STRIKE = 4;
const CODE = 16;

function inline(node: LexicalNode): string {
  if (node.type === 'text') {
    let text = node.text ?? '';
    const format = typeof node.format === 'number' ? node.format : 0;
    if (format & CODE) return `\`${text}\``;
    if (format & BOLD) text = `**${text}**`;
    if (format & ITALIC) text = `*${text}*`;
    if (format & STRIKE) text = `~~${text}~~`;
    return text;
  }
  if (node.type === 'linebreak') return '\n';
  const inner = (node.children ?? []).map(inline).join('');
  if (node.type === 'link' || node.type === 'autolink') {
    const url = node.fields?.url ?? '';
    return url ? `[${inner}](${url})` : inner;
  }
  return inner;
}

function block(node: LexicalNode, depth = 0): string {
  const indent = '  '.repeat(depth);
  switch (node.type) {
    case 'heading': {
      const level = Number(node.tag?.replace('h', '') ?? 2);
      return `${'#'.repeat(Math.min(Math.max(level, 1), 6))} ${(node.children ?? []).map(inline).join('')}`;
    }
    case 'paragraph': {
      const text = (node.children ?? []).map(inline).join('').trim();
      return text;
    }
    case 'quote':
      return (node.children ?? [])
        .map(inline)
        .join('')
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n');
    case 'code': {
      const code = (node.children ?? []).map(inline).join('');
      return `\`\`\`${node.language ?? ''}\n${code}\n\`\`\``;
    }
    case 'horizontalrule':
      return '---';
    case 'list': {
      const ordered = node.listType === 'number';
      return (node.children ?? [])
        .map((item, index) => {
          const marker = ordered ? `${index + 1}.` : '-';
          const nested = (item.children ?? []).filter((child) => child.type === 'list');
          const own = (item.children ?? []).filter((child) => child.type !== 'list');
          const head = `${indent}${marker} ${own.map(inline).join('').trim()}`;
          const tail = nested.map((child) => block(child, depth + 1));
          return [head, ...tail].join('\n');
        })
        .join('\n');
    }
    case 'upload': {
      const value = typeof node.value === 'object' ? node.value : undefined;
      return value?.url ? `![${value.alt ?? ''}](${value.url})` : '';
    }
    default:
      return (node.children ?? []).map(inline).join('').trim();
  }
}

export function lexicalToMarkdown(body: unknown): string {
  const root = (body as { root?: LexicalNode } | null)?.root;
  if (!root?.children) return '';
  return root.children
    .map((node) => block(node))
    .filter((chunk) => chunk.length > 0)
    .join('\n\n')
    .trim();
}
