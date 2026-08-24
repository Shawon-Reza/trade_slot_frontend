export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api';

interface ChatbotRequest {
  message: string;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

interface ChatbotResponse {
  success: boolean;
  messagesProcessed: number;
  responses: Array<{
    content: string;
    timestamp: string;
  }>;
}

interface Message {
  sender: 'CUSTOMER' | 'BOT' | 'TRADER';
  content: string;
  timestamp: string;
  externalId: string | null;
  channel: 'CHATBOT' | 'WHATSAPP';
  customerIdentifier: string;
  customerName: string | null;
}

interface ConversationResponse {
  success: boolean;
  conversation: {
    id: string;
    customerId: string;
    channel: 'CHATBOT' | 'WHATSAPP';
    status: 'ACTIVE' | 'CLOSED';
    externalId: string | null;
    messages: Message[];
    customer: {
      id: string;
      name: string | null;
      phone: string | null;
      email: string | null;
    };
  };
}

export async function sendChatMessage(data: ChatbotRequest): Promise<ChatbotResponse> {
  const { axiosApi } = await import('@/lib/axios');
  const res = await axiosApi.post('/api/chat/webhook/chatbot', data);
  return res.data;
}

export async function getConversation(conversationId: string) {
  const { axiosApi } = await import('@/lib/axios');
  const res = await axiosApi.get(`/chat/conversations/${conversationId}`);
  return res.data;
}

export async function sendTraderMessage(conversationId: string, content: string) {
  const { axiosApi } = await import('@/lib/axios');
  const res = await axiosApi.post(`/chat/conversations/${conversationId}/messages`, { content });
  return res.data;
}

export interface PaymentIntentRequest {
  bookingId: string;
  amount: number;
  currency: string;
  applicationFeeAmount: number;
  stripeAccountId: string;
  customerEmail: string;
}

export interface PaymentIntentResponse {
  success: boolean;
  clientSecret: string;
  paymentIntentId: string;
}

export async function createPaymentIntent(data: PaymentIntentRequest): Promise<PaymentIntentResponse> {
  const { axiosApi } = await import('@/lib/axios');
  const res = await axiosApi.post('/api/stripe/payment-intent', data);
  return res.data;
}