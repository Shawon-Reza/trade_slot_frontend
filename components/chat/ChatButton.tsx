'use client';

import * as React from 'react';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ChatModal } from './ChatModal';
import { useChat } from './useChat';

export function ChatButton() {
  const { isOpen, setIsOpen, unreadCount } = useChat();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl',
          'bg-gradient-to-br from-purple-600 to-blue-600',
          'text-white flex items-center justify-center',
          'hover:scale-105 hover:shadow-2xl transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
          'animate-bounce-subtle'
        )}
        aria-label="Open chat"
        aria-expanded={isOpen}
      >
        <MessageCircle className="h-7 w-7" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-ping">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
      `}</style>
    </>
  );
}