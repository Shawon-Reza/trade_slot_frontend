'use client';

import * as React from 'react';
import { Send, Mic, Paperclip, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [content, setContent] = React.useState('');
  const [hasContent, setHasContent] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setHasContent(value.trim().length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!content.trim() || disabled) return;
    onSend(content.trim());
    setContent('');
    setHasContent(false);
    textareaRef.current?.focus();
  };

  const handleAutoResize = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
      <div className="relative">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleAutoResize}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            className={cn(
              'w-full pr-14 py-2.5 pl-4 bg-zinc-50 dark:bg-zinc-800',
              'border border-zinc-200 dark:border-zinc-700 rounded-xl',
              'text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'resize-none text-sm leading-relaxed',
              'transition-colors'
            )}
            aria-label="Chat message"
            aria-disabled={disabled}
          />
          
          {/* Attachment & emoji buttons */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              aria-label="Attach file"
              disabled={disabled}
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              aria-label="Add emoji"
              disabled={disabled}
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Send button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!hasContent || disabled}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-200',
            'flex items-center justify-center',
            hasContent && !disabled
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
          )}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      {/* Quick suggestions when empty */}
      {!hasContent && !disabled && (
        <div className="mt-3 flex flex-wrap gap-2" role="list" aria-label="Quick suggestions">
          {[
            'Book 20/08/2026 10:00',
            'Available tomorrow 14:00',
            'Book plumber for 20/08/2026',
            'What\'s available Friday?'
          ].map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setContent(suggestion);
                setHasContent(true);
              }}
              className="px-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              role="listitem"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}