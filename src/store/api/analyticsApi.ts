import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export interface DashboardStats {
  totalChats: number;
  totalUsers: number;
  conversionRate: number;
  botAccuracy: number;
}

export interface ChannelStats {
  channel: string;
  activeSessions: number;
  conversionRate: number;
  color: string;
}

export interface PopularQuery {
  query: string;
  count: number;
  percentage: number;
}

export interface ProductDemand {
  productName: string;
  monthlyRequests?: number;
  predictedRequests?: number;
  trend: number;
  percentage: number;
  trendText?: string;
}

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery,
  tagTypes: ['Analytics'],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => 'analytics/dashboard',
      providesTags: ['Analytics'],
    }),
    getChannelStats: builder.query<ChannelStats[], void>({
      query: () => 'analytics/channels',
      providesTags: ['Analytics'],
    }),
    getPopularQueries: builder.query<PopularQuery[], void>({
      query: () => 'analytics/popular-queries',
      providesTags: ['Analytics'],
    }),
    getLowDemandProducts: builder.query<ProductDemand[], void>({
      query: () => 'analytics/low-demand-products',
      providesTags: ['Analytics'],
    }),
    getHighDemandProducts: builder.query<ProductDemand[], void>({
      query: () => 'analytics/high-demand-products',
      providesTags: ['Analytics'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetChannelStatsQuery,
  useGetPopularQueriesQuery,
  useGetLowDemandProductsQuery,
  useGetHighDemandProductsQuery,
} = analyticsApi;