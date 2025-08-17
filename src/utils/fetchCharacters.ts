import type {
  Character,
  RawCharacter,
  ApiResponseGeneral,
  ApiResponseSearch,
} from '@/types/types';

const BASE = 'https://www.swapi.tech/api/people';
const MAX_CHARACTERS = 10;

export async function fetchCharactersServer(
  search: string,
  page: number
): Promise<{ characters: Character[]; totalPages: number }> {
  const queryUrl = search
    ? `${BASE}/?name=${encodeURIComponent(search)}&page=${page}&limit=${MAX_CHARACTERS}`
    : `${BASE}/?page=${page}&limit=${MAX_CHARACTERS}`;

  const listRes = await fetch(queryUrl, { cache: 'no-store' });
  if (!listRes.ok) {
    throw new Error(`Failed to fetch list: ${listRes.status}`);
  }

  const data: ApiResponseSearch | ApiResponseGeneral = await listRes.json();

  const rawCharacters: RawCharacter[] = Array.isArray(
    (data as ApiResponseSearch).result
  )
    ? (data as ApiResponseSearch).result.map((r) => ({
        uid: r.uid,
        name: r.name,
        description: r.description,
        url: r.url,
        properties: (r as RawCharacter).properties,
      }))
    : (data as ApiResponseGeneral).results.map((r) => ({
        uid: r.uid,
        name: r.name,
        description: r.description,
        url: r.url,
        properties: undefined,
      }));

  const characters: Character[] = await Promise.all(
    rawCharacters.map(async (raw) => {
      const detailRes = await fetch(`${BASE}/${raw.uid}`);
      if (!detailRes.ok) {
        return {
          uid: raw.uid,
          name: raw.name ?? 'unknown',
          description: raw.description ?? 'no description',
          birth_year: 'unknown',
          gender: 'unknown',
          homeworld: 'unknown',
        };
      }

      const detail: {
        result: {
          properties: RawCharacter['properties'];
          description?: string;
        };
      } = await detailRes.json();

      const props = detail.result.properties;

      let homeworldName = 'unknown';
      if (props?.homeworld) {
        const hwRes = await fetch(props.homeworld);
        if (hwRes.ok) {
          const hwData: {
            result?: { properties?: { name?: string; title?: string } };
          } = await hwRes.json();
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
          detail.result.description ?? raw.description ?? 'no description',
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

  const totalPages: number =
    (data as { total_pages?: number }).total_pages ?? 1;

  return { characters, totalPages };
}
