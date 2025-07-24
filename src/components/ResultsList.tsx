import type { Character } from '../types/types';
import { CardCharacter } from './CardCharacter';

interface Props {
  results: Character[];
}

export function ResultsList({ results }: Props) {
  return (
    <div style={{ padding: '1rem' }}>
      {results.length === 0 ? (
        <p>No results</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((char) => (
            <CardCharacter key={char.uid} character={char} />
          ))}
        </ul>
      )}
    </div>
  );
}
