import type { Character, RawCharacter } from '../types/types';
import { fetchHomeworld } from './fetchHomeworld';

export const fetchCharactersDetails = async (
  char: RawCharacter
): Promise<Character> => {
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
      name: char.name ?? 'unknown',
      description: 'no description',
      birth_year: 'unknown',
      gender: 'unknown',
      hair_color: 'unknown',
      homeworld: 'unknown',
    };
  }
};
