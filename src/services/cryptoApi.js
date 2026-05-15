import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseUrl = "/crypto";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",

  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({

    // COINS LIST
    getCoins: builder.query({
      query: (count = 100) =>
        `/coins/markets?vs_currency=usd&per_page=${count}&page=1`,
    }),

    // COIN DETAILS
    getCryptoDetails: builder.query({
      query: (coinId) =>
        `/coins/${coinId}`,
    }),

    // HISTORY
    getCryptoHistory: builder.query({
      query: ({ coinId, days }) =>
        `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,

      keepUnusedDataFor: 120,
    }),

    // EXCHANGES
    getExchanges: builder.query({
      query: () =>
        `/exchanges`,
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;