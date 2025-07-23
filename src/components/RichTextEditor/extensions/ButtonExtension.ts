import { Node, mergeAttributes } from '@tiptap/core';

export interface ButtonOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customButton: {
      setCustomButton: (options: { 
        text: string; 
        variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost';
        size?: 'sm' | 'default' | 'lg';
        url?: string;
      }) => ReturnType;
    };
  }
}

export const CustomButton = Node.create<ButtonOptions>({
  name: 'customButton',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      text: {
        default: 'Button',
        parseHTML: element => element.textContent,
        renderHTML: attributes => ({
          'data-text': attributes.text,
        }),
      },
      variant: {
        default: 'default',
        parseHTML: element => element.getAttribute('data-variant'),
        renderHTML: attributes => ({
          'data-variant': attributes.variant,
        }),
      },
      size: {
        default: 'default',
        parseHTML: element => element.getAttribute('data-size'),
        renderHTML: attributes => ({
          'data-size': attributes.size,
        }),
      },
      url: {
        default: '',
        parseHTML: element => element.getAttribute('href'),
        renderHTML: attributes => attributes.url ? {
          href: attributes.url,
          target: '_blank',
          rel: 'noopener noreferrer',
        } : {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-custom-button]',
      },
      {
        tag: 'button[data-custom-button]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { text, variant, size, url } = HTMLAttributes;
    
    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizeClasses = {
      sm: 'h-9 px-3 text-xs',
      default: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
    };

    const classes = `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default}`;

    const tag = url ? 'a' : 'button';

    return [
      tag,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-custom-button': '',
        class: classes,
        ...(url && {
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
        }),
      }),
      text || 'Button',
    ];
  },

  addCommands() {
    return {
      setCustomButton:
        (options: { 
          text: string; 
          variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost';
          size?: 'sm' | 'default' | 'lg';
          url?: string;
        }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});