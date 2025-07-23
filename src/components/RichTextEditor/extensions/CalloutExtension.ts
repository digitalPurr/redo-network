
import { Node, mergeAttributes } from '@tiptap/core';

export interface CalloutOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (options: { type: 'info' | 'warning' | 'success' | 'error' }) => ReturnType;
    };
  }
}

export const Callout = Node.create<CalloutOptions>({
  name: 'callout',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  content: 'block+',

  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => ({
          'data-type': attributes.type,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-callout]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { type } = HTMLAttributes;
    const classMap = {
      info: 'border-blue-200 bg-blue-50 text-blue-900',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
      success: 'border-green-200 bg-green-50 text-green-900',
      error: 'border-red-200 bg-red-50 text-red-900',
    };

    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-callout': '',
        class: `callout border-l-4 p-4 rounded-lg ${classMap[type] || classMap.info}`,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCallout:
        (options: { type: 'info' | 'warning' | 'success' | 'error' }) =>
        ({ commands }) => {
          return commands.wrapIn(this.name, options);
        },
    };
  },
});
