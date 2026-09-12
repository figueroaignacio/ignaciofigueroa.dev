'use client';

import { Separator } from '@/shared/components/ui/separator';
import {
  ArrowTurnBackwardIcon,
  ArrowTurnForwardIcon,
  CodeSquareIcon,
  Heading02Icon,
  Heading03Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  Link01Icon,
  MinusSignIcon,
  ParagraphIcon,
  QuoteDownIcon,
  SourceCodeIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from '@hugeicons/core-free-icons';
import type { Editor } from '@tiptap/react';
import { useEditorState } from '@tiptap/react';
import { promptForLink } from './link';
import { ToolbarButton } from './toolbar-button';

export function EditorToolbar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      paragraph: current.isActive('paragraph'),
      heading2: current.isActive('heading', { level: 2 }),
      heading3: current.isActive('heading', { level: 3 }),
      bold: current.isActive('bold'),
      italic: current.isActive('italic'),
      strike: current.isActive('strike'),
      code: current.isActive('code'),
      link: current.isActive('link'),
      bulletList: current.isActive('bulletList'),
      orderedList: current.isActive('orderedList'),
      blockquote: current.isActive('blockquote'),
      codeBlock: current.isActive('codeBlock'),
      canUndo: current.can().undo(),
      canRedo: current.can().redo(),
    }),
  });

  return (
    <div className="border-border bg-background/80 sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b py-1.5 backdrop-blur">
      <ToolbarButton
        icon={ParagraphIcon}
        label="paragraph"
        active={state.paragraph}
        onClick={() => editor.chain().focus().setParagraph().run()}
      />
      <ToolbarButton
        icon={Heading02Icon}
        label="heading 2"
        active={state.heading2}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolbarButton
        icon={Heading03Icon}
        label="heading 3"
        active={state.heading3}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToolbarButton
        icon={TextBoldIcon}
        label="bold"
        active={state.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={TextItalicIcon}
        label="italic"
        active={state.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        icon={TextStrikethroughIcon}
        label="strikethrough"
        active={state.strike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <ToolbarButton
        icon={SourceCodeIcon}
        label="inline code"
        active={state.code}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <ToolbarButton
        icon={Link01Icon}
        label="link"
        active={state.link}
        onClick={() => promptForLink(editor)}
      />
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToolbarButton
        icon={LeftToRightListBulletIcon}
        label="bullet list"
        active={state.bulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        icon={LeftToRightListNumberIcon}
        label="numbered list"
        active={state.orderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        icon={QuoteDownIcon}
        label="quote"
        active={state.blockquote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <ToolbarButton
        icon={CodeSquareIcon}
        label="code block"
        active={state.codeBlock}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      <ToolbarButton
        icon={MinusSignIcon}
        label="divider"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToolbarButton
        icon={ArrowTurnBackwardIcon}
        label="undo"
        disabled={!state.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolbarButton
        icon={ArrowTurnForwardIcon}
        label="redo"
        disabled={!state.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  );
}
