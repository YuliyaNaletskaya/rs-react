import { Component } from 'react';
import type { Character } from '../types/types';

interface Props {
  results: Character[];
}

export class ResultsList extends Component<Props> {
  render() {
    const { results } = this.props;
    console.log('ResultsList received:', results);
    return (
      <div style={{ padding: '1rem' }}>
        {results.length === 0 ? (
          <p>Нет результатов</p>
        ) : (
          <ul>
            {results.map((char) => (
              <li key={char.uid}>
                <strong>{char.name}</strong>{' '}
                <ul>
                  <li>
                    <b>Родная планета:</b> {char.homeworld}
                  </li>
                  <li>
                    <b>Вид:</b> {char.species.join(', ') || 'неизвестно'}
                  </li>
                  <li>
                    <b>Корабли:</b> {char.starships.join(', ') || 'нет'}
                  </li>
                  <li>
                    <b>Фильмы:</b> {char.films.join(', ') || 'неизвестно'}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
