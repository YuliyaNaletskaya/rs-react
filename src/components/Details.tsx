import { useEffect, useState } from 'react';
import type { Character, FilmApiResponse } from '../types/types';
import { Spinner } from './Spinner';
import { Button } from './Button';

export function Details({
  character,
  onClose,
}: {
  character: Character;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState<string[]>([]);

  useEffect(() => {
    console.log('Received character:', character);
  }, [character]);

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      try {
        const result = await fetch(`https://www.swapi.tech/api/films`);
        const data: FilmApiResponse = await result.json();

        const charUrl = `https://www.swapi.tech/api/people/${character.uid}`;
        const filmTitles = data.result
          .map((f) => f.properties)
          .filter((film) => film.characters?.includes(charUrl))
          .map((film) => film.title);

        setFilms(filmTitles);
      } catch (err) {
        console.error('Error fetching films:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [character.uid]);

  if (loading) return <Spinner />;

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
            {films.map((title, i) => (
              <li key={i}>{title}</li>
            ))}
          </ul>
        </li>
      </ul>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}
