'use client';

import * as React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ChatMessage {
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
}

interface ChatState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id'>) => void;
  setMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;
  unreadCount: number;
  incrementUnread: () => void;
  resetUnread: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  sessionId: string;
  userId: string;
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
  pendingBooking: {
    bookingId: string;
    clientSecret: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
  } | null;
  setPendingBooking: (booking: ChatState['pendingBooking'] | ((prev: ChatState['pendingBooking']) => ChatState['pendingBooking'])) => void;
}

const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
const generateUserId = () => `guest_${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

export const useChat = create<ChatState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      setIsOpen: (open) => set({ isOpen: open, unreadCount: open ? 0 : get().unreadCount }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen, unreadCount: state.isOpen ? 0 : state.unreadCount })),
      
      messages: [],
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, { ...message, id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) }],
        unreadCount: state.isOpen ? state.unreadCount : state.unreadCount + 1
      })),
      setMessages: (messages) => set({ messages }),
      clearMessages: () => set({ messages: [] }),
      
      unreadCount: 0,
      incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
      resetUnread: () => set({ unreadCount: 0 }),
      
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      sessionId: generateSessionId(),
      userId: generateUserId(),
      
      conversationId: null,
      setConversationId: (id) => set({ conversationId: id }),
      
      pendingBooking: null,
      setPendingBooking: (booking) => set((state) => ({ 
        pendingBooking: typeof booking === 'function' ? booking(state.pendingBooking) : booking 
      })),
    }),
    {
      name: 'tradeslot-chat',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessionId: state.sessionId,
        userId: state.userId,
        conversationId: state.conversationId,
        messages: state.messages.slice(-50), // Keep last 50 messages
      }),
    }
  )
);