'use client';

import * as React from 'react';
import { MapPin, Clock, PoundSterling, CreditCard, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useChat } from './useChat';

interface ChatMessagesProps {
  messages: Array<{
    id: string;
    sender: 'user' | 'bot' | 'trader';
    content: string;
    timestamp: Date;
    isBookingConfirmation?: boolean;
    bookingData?: {
      bookingId: string;
      startAt: string;
      endAt: string;
      fee: number;
      currency: string;
    };
  }>;
  isLoading: boolean;
  pendingBooking: {
    bookingId: string;
    clientSecret: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
  } | null;
  onPaymentClick: () => void;
}

export function ChatMessages({ messages, isLoading, pendingBooking, onPaymentClick }: ChatMessagesProps) {
  const { clearMessages } = useChat();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const parseBookingInfo = (content: string) => {
    // Extract booking details from bot message
    const dateMatch = content.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
    const timeMatch = content.match(/(\d{1,2}:\d{2}\s*[AP]M|\d{2}:\d{2})/);
    const feeMatch = content.match(/[£$]\d+(\.\d{2})?/);
    
    return {
      date: dateMatch?.[1],
      time: timeMatch?.[1],
      fee: feeMatch?.[0],
    };
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">How can I help?</h4>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-xs">
          Try saying: "Book 20/08/2026 10:00" or "What's available tomorrow?"
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            className="px-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            onClick={() => clearMessages()}
          >
            Clear chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite">
      {messages.map((message) => {
        const normalized = {
          ...message,
          sender: (message.sender === 'user' || message.sender === 'bot' || message.sender === 'trader') 
            ? message.sender 
            : 'bot',
          timestamp: message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp),
        };
        const isUser = normalized.sender === 'user';
        const isBooking = normalized.isBookingConfirmation;
        const bookingInfo = parseBookingInfo(normalized.content);
        
return (
          <div 
            key={normalized.id} 
            className={cn(
              'flex gap-3 animate-in fade-in-0',
              isUser ? 'justify-end' : 'justify-start'
            )}
          >
            {!isUser && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            )}
            
            <div className={cn(
              'max-w-[75%] rounded-2xl px-4 py-2.5',
              isUser 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-md'
            )}>
              <p className="text-sm whitespace-pre-wrap">{normalized.content}</p>
              
              {isBooking && bookingInfo && (
                <div className="mt-3 p-3 bg-white/50 dark:bg-zinc-700/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Location: {bookingInfo.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Time: {bookingInfo.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-purple-600 dark:text-purple-400 mb-2">
                    <PoundSterling className="h-3.5 w-3.5" />
                    <span>Fee: {bookingInfo.fee}</span>
                  </div>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full gap-1.5"
                    onClick={onPaymentClick}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    Pay Now
                  </Button>
                </div>
              )}
              
              <p className={cn(
                'mt-1.5 text-xs',
                isUser ? 'text-purple-100' : 'text-zinc-500 dark:text-zinc-400'
              )}>
                {formatTime(normalized.timestamp)}
              </p>
            </div>

            {isUser && (
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">U</span>
              </div>
            )}
          </div>
        );
      })}

      {isLoading && (
        <div className="flex justify-start gap-3 animate-in fade-in-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[75%]">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}