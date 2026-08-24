'use client';

import * as React from 'react';
import { X, Loader2, CheckCircle, AlertCircle, MapPin, Clock, PoundSterling, CreditCard, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChat } from './useChat';
import { sendChatMessage, createPaymentIntent, PaymentIntentRequest } from '@/lib/chat-api';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const {
    messages,
    addMessage,
    isLoading,
    setIsLoading,
    sessionId,
    userId,
    conversationId,
    setConversationId,
    pendingBooking,
    setPendingBooking,
  } = useChat();

  const [showPayment, setShowPayment] = React.useState(false);
  const [isCreatingPayment, setIsCreatingPayment] = React.useState(false);

  // Extract booking ID from confirmation message
  const extractBookingId = (content: string): string | null => {
    // Try to find booking ID pattern (e.g., "cm0abc123..." or similar)
    const bookingIdMatch = content.match(/booking\s+([a-zA-Z0-9]+)/i) ||
      content.match(/#([a-zA-Z0-9]{8,})/) ||
      content.match(/bookingId[:\s]+([a-zA-Z0-9]+)/i);
    return bookingIdMatch ? bookingIdMatch[1] : null;
  };

  // Create payment intent for confirmed booking
  const createPaymentForBooking = async (bookingId: string) => {
    setIsCreatingPayment(true);
    try {
      const paymentData: PaymentIntentRequest = {
        bookingId,
        amount: 2000, // £20.00 in pence
        currency: 'gbp',
        applicationFeeAmount: 200, // £2.00 platform fee
        stripeAccountId: 'acct_trader_stripe_id', // This should come from the booking/trader
        customerEmail: `${userId}@tradeslot.chat`,
      };

      const response = await createPaymentIntent(paymentData);

      if (response.success) {
        setPendingBooking({
          bookingId,
          clientSecret: response.clientSecret,
          status: 'pending',
        });
        setShowPayment(true);
      } else {
        throw new Error('Failed to create payment intent');
      }
    } catch (error) {
      console.error('Payment intent error:', error);
      addMessage({
        sender: 'bot',
        content: 'Failed to initialize payment. Please try again.',
        timestamp: new Date(),
      });
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message immediately
    addMessage({ sender: 'user', content, timestamp: new Date() });
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: content,
        sessionId,
        userId,
      });

      if (response.success && response.responses.length > 0) {
        for (const botResponse of response.responses) {
          // Check if it's a booking confirmation
          const isBooking = botResponse.content.toLowerCase().includes('booking confirmed') ||
            botResponse.content.toLowerCase().includes('fee:');

          addMessage({
            sender: 'bot',
            content: botResponse.content,
            timestamp: new Date(botResponse.timestamp),
            isBookingConfirmation: isBooking,
          });

          // If booking confirmed, automatically create payment intent
          if (isBooking) {
            const bookingId = extractBookingId(botResponse.content);
            if (bookingId) {
              await createPaymentForBooking(bookingId);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        sender: 'bot',
        content: 'Something went wrong. Please try again.',
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = async (bookingId: string, clientSecret: string) => {
    setPendingBooking((prev) => prev ? { ...prev, status: 'processing' as const } : null);

    try {
      // In a real implementation, you'd use Stripe.js here:
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: { card: elements.getElement(CardElement) }
      // });

      // For now, simulate the payment flow
      await new Promise(resolve => setTimeout(resolve, 2000));

      setPendingBooking((prev) => prev ? { ...prev, status: 'completed' as const } : null);
      addMessage({
        sender: 'bot',
        content: `Payment successful! Your booking ${bookingId} is now confirmed.`,
        timestamp: new Date(),
        isBookingConfirmation: true,
      });
      setShowPayment(false);
    } catch (error) {
      setPendingBooking((prev) => prev ? { ...prev, status: 'failed' as const } : null);
      addMessage({
        sender: 'bot',
        content: 'Payment failed. Please try again.',
        timestamp: new Date(),
      });
    }
  };

  const handleCancelPayment = () => {
    setShowPayment(false);
    setPendingBooking(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Chat Modal */}
      <div className={cn(
        'relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-[90vh] max-h-[700px]',
        'bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl',
        'flex flex-col overflow-hidden animate-in slide-in-from-bottom-2',
        'border border-zinc-200 dark:border-zinc-800'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">TradeSlot Assistant</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Typically replies within a minute</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Payment Overlay */}
        {showPayment && pendingBooking && (
          <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-sm z-10 flex items-center justify-center p-4 animate-in fade-in-0">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-6 animate-in zoom-in-95">
              <div className="text-center mb-6">
                {pendingBooking.status === 'completed' ? (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Payment Successful!</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">Your booking is now confirmed.</p>
                  </>
                ) : pendingBooking.status === 'failed' ? (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Payment Failed</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">Something went wrong. Please try again.</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Complete Payment</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">Secure payment via Stripe</p>
                  </>
                )}
              </div>
              <div className="space-y-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Booking Fee</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">£20.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Platform Fee</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">£2.00</span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t border-zinc-200 dark:border-zinc-700 pt-2">
                  <span className="text-zinc-900 dark:text-zinc-100">Total</span>
                  <span className="text-purple-600 dark:text-purple-400">£22.00</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleCancelPayment} disabled={pendingBooking.status === 'processing'}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  loading={pendingBooking.status === 'processing' || isCreatingPayment}
                  onClick={() => handlePaymentComplete(pendingBooking.bookingId, pendingBooking.clientSecret)}
                  disabled={pendingBooking.status === 'completed' || pendingBooking.status === 'failed'}
                >
                  {pendingBooking.status === 'processing' ? 'Processing...' :
                    pendingBooking.status === 'completed' ? 'Paid' :
                      pendingBooking.status === 'failed' ? 'Retry' : 'Pay £22.00'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          pendingBooking={pendingBooking}
          onPaymentClick={() => {
            // Find the latest booking confirmation message and extract booking ID
            const bookingMsg = [...messages].reverse().find(m => m.isBookingConfirmation);
            if (bookingMsg) {
              const bookingId = extractBookingId(bookingMsg.content);
              if (bookingId) {
                createPaymentForBooking(bookingId);
              }
            }
          }}
        />

        {/* Input */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}