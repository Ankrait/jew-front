import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

export const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.API_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes: ['ChatSession', 'Message', 'Analytics'],
	endpoints: () => ({}),
});
