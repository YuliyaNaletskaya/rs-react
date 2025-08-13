import { fetchCharactersDetails } from './fetchCharacterDetails';
import { vi, describe, it, expect } from 'vitest';

vi.mock('./fetchHomeworld', () => ({
  fetchHomeworld: vi.fn().mockResolvedValue('Tatooine'),
}));

describe('fetchCharactersDetails', () => {
  it('returns fields from local properties if they exist', async () => {
    const rawChar = {
      uid: '1',
      url: 'https://swapi.tech/api/people/1',
      description: 'Legendary Jedi',
      properties: {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        hair_color: 'blond',
        height: '172',
        eye_color: 'blue',
        mass: '77',
        homeworld: 'https://swapi.tech/api/planets/1',
      },
    };

    const result = await fetchCharactersDetails(rawChar);

    expect(result.name).toBe('Luke Skywalker');
    expect(result.height).toBe('172');
    expect(result.mass).toBe('77');
    expect(result.eye_color).toBe('blue');
    expect(result.description).toBe('Legendary Jedi');
    expect(result.homeworld).toBe('Tatooine');
  });

  it('does fetch if properties is missing', async () => {
    const mockCharData = {
      result: {
        description: 'Jedi Master',
        properties: {
          name: 'Obi-Wan Kenobi',
          birth_year: '57BBY',
          gender: 'male',
          hair_color: 'auburn',
          height: '182',
          eye_color: 'blue-gray',
          mass: '77',
          homeworld: 'https://swapi.tech/api/planets/10',
        },
      },
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockCharData),
    });

    const rawChar = {
      uid: '2',
      url: 'https://swapi.tech/api/people/2',
      properties: undefined,
      name: undefined,
    };

    const result = await fetchCharactersDetails(rawChar);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://swapi.tech/api/people/2'
    );
    expect(result.name).toBe('Obi-Wan Kenobi');
    expect(result.height).toBe('182');
    expect(result.eye_color).toBe('blue-gray');
    expect(result.description).toBe('Jedi Master');
    expect(result.homeworld).toBe('Tatooine');
  });

  it('returns a fallback object on error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const rawChar = {
      uid: '3',
      url: 'https://swapi.tech/api/people/3',
      properties: undefined,
      name: 'Fallback',
    };

    const result = await fetchCharactersDetails(rawChar);

    expect(result.name).toBe('Fallback');
    expect(result.height).toBe('unknown');
    expect(result.homeworld).toBe('unknown');
  });

  it('uses "unknown" as name when not provided in fallback', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await fetchCharactersDetails({
      uid: '4',
      url: 'https://swapi.tech/api/people/4',
      properties: undefined,
      name: undefined,
    });

    expect(result.name).toBe('unknown');
  });

  it('uses "unknown" for missing fields in properties', async () => {
    const rawChar = {
      uid: '5',
      url: 'https://swapi.tech/api/people/5',
      description: 'Mystery',
      properties: {
        name: 'Unknown',
        birth_year: '',
        gender: '',
        hair_color: '',
        height: '',
        eye_color: '',
        mass: '',
        homeworld: 'https://swapi.tech/api/planets/1',
      },
    };

    const result = await fetchCharactersDetails(rawChar);

    expect(result.birth_year).toBe('unknown');
    expect(result.height).toBe('unknown');
    expect(result.mass).toBe('unknown');
  });

  it('defaults to "no description" when description is missing in local', async () => {
    const rawChar = {
      uid: '6',
      url: 'https://swapi.tech/api/people/6',
      properties: {
        name: 'Silent One',
        birth_year: 'BBY',
        gender: 'none',
        hair_color: 'none',
        height: '0',
        eye_color: 'none',
        mass: '0',
        homeworld: 'https://swapi.tech/api/planets/1',
      },
    };

    const result = await fetchCharactersDetails(rawChar);

    expect(result.description).toBe('no description');
  });
});
