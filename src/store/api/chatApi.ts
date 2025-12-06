import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export interface Message {
  id: string;
  text: string;
  sender: 'USER' | 'BOT';
  sessionId: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  clientId: string;
  clientName?: string;
  status: 'ACTIVE' | 'WAITING' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
}

export interface CreateMessageRequest {
  text: string;
  sender: 'USER' | 'BOT';
  sessionId: string;
}

export interface CreateChatSessionRequest {
  clientId: string;
  clientName?: string;
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery,
  tagTypes: ['ChatSession', 'Message'],
  endpoints: (builder) => ({
    getChatSessions: builder.query<ChatSession[], void>({
      query: () => 'chats/sessions',
      providesTags: ['ChatSession'],
    }),
    getChatSession: builder.query<ChatSession, string>({
      query: (id) => `chats/sessions/${id}`,
      providesTags: ['ChatSession'],
    }),
    createChatSession: builder.mutation<ChatSession, CreateChatSessionRequest>({
      query: (data) => ({
        url: 'chats/sessions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ChatSession'],
    }),
    createMessage: builder.mutation<Message, CreateMessageRequest>({
      query: (data) => ({
        url: 'chats/messages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),
    getMessages: builder.query<Message[], string>({
      query: (sessionId) => `chats/sessions/${sessionId}/messages`,
      providesTags: ['Message'],
    }),
    updateChatSession: builder.mutation<ChatSession, { id: string; status: 'ACTIVE' | 'WAITING' | 'CLOSED' }>({
      query: ({ id, status }) => ({
        url: `chats/sessions/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['ChatSession'],
    }),
    getChatStats: builder.query<{
      totalChats: number;
      totalUsers: number;
      conversionRate: number;
      activeChats: number;
    }, void>({
      query: () => 'chats/stats',
    }),
  }),
});

export const {
  useGetChatSessionsQuery,
  useGetChatSessionQuery,
  useCreateChatSessionMutation,
  useCreateMessageMutation,
  useGetMessagesQuery,
  useUpdateChatSessionMutation,
  useGetChatStatsQuery,
} = chatApi;