import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './api/chatApi';
import { analyticsApi } from './api/analyticsApi';
import { authApi } from './api/authApi';
import chatReducer from './slices/chatSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    chat: chatReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(chatApi.middleware)
      .concat(analyticsApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;