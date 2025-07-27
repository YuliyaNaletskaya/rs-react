import type { Character } from '../types/types';
import { CardCharacter } from './CardCharacter';

interface Props {
  results: Character[];
  onItemClick: (id: string) => void;
}

export function ResultsList({ results, onItemClick }: Props) {
  return (
    <div style={{ padding: '1rem' }}>
      {results.length === 0 ? (
        <p>No results</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((char) => (
            <CardCharacter
              key={char.uid}
              character={char}
              onClick={() => onItemClick(char.uid)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
