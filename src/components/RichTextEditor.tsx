import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SoundCloud } from './RichTextEditor/extensions/SoundCloudExtension';
import { Video } from './RichTextEditor/extensions/VideoExtension';
import { Audio } from './RichTextEditor/extensions/AudioExtension';
import { Callout } from './RichTextEditor/extensions/CalloutExtension';
import { Divider } from './RichTextEditor/extensions/DividerExtension';
import { TableExtensions } from './RichTextEditor/extensions/TableExtension';
import { CodeBlockExtension } from './RichTextEditor/extensions/CodeBlockExtension';
import { Collapsible } from './RichTextEditor/extensions/CollapsibleExtension';
import { CustomButton } from './RichTextEditor/extensions/ButtonExtension';
import WordCount from './RichTextEditor/components/WordCount';
import ShortcutsHelp from './RichTextEditor/components/ShortcutsHelp';
import { useAutoSave } from './RichTextEditor/hooks/useAutoSave';
import { useAuth } from '@/hooks/use-auth';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough,
  Code as CodeIcon,
  Heading1, 
  Heading2, 
  List, 
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Music,
  Video as VideoIcon,
  AudioLines,
  Palette,
  Undo,
  Redo,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Minus,
  MoreHorizontal,
  Type,
  TableIcon,
  Code2,
  ChevronDown,
  Square,
  Link,
  Plus,
  Save
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  enableAutoSave?: boolean;
  profileId?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  content, 
  onChange, 
  placeholder = "Start creating your page...",
  enableAutoSave = false,
  profileId
}) => {
  const { user } = useAuth();
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Auto-save hook
  const { hasUnsavedChanges } = useAutoSave({
    content,
    profileId,
    enabled: enableAutoSave,
    interval: 30000 // 30 seconds
  });
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Code,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      SoundCloud,
      Video,
      Audio,
      Callout,
      Divider,
      ...TableExtensions,
      CodeBlockExtension,
      Collapsible,
      CustomButton,
      Color,
      TextStyle,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  const uploadFile = async (file: File, type: 'image' | 'video' | 'audio') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      
      if (!user?.user) {
        toast({
          title: "Authentication required",
          description: "You need to be logged in to upload files.",
          variant: "destructive",
        });
        return;
      }

      const filePath = `${user.user.id}/${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-content')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('user-content')
        .getPublicUrl(filePath);

      if (editor) {
        switch (type) {
          case 'image':
            editor.chain().focus().setImage({ src: data.publicUrl }).run();
            break;
          case 'video':
            editor.chain().focus().setVideo({ src: data.publicUrl }).run();
            break;
          case 'audio':
            editor.chain().focus().setAudio({ src: data.publicUrl }).run();
            break;
        }
      }

      toast({
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded`,
        description: `Your ${type} has been added to the editor.`,
      });
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast({
        title: "Upload failed",
        description: `There was an error uploading your ${type}.`,
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (type: 'image' | 'video' | 'audio') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    
    switch (type) {
      case 'image':
        input.accept = 'image/*';
        break;
      case 'video':
        input.accept = 'video/*';
        break;
      case 'audio':
        input.accept = 'audio/*';
        break;
    }
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach(file => uploadFile(file, type));
      }
    };
    input.click();
  };

  const addYouTube = () => {
    const url = prompt('Enter YouTube URL:');
    if (url && editor) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const addSoundCloud = () => {
    const url = prompt('Enter SoundCloud URL:');
    if (url && editor) {
      editor.commands.setSoundCloud({ src: url });
    }
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    tooltip, 
    children 
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    tooltip: string;
    children: React.ReactNode;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          disabled={disabled}
          className={isActive ? 'bg-accent' : ''}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );

  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Enhanced Toolbar */}
        <div className="border-b border-border p-2 bg-muted/50">
          <div className="flex flex-wrap gap-1 items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {/* Text formatting */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                tooltip="Bold (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                tooltip="Italic (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                tooltip="Underline (Ctrl+U)"
              >
                <UnderlineIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                tooltip="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
                tooltip="Inline Code"
              >
                <CodeIcon className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Headings */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                tooltip="Large Heading"
              >
                <Heading1 className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                tooltip="Medium Heading"
              >
                <Heading2 className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Lists and formatting */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                tooltip="Bullet List"
              >
                <List className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                tooltip="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Media uploads */}
              <ToolbarButton
                onClick={() => handleFileUpload('image')}
                tooltip="Upload Image"
              >
                <ImageIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => handleFileUpload('video')}
                tooltip="Upload Video"
              >
                <VideoIcon className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={addYouTube}
                tooltip="Embed YouTube Video"
              >
                <YoutubeIcon className="h-4 w-4" />
              </ToolbarButton>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Undo/Redo */}
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                tooltip="Undo (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                tooltip="Redo (Ctrl+Y)"
              >
                <Redo className="h-4 w-4" />
              </ToolbarButton>
            </div>

            {/* Right side tools */}
            <div className="flex items-center gap-2">
              <ShortcutsHelp />
              {hasUnsavedChanges && (
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <Save className="h-3 w-3" />
                  Unsaved changes
                </div>
              )}
              {enableAutoSave && !hasUnsavedChanges && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Auto-saved
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Editor */}
        <EditorContent editor={editor} className="min-h-[400px]" />

        {/* Footer with word count */}
        <div className="border-t border-border p-2 bg-muted/30">
          <WordCount content={content} />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default RichTextEditor;
