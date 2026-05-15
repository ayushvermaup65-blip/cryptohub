import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://min-api.cryptocompare.com/data";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",

  baseQuery: fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers) => {
      headers.set("authorization", "Apikey 99eefc3d1d3b8a6dbb93377a11df5478457dd5d100b948fd4d5a0a278aa5c694");

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => "/v2/news/?lang=EN",
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
