
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
  Separator
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { SoundCloud } from './RichTextEditor/extensions/SoundCloudExtension';
import { Video } from './RichTextEditor/extensions/VideoExtension';
import { Audio } from './RichTextEditor/extensions/AudioExtension';
import { Callout } from './RichTextEditor/extensions/CalloutExtension';
import { Divider } from './RichTextEditor/extensions/DividerExtension';
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
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  content, 
  onChange, 
  placeholder = "Start creating your page..." 
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  
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
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
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
        {/* Toolbar */}
        <div className="border-b border-border p-2 flex flex-wrap gap-1 bg-muted/50">
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

          {/* Text Alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            tooltip="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            tooltip="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            tooltip="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            tooltip="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Lists */}
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

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            tooltip="Quote Block"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Callouts */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Insert Callout</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => editor.chain().focus().setCallout({ type: 'info' }).run()}>
                <Info className="h-4 w-4 mr-2 text-blue-500" />
                Info Callout
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().setCallout({ type: 'warning' }).run()}>
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                Warning Callout
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().setCallout({ type: 'success' }).run()}>
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Success Callout
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().setCallout({ type: 'error' }).run()}>
                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                Error Callout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dividers */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Minus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Insert Divider</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => editor.chain().focus().setDivider({ style: 'solid' }).run()}>
                <Separator className="h-4 w-4 mr-2" />
                Solid Line
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().setDivider({ style: 'dashed' }).run()}>
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Dashed Line
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().setDivider({ style: 'dotted' }).run()}>
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Dotted Line
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
            onClick={() => handleFileUpload('audio')}
            tooltip="Upload Audio"
          >
            <AudioLines className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-border mx-1" />

          {/* External embeds */}
          <ToolbarButton
            onClick={addYouTube}
            tooltip="Embed YouTube Video"
          >
            <YoutubeIcon className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={addSoundCloud}
            tooltip="Embed SoundCloud Track"
          >
            <Music className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Color picker */}
          <DropdownMenu open={showColorPicker} onOpenChange={setShowColorPicker}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Palette className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Set Text Color</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent className="w-48">
              <div className="grid grid-cols-6 gap-1 p-2">
                {[
                  '#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#ffffff',
                  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
                  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
                  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#be123c'
                ].map((color) => (
                  <button
                    key={color}
                    className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColorPicker(false);
                    }}
                  />
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-6 bg-border mx-1" />

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

        {/* Editor */}
        <EditorContent editor={editor} className="min-h-[400px]" />
      </div>
    </TooltipProvider>
  );
};

export default RichTextEditor;
