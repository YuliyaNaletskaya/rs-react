import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, RawCharacter } from '../types/types';
import { fetchCharactersDetails } from './fetchCharacterDetails';

const MAX_CHARACTERS = 10;
const BASE_URL = `https://www.swapi.tech/api/people/`;

interface PaginatedResult {
  characters: Character[];
  totalPages: number;
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getCharacters: builder.query<
      PaginatedResult,
      { search: string; page: number }
    >({
      async queryFn({ search, page }) {
        const url = search
          ? `?name=${encodeURIComponent(search)}&page=${page}&limit=${MAX_CHARACTERS}`
          : `?page=${page}&limit=${MAX_CHARACTERS}`;
        try {
          const res = await fetch(`${BASE_URL}${url}`);
          const data = await res.json();

          const rawResults: RawCharacter[] = Array.isArray(data.results)
            ? data.results
            : Array.isArray(data.result)
              ? data.result
              : [];

          const characters: Character[] = await Promise.all(
            rawResults.map(fetchCharactersDetails)
          );
          return { data: { characters, totalPages: data.total_pages || 1 } };
        } catch (error) {
          return {
            error: {
              status: 'FETCH_ERROR',
              data: undefined,
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      providesTags: (result) =>
        result?.characters
          ? [{ type: 'Characters', id: 'LIST' }]
          : [{ type: 'Characters', id: 'LIST' }],
    }),

    invalidateCharacters: builder.mutation<void, void>({
      queryFn: async () => ({ data: undefined }),
      invalidatesTags: [{ type: 'Characters', id: 'LIST' }],
    }),
  }),
});

export const { useGetCharactersQuery, useInvalidateCharactersMutation } =
  charactersApi;
