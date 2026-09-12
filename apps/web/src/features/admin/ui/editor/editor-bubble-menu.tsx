'use client';

import {
  Link01Icon,
  SourceCodeIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from '@hugeicons/core-free-icons';
import type { Editor } from '@tiptap/react';
import { useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { promptForLink } from './link';
import { ToolbarButton } from './toolbar-button';

export function EditorBubbleMenu({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      bold: current.isActive('bold'),
      italic: current.isActive('italic'),
      strike: current.isActive('strike'),
      code: current.isActive('code'),
      link: current.isActive('link'),
    }),
  });

  return (
    <BubbleMenu
      editor={editor}
      options={{ placement: 'top', offset: 8 }}
      shouldShow={({ editor: current, from, to }) =>
        from !== to && current.isEditable && !current.isActive('codeBlock')
      }
      className="bg-card border-border flex items-center gap-0.5 rounded-md border p-1 shadow-md"
    >
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
        label="code"
        active={state.code}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <ToolbarButton
        icon={Link01Icon}
        label="link"
        active={state.link}
        onClick={() => promptForLink(editor)}
      />
    </BubbleMenu>
  );
}
