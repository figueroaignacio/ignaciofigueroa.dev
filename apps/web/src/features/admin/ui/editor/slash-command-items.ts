import {
  CodeSquareIcon,
  Heading02Icon,
  Heading03Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  MinusSignIcon,
  ParagraphIcon,
  QuoteDownIcon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import type { Editor, Range } from '@tiptap/react';

export interface SlashCommandItem {
  title: string;
  description: string;
  keywords: string[];
  icon: IconSvgElement;
  command: (props: { editor: Editor; range: Range }) => void;
}

export const slashCommandItems: SlashCommandItem[] = [
  {
    title: 'text',
    description: 'plain paragraph',
    keywords: ['paragraph', 'p'],
    icon: ParagraphIcon,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setParagraph().run(),
  },
  {
    title: 'heading 2',
    description: 'section title',
    keywords: ['h2', 'title'],
    icon: Heading02Icon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run(),
  },
  {
    title: 'heading 3',
    description: 'subsection title',
    keywords: ['h3', 'subtitle'],
    icon: Heading03Icon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run(),
  },
  {
    title: 'bullet list',
    description: 'unordered list',
    keywords: ['ul', 'list'],
    icon: LeftToRightListBulletIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: 'numbered list',
    description: 'ordered list',
    keywords: ['ol', 'list'],
    icon: LeftToRightListNumberIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: 'quote',
    description: 'blockquote',
    keywords: ['blockquote', 'cite'],
    icon: QuoteDownIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    title: 'code block',
    description: 'monospace block',
    keywords: ['code', 'pre'],
    icon: CodeSquareIcon,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: 'divider',
    description: 'horizontal rule',
    keywords: ['hr', 'rule', 'separator'],
    icon: MinusSignIcon,
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
