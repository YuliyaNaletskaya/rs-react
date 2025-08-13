import { ResultsList } from '../components/ResultsList';
import { SearchBar } from '../components/SearchBar';
import { Spinner } from '../components/Spinner';
import { Button } from '../components/Button';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import { usePaginatedCharacters } from '../hooks/usePaginatedCharacters';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Details } from '../components/Details';

const BrokenComponent = () => {
  throw new Error('Component is broke!');
};

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useLocalStorage<string>('searchQuery', '');
  const [triggerError, setTriggerError] = useState<boolean>(false);

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState<number>(pageFromUrl);
  const detailsId = searchParams.get('details');

  const { results, totalPages, loading, error } = usePaginatedCharacters(
    query,
    page
  );

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(newPage));
      return next;
    });
  };

  const handleItemSelect = (id: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('details', id);
      return next;
    });
  };

  const handleDetailsClose = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('details');
      return next;
    });
  };

  const selectedCharacter = results.find((char) => char.uid === detailsId);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <SearchBar onSearch={handleSearch} initialValue={query} />
        <Button onClick={() => setTriggerError(true)}>Broke (Test)</Button>
        <Link to="/about" className="link">
          About Me
        </Link>
        {triggerError && <BrokenComponent />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <Spinner />}

        <div
          style={{
            filter: loading ? 'blur(3px)' : 'none',
            pointerEvents: loading ? 'none' : 'auto',
            transition: 'filter 0.3s ease',
          }}
        >
          <div className="search-results">
            <div className="left-column">
              <ResultsList results={results} onItemClick={handleItemSelect} />
              {!loading && results.length > 0 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>

            {detailsId && selectedCharacter && (
              <div className="details">
                <Details
                  character={selectedCharacter}
                  onClose={handleDetailsClose}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
