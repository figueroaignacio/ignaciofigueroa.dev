import {
  CodeIcon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  QuoteIcon,
  TypeIcon,
  type IconComponent,
} from '@/shared/components/icons';
import type { Editor, Range } from '@tiptap/react';

export interface SlashCommandItem {
  title: string;
  description: string;
  keywords: string[];
  icon: IconComponent;
  command: (props: { editor: Editor; range: Range }) => void;
}

export const slashCommandItems: SlashCommandItem[] = [
  {
    title: 'text',
    description: 'plain paragraph',
    keywords: ['paragraph', 'p'],
    icon: TypeIcon,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setParagraph().run(),
  },
  {
    title: 'heading 2',
    description: 'section title',
    keywords: ['h2', 'title'],
    icon: Heading2Icon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run(),
  },
  {
    title: 'heading 3',
    description: 'subsection title',
    keywords: ['h3', 'subtitle'],
    icon: Heading3Icon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run(),
  },
  {
    title: 'bullet list',
    description: 'unordered list',
    keywords: ['ul', 'list'],
    icon: ListIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: 'numbered list',
    description: 'ordered list',
    keywords: ['ol', 'list'],
    icon: ListOrderedIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: 'quote',
    description: 'blockquote',
    keywords: ['blockquote', 'cite'],
    icon: QuoteIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    title: 'code block',
    description: 'monospace block',
    keywords: ['code', 'pre'],
    icon: CodeIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: 'divider',
    description: 'horizontal rule',
    keywords: ['hr', 'rule', 'separator'],
    icon: MinusIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
];

export function filterSlashCommandItems(query: string) {
  const value = query.trim().toLowerCase();
  if (!value) return slashCommandItems;
  return slashCommandItems.filter(
    (item) =>
      item.title.includes(value) || item.keywords.some((keyword) => keyword.includes(value)),
  );
}
