import type { Character, RawCharacter } from '../types/types';
import { fetchHomeworld } from './fetchHomeworld';

const MAX_CHARACTERS = 10;
const BASE_URL = `https://www.swapi.tech/api/people/`;

export const fetchCharacters = async (search: string): Promise<Character[]> => {
  const baseUrl = search
    ? `${BASE_URL}?name=${encodeURIComponent(search)}`
    : BASE_URL;

  try {
    const res = await fetch(baseUrl);
    const data = await res.json();

    const rawResults: RawCharacter[] = Array.isArray(data.results)
      ? data.results
      : Array.isArray(data.result)
        ? data.result
        : [];

    const limitedResults = rawResults.slice(0, MAX_CHARACTERS);

    const characters: Character[] = await Promise.all(
      limitedResults.map(async (char) => {
        const props = char.properties;

        if (props) {
          return {
            uid: char.uid,
            name: props.name,
            description: char.description || 'no description',
            birth_year: props.birth_year || 'unknown',
            gender: props.gender || 'unknown',
            hair_color: props.hair_color || 'unknown',
            homeworld: await fetchHomeworld(props.homeworld),
          };
        }

        try {
          const charRes = await fetch(char.url);
          const charData = await charRes.json();
          const property = charData.result.properties;

          return {
            uid: char.uid,
            name: property.name,
            description: charData.result.description || 'no description',
            birth_year: property.birth_year || 'unknown',
            gender: property.gender || 'unknown',
            hair_color: property.hair_color || 'unknown',
            homeworld: await fetchHomeworld(property.homeworld),
          };
        } catch (error) {
          console.error('Error getting description:', error);
          return {
            uid: char.uid,
            name: char.name,
            description: 'no description',
            birth_year: 'unknown',
            gender: 'unknown',
            hair_color: 'unknown',
            homeworld: 'unknown',
          };
        }
      })
    );

    return characters;
  } catch (err) {
    console.error('Error loading data:', err);
    return [];
  }
};
