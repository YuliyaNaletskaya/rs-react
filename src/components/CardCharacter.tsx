import type { Character } from '../types/types';
import { Button } from './Button';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  toggleSelected,
  selectSelectedMap,
} from '../lib/slices/selectedItemsSlice';

interface СharacterProps {
  character: Character;
  onClick: () => void;
}

export function CardCharacter({ character, onClick }: СharacterProps) {
  const { uid, name, description, birth_year, gender, homeworld } = character;

  const dispatch = useAppDispatch();
  const selectedMap = useAppSelector(selectSelectedMap);
  const isSelected = !!selectedMap[uid];

  const handleCheckboxToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(
      toggleSelected({
        uid,
        name,
        description,
        birth_year,
        gender,
        homeworld,
        detailsUrl: `/?details=${uid}`,
      })
    );
  };

  return (
    <li className="item-container" style={{ display: 'flex', gap: '1rem' }}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxToggle}
        onClick={(e) => e.stopPropagation()}
      />
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
