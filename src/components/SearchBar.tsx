import { useState } from 'react';
import { Button } from './Button';

interface SearchProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export function SearchBar({ onSearch, initialValue }: SearchProps) {
  const [input, setInput] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    const trimmed = input.trim();
    onSearch(trimmed);
  };

  return (
    <div style={{ padding: '2rem', borderBottom: '1px solid #ccc' }}>
      <input
        className="search-field"
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Star Wars characters..."
      />
      <Button onClick={handleClick}>Search</Button>
    </div>
  );
}
