import type { Character, RawCharacter } from '../types/types';
import { fetchCharactersDetails } from './fetchCharacterDetails';

const MAX_CHARACTERS = 10;
const BASE_URL = `https://www.swapi.tech/api/people/`;

interface PaginatedResult {
  characters: Character[];
  totalPages: number;
}

export const fetchCharacters = async (
  search: string,
  page: number
): Promise<PaginatedResult> => {
  const baseUrl = search
    ? `${BASE_URL}?name=${encodeURIComponent(search)}&page=${page}&limit=${MAX_CHARACTERS}`
    : `${BASE_URL}?page=${page}&limit=${MAX_CHARACTERS}`;

  try {
    const res = await fetch(baseUrl);
    const data = await res.json();

    const rawResults: RawCharacter[] = Array.isArray(data.results)
      ? data.results
      : Array.isArray(data.result)
        ? data.result
        : [];

    const characters: Character[] = await Promise.all(
      rawResults.map(fetchCharactersDetails)
    );
    return { characters, totalPages: data.total_pages || 1 };
  } catch (err) {
    console.error('Error loading data:', err);
    return {
      characters: [],
      totalPages: 1,
    };
  }
};
