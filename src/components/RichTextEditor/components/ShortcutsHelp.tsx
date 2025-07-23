
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Keyboard, Command } from 'lucide-react';

const shortcuts = [
  { keys: ['Ctrl', 'B'], description: 'Bold text' },
  { keys: ['Ctrl', 'I'], description: 'Italic text' },
  { keys: ['Ctrl', 'U'], description: 'Underline text' },
  { keys: ['Ctrl', 'K'], description: 'Insert link' },
  { keys: ['Ctrl', 'Z'], description: 'Undo' },
  { keys: ['Ctrl', 'Y'], description: 'Redo' },
  { keys: ['Ctrl', 'Shift', 'L'], description: 'Bullet list' },
  { keys: ['Ctrl', 'Shift', 'O'], description: 'Numbered list' },
  { keys: ['Ctrl', '1'], description: 'Heading 1' },
  { keys: ['Ctrl', '2'], description: 'Heading 2' },
  { keys: ['Ctrl', 'E'], description: 'Center align' },
  { keys: ['Ctrl', 'R'], description: 'Right align' },
  { keys: ['Ctrl', 'L'], description: 'Left align' },
  { keys: ['Ctrl', 'J'], description: 'Justify' },
];

const ShortcutsHelp: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Command className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Speed up your editing with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <Badge key={keyIndex} variant="outline" className="text-xs px-2 py-1">
                    {key}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShortcutsHelp;
