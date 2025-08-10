// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface HomeworldResponse {
//   result?: {
//     properties?: {
//       name?: string;
//       title?: string;
//     };
//   };
// }

// export const homeworldApi = createApi({
//   reducerPath: 'homeworldApi',
//   baseQuery: fetchBaseQuery({ baseUrl: '' }),
//   endpoints: (builder) => ({
//     getHomeworld: builder.query<string, string>({
//       query: (url) => ({
//         url,
//         method: 'GET',
//       }),
//       transformResponse: (response: HomeworldResponse): string =>
//         response.result?.properties?.name ||
//         response.result?.properties?.title ||
//         'unknown',
//     }),
//   }),
// });

// export const { useGetHomeworldQuery } = homeworldApi;
