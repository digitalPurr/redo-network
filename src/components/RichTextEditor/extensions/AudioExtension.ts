
import { Node, mergeAttributes } from '@tiptap/core';

export interface AudioOptions {
  inline: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    audio: {
      setAudio: (options: { src: string }) => ReturnType;
    };
  }
}

export const Audio = Node.create<AudioOptions>({
  name: 'audio',

  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'audio',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'audio',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        controls: true,
        class: 'audio-embed w-full rounded-lg',
      }),
    ];
  },

  addCommands() {
    return {
      setAudio:
        (options: { src: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
