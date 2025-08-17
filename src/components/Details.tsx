'use client';

import type { Character } from '../types/types';
import { Spinner } from './Spinner';
import { Button } from './Button';
import { useGetFilmsQuery } from '../utils/filmsApi';

interface DetailsProps {
  character: Character;
  onCloseAction: () => void;
}

export function Details({ character, onCloseAction }: DetailsProps) {
  const charUrl = `https://www.swapi.tech/api/people/${character.uid}`;

  const { titles, isLoading, error } = useGetFilmsQuery(undefined, {
    selectFromResult: ({ data, isLoading, error }) => ({
      titles:
        data
          ?.filter((film) => film.characters?.includes(charUrl))
          .map((f) => f.title) ?? [],
      isLoading,
      error,
    }),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p style={{ color: 'red' }}>Error download</p>;

  return (
    <div>
      <h2 style={{ color: '#ffff95' }}>{character.name}</h2>
      <ul className="description">
        <li>
          <strong>Birth year:</strong> {character.birth_year}
        </li>
        <li>
          <strong>Hair color:</strong> {character.hair_color}
        </li>
        <li>
          <strong>Height</strong> {character.height}
        </li>
        <li>
          <strong>Eye color:</strong> {character.eye_color}
        </li>
        <li>
          <strong>Mass:</strong> {character.mass}
        </li>
        <li>
          <strong>Homeworld:</strong> {character.homeworld}
        </li>
        <li>
          <strong>Films:</strong>
          <ul>
            {titles.map((title, i) => (
              <li key={i}>{title}</li>
            ))}
          </ul>
        </li>
      </ul>
      <Button onClick={onCloseAction}>Close</Button>
    </div>
  );
}
