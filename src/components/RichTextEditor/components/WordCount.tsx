
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface WordCountProps {
  content: string;
}

const WordCount: React.FC<WordCountProps> = ({ content }) => {
  // Strip HTML tags and count words
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = textContent ? textContent.split(' ').length : 0;
  const charCount = textContent.length;
  
  // Calculate estimated reading time (average 200 WPM)
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Badge variant="outline" className="text-xs">
        {wordCount} words
      </Badge>
      <Badge variant="outline" className="text-xs">
        {charCount} characters
      </Badge>
      {wordCount > 0 && (
        <Badge variant="outline" className="text-xs">
          ~{readingTime} min read
        </Badge>
      )}
    </div>
  );
};

export default WordCount;
