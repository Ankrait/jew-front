import { configureStore } from '@reduxjs/toolkit';
import { analyticsApi } from './api/analyticsApi';
import { authApi } from './api/authApi';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
	reducer: {
		[analyticsApi.reducerPath]: analyticsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,
		products: productsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		})
			.concat(analyticsApi.middleware)
			.concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
