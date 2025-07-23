
import { Node, mergeAttributes } from '@tiptap/core';

export interface DividerOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    divider: {
      setDivider: (options?: { style?: 'solid' | 'dashed' | 'dotted' }) => ReturnType;
    };
  }
}

export const Divider = Node.create<DividerOptions>({
  name: 'divider',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  addAttributes() {
    return {
      style: {
        default: 'solid',
        parseHTML: element => element.getAttribute('data-style'),
        renderHTML: attributes => ({
          'data-style': attributes.style,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'hr[data-divider]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { style } = HTMLAttributes;
    const styleClass = style === 'dashed' ? 'border-dashed' : style === 'dotted' ? 'border-dotted' : 'border-solid';

    return [
      'hr',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-divider': '',
        class: `my-4 border-t-2 ${styleClass} border-border`,
      }),
    ];
  },

  addCommands() {
    return {
      setDivider:
        (options = { style: 'solid' }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
