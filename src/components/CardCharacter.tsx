import type { Character } from '../types/types';

interface СharacterProps {
  character: Character;
}

export function CardCharacter({ character }: СharacterProps) {
  const { name, description, birth_year, gender, hair_color, homeworld } =
    character;

  return (
    <li className="item-container">
      <p className="item-name">
        <strong style={{ fontSize: '1.1rem' }}>{name}</strong>
      </p>
      <ul className="description">
        <li>
          <b>Description:</b> {description || 'no description'}
        </li>
        <li>
          <b>Birth year:</b> {birth_year || 'unknown'}
        </li>
        <li>
          <b>Gender:</b> {gender || 'unknown'}
        </li>
        <li>
          <b>Hair color:</b> {hair_color || 'unknown'}
        </li>
        <li>
          <b>Homeworld:</b> {homeworld || 'unknown'}
        </li>
      </ul>
    </li>
  );
}
