
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline, 
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
  Upload
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { SoundCloud } from './RichTextEditor/extensions/SoundCloudExtension';
import { Video } from './RichTextEditor/extensions/VideoExtension';
import { Audio } from './RichTextEditor/extensions/AudioExtension';

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
  const editor = useEditor({
    extensions: [
      StarterKit,
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
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadFile(file, type);
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

  const setColor = (color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-border p-2 flex flex-wrap gap-1 bg-muted/50">
        {/* Text formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-accent' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-accent' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-accent' : ''}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-accent' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-accent' : ''}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Media uploads */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFileUpload('image')}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFileUpload('video')}
        >
          <VideoIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFileUpload('audio')}
        >
          <AudioLines className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* External embeds */}
        <Button
          variant="ghost"
          size="sm"
          onClick={addYouTube}
        >
          <YoutubeIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={addSoundCloud}
        >
          <Music className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Color picker */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setColor('#000000')}
          >
            <div className="w-4 h-4 bg-black rounded" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setColor('#ef4444')}
          >
            <div className="w-4 h-4 bg-red-500 rounded" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setColor('#3b82f6')}
          >
            <div className="w-4 h-4 bg-blue-500 rounded" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setColor('#10b981')}
          >
            <div className="w-4 h-4 bg-emerald-500 rounded" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setColor('#f59e0b')}
          >
            <div className="w-4 h-4 bg-amber-500 rounded" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setColor('#8b5cf6')}
          >
            <div className="w-4 h-4 bg-violet-500 rounded" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="min-h-[400px]" />
    </div>
  );
};

export default RichTextEditor;
