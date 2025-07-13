import React from 'react';
import type { Character } from '../types/types';

interface Props {
  character: Character;
}

export const CardCharacter: React.FC<Props> = ({ character }) => {
  const { name, description, birth_year, gender, hair_color, homeworld } =
    character;

  return (
    <li
      style={{
        marginBottom: '1rem',
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '6px',
      }}
    >
      <p>
        <strong style={{ fontSize: '1.1rem' }}>{name}</strong>
      </p>
      <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
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
};
