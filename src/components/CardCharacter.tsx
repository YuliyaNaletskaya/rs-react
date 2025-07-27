import type { Character } from '../types/types';
import { Button } from './Button';

interface СharacterProps {
  character: Character;
  onClick: () => void;
}

export function CardCharacter({ character, onClick }: СharacterProps) {
  const { name, description, birth_year, gender, homeworld } = character;

  return (
    <li className="item-container">
      <div className="item-name">
        <strong style={{ fontSize: '1.1rem' }}>{name}</strong>
        <Button onClick={onClick}>Details</Button>
      </div>
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
          <b>Homeworld:</b> {homeworld || 'unknown'}
        </li>
      </ul>
    </li>
  );
}
