import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

// Create lowlight instance with common languages
const lowlight = createLowlight(common);

export const CodeBlockExtension = CodeBlockLowlight.configure({
  lowlight,
  defaultLanguage: 'javascript',
  HTMLAttributes: {
    class: 'code-block bg-secondary/20 border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto',
  },
});