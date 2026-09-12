'use client';

import { Skeleton } from '@/shared/components/ui/skeleton';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from '@tiptap/markdown';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorBubbleMenu } from './editor-bubble-menu';
import { EditorToolbar } from './editor-toolbar';
import { SlashCommands } from './slash-commands';

interface TiptapEditorProps {
  initialContent: string;
  placeholder?: string;
  onChange: (markdown: string) => void;
}

export function TiptapEditorSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-1 py-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-4" style={{ width: `${65 + ((index * 19) % 35)}%` }} />
      ))}
    </div>
  );
}

/**
 * The editor is uncontrolled on purpose: Tiptap owns the document and reports
 * markdown upward, so the parent never feeds content back and the cursor stays
 * put while typing.
 */
export function TiptapEditor({ initialContent, placeholder, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Markdown,
      SlashCommands,
      Placeholder.configure({
        placeholder: placeholder ?? 'write here, or type / for blocks.',
      }),
    ],
    content: initialContent,
    contentType: 'markdown',
    editorProps: { attributes: { class: 'tiptap' } },
    onUpdate: ({ editor: current }) => onChange(current.getMarkdown()),
  });

  if (!editor) return <TiptapEditorSkeleton />;

  return (
    <div className="flex flex-col">
      <EditorToolbar editor={editor} />
      <EditorBubbleMenu editor={editor} />
      <div className="prose-reading px-1 py-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
