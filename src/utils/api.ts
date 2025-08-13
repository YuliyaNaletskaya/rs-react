import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Character,
  RawCharacter,
  ApiResponseGeneral,
  ApiResponseSearch,
} from '../types/types';

const MAX_CHARACTERS = 10;

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.swapi.tech/api/people/' }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { characters: Character[]; totalPages: number },
      { search: string; page: number }
    >({
      async queryFn({ search, page }, _api, _extraOptions, baseQuery) {
        const queryUrl = search
          ? `?name=${encodeURIComponent(search)}&page=${page}&limit=${MAX_CHARACTERS}`
          : `?page=${page}&limit=${MAX_CHARACTERS}`;

        const listRes = await baseQuery({ url: queryUrl });
        if (
          'error' in listRes ||
          !listRes.data ||
          typeof listRes.data !== 'object'
        ) {
          return {
            error: listRes.error || { status: 'FETCH_ERROR', error: 'No data' },
          };
        }

        const data = listRes.data as ApiResponseSearch | ApiResponseGeneral;
        const rawCharacters = Array.isArray((data as ApiResponseSearch).result)
          ? (data as ApiResponseSearch).result
          : (data as ApiResponseGeneral).results;

        const characters: Character[] = await Promise.all(
          rawCharacters.map(async (raw) => {
            const detailRes = await baseQuery({ url: `${raw.uid}` });
            if (
              'error' in detailRes ||
              !detailRes.data ||
              typeof detailRes.data !== 'object'
            ) {
              return {
                uid: raw.uid,
                name: raw.name ?? 'unknown',
                description: raw.description ?? 'no description',
                birth_year: 'unknown',
                gender: 'unknown',
                homeworld: 'unknown',
              };
            }

            const detail = detailRes.data as {
              result: {
                properties: RawCharacter['properties'];
                description?: string;
              };
            };
            const props = detail.result.properties;

            let homeworldName = 'unknown';
            if (props?.homeworld) {
              const hwRes = await baseQuery({ url: props.homeworld });
              if (
                'data' in hwRes &&
                hwRes.data &&
                typeof hwRes.data === 'object'
              ) {
                const hwData = hwRes.data as {
                  result?: { properties?: { name?: string; title?: string } };
                };
                homeworldName =
                  hwData.result?.properties?.name ??
                  hwData.result?.properties?.title ??
                  'unknown';
              }
            }

            return {
              uid: raw.uid,
              name: props?.name ?? raw.name ?? 'unknown',
              description:
                detail.result.description ??
                raw.description ??
                'no description',
              birth_year: props?.birth_year ?? 'unknown',
              gender: props?.gender ?? 'unknown',
              hair_color: props?.hair_color,
              height: props?.height,
              eye_color: props?.eye_color,
              mass: props?.mass,
              homeworld: homeworldName,
            };
          })
        );

        const totalPages =
          (listRes.data as { total_pages?: number }).total_pages ?? 1;

        return { data: { characters, totalPages } };
      },
      providesTags: [{ type: 'Characters', id: 'LIST' }],
    }),

    invalidateCharacters: builder.mutation<void, void>({
      queryFn: async () => ({ data: undefined }),
      invalidatesTags: [{ type: 'Characters', id: 'LIST' }],
    }),
  }),
});

export const { useGetCharactersQuery, useInvalidateCharactersMutation } =
  charactersApi;
