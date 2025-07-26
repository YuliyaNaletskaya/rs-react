import { ResultsList } from './components/ResultsList';
import { SearchBar } from './components/SearchBar';
import { Spinner } from './components/Spinner';
import './App.css';
import { Header } from './components/Header';
// import { fetchCharacters } from './utils/api';
import { Button } from './components/Button';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { usePaginatedCharacters } from './hooks/usePaginatedCharacters';

const BrokenComponent = () => {
  throw new Error('Component is broke!');
};

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const savedQuery = localStorage.getItem('searchQuery') || '';

  const [query, setQuery] = useState<string>(savedQuery);
  const [triggerError, setTriggerError] = useState<boolean>(false);

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState<number>(pageFromUrl);

  const { results, totalPages, loading, error } = usePaginatedCharacters(
    query,
    page
  );

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
    setSearchParams({ page: '1' });
    localStorage.setItem('searchQuery', q);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div>
      <Header />

      <div style={{ position: 'relative' }}>
        <SearchBar onSearch={handleSearch} initialValue={query} />

        {loading && <Spinner />}

        <div
          style={{
            filter: loading ? 'blur(3px)' : 'none',
            pointerEvents: loading ? 'none' : 'auto',
            transition: 'filter 0.3s ease',
          }}
        >
          <Button onClick={() => setTriggerError(true)}>Broke (Test)</Button>

          {triggerError && <BrokenComponent />}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ResultsList results={results} />
          {!loading && results.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
