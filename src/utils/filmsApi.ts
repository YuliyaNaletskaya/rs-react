import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FilmApiResponse, FilmData } from '../types/types';

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.swapi.tech/api/' }),
  endpoints: (builder) => ({
    getFilms: builder.query<FilmData[], void>({
      query: () => 'films',
      transformResponse: (response: FilmApiResponse): FilmData[] =>
        response.result.map((f) => f.properties),
    }),
  }),
});

export const { useGetFilmsQuery } = filmsApi;
