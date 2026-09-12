import { Extension, ReactRenderer } from '@tiptap/react';
import { Suggestion, type SuggestionKeyDownProps, type SuggestionProps } from '@tiptap/suggestion';
import { filterSlashCommandItems, type SlashCommandItem } from './slash-command-items';
import { SlashCommandMenu, type SlashCommandMenuHandle } from './slash-command-menu';

type SlashCommandProps = SuggestionProps<SlashCommandItem, SlashCommandItem>;

export const SlashCommands = Extension.create({
  name: 'slashCommands',

  addProseMirrorPlugins() {
    return [
      Suggestion<SlashCommandItem, SlashCommandItem>({
        editor: this.editor,
        char: '/',
        allowSpaces: false,
        items: ({ query }) => filterSlashCommandItems(query),
        command: ({ editor, range, props }) => props.command({ editor, range }),
        render: () => {
          let renderer: ReactRenderer<SlashCommandMenuHandle> | null = null;
          let unmount: (() => void) | null = null;

          return {
            onStart: (props: SlashCommandProps) => {
              renderer = new ReactRenderer(SlashCommandMenu, {
                editor: props.editor,
                props: { items: props.items, command: props.command },
              });
              unmount = props.mount(renderer.element);
            },
            onUpdate: (props: SlashCommandProps) => {
              renderer?.updateProps({ items: props.items, command: props.command });
            },
            onKeyDown: (props: SuggestionKeyDownProps) => {
              if (props.event.key === 'Escape') {
                unmount?.();
                return true;
              }
              return renderer?.ref?.onKeyDown(props.event) ?? false;
            },
            onExit: () => {
              unmount?.();
              renderer?.destroy();
              renderer = null;
              unmount = null;
            },
          };
        },
      }),
    ];
  },
});
