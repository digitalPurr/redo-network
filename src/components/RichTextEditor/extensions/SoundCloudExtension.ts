
import { Node, mergeAttributes } from '@tiptap/core';

export interface SoundCloudOptions {
  inline: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    soundcloud: {
      setSoundCloud: (options: { src: string }) => ReturnType;
    };
  }
}

export const SoundCloud = Node.create<SoundCloudOptions>({
  name: 'soundcloud',

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
      width: {
        default: '100%',
      },
      height: {
        default: 166,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src*="soundcloud.com"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'iframe',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        frameborder: 0,
        allowtransparency: 'true',
        allow: 'encrypted-media',
        class: 'soundcloud-embed',
      }),
    ];
  },

  addCommands() {
    return {
      setSoundCloud:
        (options: { src: string }) =>
        ({ commands }) => {
          const { src } = options;
          
          // Convert SoundCloud URL to embed URL
          let embedUrl = src;
          if (src.includes('soundcloud.com') && !src.includes('/embed/')) {
            // Extract track/playlist from URL and convert to embed format
            const trackMatch = src.match(/soundcloud\.com\/([^\/]+\/[^\/\?]+)/);
            if (trackMatch) {
              embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(src)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
            }
          }

          return commands.insertContent({
            type: this.name,
            attrs: {
              src: embedUrl,
            },
          });
        },
    };
  },
});
