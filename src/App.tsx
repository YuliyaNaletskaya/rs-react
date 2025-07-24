import { ResultsList } from './components/ResultsList';
import { SearchBar } from './components/SearchBar';
import type { Character } from './types/types';
import { Spinner } from './components/Spinner';
import './App.css';
import { Header } from './components/Header';
import { fetchCharacters } from './utils/api';
import { Button } from './components/Button';
import { useEffect, useState } from 'react';

const BrokenComponent = () => {
  throw new Error('Component is broke!');
};

export function App() {
  const savedQuery = localStorage.getItem('searchQuery') || '';

  const [query, setQuery] = useState<string>(savedQuery);
  const [results, setResult] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerError, setTriggerError] = useState<boolean>(false);

  useEffect(() => {
    fetchData(query);
  }, []);

  const fetchData = async (search: string) => {
    setLoading(true);
    const characters = await fetchCharacters(search);
    setResult(characters);
    setLoading(false);
  };

  const handleSearch = (q: string) => {
    setQuery(q);
    fetchData(q);
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
          <ResultsList results={results} />
        </div>
      </div>
    </div>
  );
}

export default App;
