import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchHomeworld } from './fetchHomeworld';

vi.stubGlobal('fetch', vi.fn());

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchHomeworld', () => {
  it('returns homeworld name when API responds correctly', async () => {
    const mockPlanetResponse = {
      result: {
        properties: { name: 'Tatooine' },
      },
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockPlanetResponse,
    } as Response);

    const name = await fetchHomeworld('https://swapi.tech/api/planets/1');
    expect(name).toBe('Tatooine');
    expect(fetch).toHaveBeenCalledWith('https://swapi.tech/api/planets/1');
  });

  it('returns "unknown" when response lacks name', async () => {
    const mockPlanetResponse = {
      result: {
        properties: {},
      },
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockPlanetResponse,
    } as Response);

    const name = await fetchHomeworld('https://swapi.tech/api/planets/99');
    expect(name).toBe('unknown');
  });

  it('returns "unknown" if fetch throws an error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));
    const name = await fetchHomeworld('https://swapi.tech/api/planets/404');
    expect(name).toBe('unknown');
  });
});
