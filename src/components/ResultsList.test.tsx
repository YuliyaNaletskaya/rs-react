import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsList } from './ResultsList';
import type { Character } from '../types/types';
import { vi } from 'vitest';

vi.mock('./CardCharacter', () => ({
  CardCharacter: ({ character }: { character: Character }) => (
    <li data-testid="card-character">{character.name}</li>
  ),
}));

const characters: Character[] = [
  {
    uid: '1',
    name: 'Luke Skywalker',
    description: 'Jedi Knight',
    birth_year: '19BBY',
    gender: 'male',
    hair_color: 'blond',
    homeworld: 'Tatooine',
  },
  {
    uid: '2',
    name: 'Leia Organa',
    description: 'Rebel Leader',
    birth_year: '19BBY',
    gender: 'female',
    hair_color: 'brown',
    homeworld: 'Alderaan',
  },
];

describe('ResultsList Component', () => {
  it('renders correct number of items when data is provided', () => {
    render(<ResultsList results={characters} />);
    const items = screen.getAllByTestId('card-character');
    expect(items).toHaveLength(2);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('displays "no results" message when data array is empty', () => {
    render(<ResultsList results={[]} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('handles missing or undefined character fields gracefully', () => {
    const broken: Character[] = [
      {
        uid: '99',
        name: 'Unknown',
        description: '',
        birth_year: '',
        gender: '',
        hair_color: '',
        homeworld: '',
      },
    ];
    render(<ResultsList results={broken} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
