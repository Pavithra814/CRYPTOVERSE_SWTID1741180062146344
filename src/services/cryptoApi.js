import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  // Get your API key from https://rapidapi.com/Coinranking/api/coinranking1
  "x-rapidapi-key": "0c41f83a6cmshe1a3145e5732014p1a2d43jsn6cf88c7ec764"
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ 
  url, 
  headers: cryptoApiHeaders
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
      transformResponse: (response) => ({
        stats: response.data.stats,
        coins: response.data.coins,
      }),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
      transformResponse: (response) => response.data,
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => 
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
