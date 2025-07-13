import { Component } from 'react';
import type { Character } from '../types/types';
import { CardCharacter } from './CardCharacter';

interface Props {
  results: Character[];
}

export class ResultsList extends Component<Props> {
  render() {
    const { results } = this.props;

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
}
