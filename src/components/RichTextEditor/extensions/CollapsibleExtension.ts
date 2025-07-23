import { Node, mergeAttributes } from '@tiptap/core';

export interface CollapsibleOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    collapsible: {
      setCollapsible: (options?: { summary?: string; defaultOpen?: boolean }) => ReturnType;
    };
  }
}

export const Collapsible = Node.create<CollapsibleOptions>({
  name: 'collapsible',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  content: 'block+',

  addAttributes() {
    return {
      summary: {
        default: 'Click to expand',
        parseHTML: element => element.getAttribute('data-summary'),
        renderHTML: attributes => ({
          'data-summary': attributes.summary,
        }),
      },
      defaultOpen: {
        default: false,
        parseHTML: element => element.hasAttribute('open'),
        renderHTML: attributes => attributes.defaultOpen ? { open: '' } : {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'details[data-collapsible]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { summary, defaultOpen } = HTMLAttributes;

    return [
      'details',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-collapsible': '',
        class: 'collapsible border border-border rounded-lg my-4',
        ...(defaultOpen && { open: '' }),
      }),
      [
        'summary',
        {
          class: 'collapsible-summary cursor-pointer bg-secondary/50 px-4 py-2 rounded-t-lg font-medium hover:bg-secondary/70 transition-colors',
        },
        summary || 'Click to expand',
      ],
      [
        'div',
        {
          class: 'collapsible-content p-4',
        },
        0,
      ],
    ];
  },

  addCommands() {
    return {
      setCollapsible:
        (options = { summary: 'Click to expand', defaultOpen: false }) =>
        ({ commands }) => {
          return commands.wrapIn(this.name, options);
        },
    };
  },
});