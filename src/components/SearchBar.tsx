import { useState } from 'react';
import { Button } from './Button';
import { useDispatch } from 'react-redux';
import { charactersApi } from '../utils/api';

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

  const dispatch = useDispatch();

  const handleClickUpdate = () => {
    dispatch(
      charactersApi.util.invalidateTags([{ type: 'Characters', id: 'LIST' }])
    );
  };

  return (
    <div className="search-bar">
      <input
        className="search-field"
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Star Wars characters..."
      />
      <Button onClick={handleClick}>Search</Button>
      <Button onClick={handleClickUpdate}>Update</Button>
    </div>
  );
}
