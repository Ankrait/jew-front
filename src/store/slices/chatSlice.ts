import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  currentSessionId: string | null;
  messages: any[];
  isConnected: boolean;
}

const initialState: ChatState = {
  currentSessionId: null,
  messages: [],
  isConnected: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentSession: (state, action: PayloadAction<string | null>) => {
      state.currentSessionId = action.payload;
    },
    addMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    clearChat: (state) => {
      state.currentSessionId = null;
      state.messages = [];
    },
  },
});

export const {
  setCurrentSession,
  addMessage,
  setMessages,
  setConnected,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;