import { useEffect, useState } from 'react';
import { fetchCharacters } from '../utils/api';
import type { Character } from '../types/types';

export function usePaginatedCharacters(search: string, page: number) {
  const [cachedPages, setCachedPages] = useState<Record<string, Character[]>>(
    {}
  );
  const [results, setResults] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cacheKey = `${search}_${page}`;

    const loadPage = async () => {
      setLoading(true);
      setError(null);

      try {
        if (cachedPages[cacheKey]) {
          setResults(cachedPages[cacheKey]);
        } else {
          const { characters, totalPages } = await fetchCharacters(
            search,
            page
          );
          setResults(characters);
          setCachedPages((prev) => ({ ...prev, [page]: characters }));
          setTotalPages(totalPages);
        }
      } catch (e) {
        console.error(e);
        setError('Error loading');
      } finally {
        setLoading(false);
      }
    };

    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return { results, totalPages, loading, error };
}
