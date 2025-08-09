import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { CardCharacter } from './CardCharacter';
import { renderWithRedux } from '../test-utils/renderWithRedux';

const completeCharacter = {
  uid: '101',
  name: 'Obi-Wan Kenobi',
  description: 'Jedi Master',
  birth_year: '57BBY',
  gender: 'male',
  homeworld: 'Stewjon',
};

const partialCharacter = {
  uid: '102',
  name: 'Droid',
  description: '',
  birth_year: '',
  gender: '',
  homeworld: '',
};

describe('CardCharacter Component', () => {
  it('displays full character info correctly', () => {
    renderWithRedux(
      <CardCharacter character={completeCharacter} onClick={() => {}} />
    );

    expect(screen.getByText('Obi-Wan Kenobi')).toBeInTheDocument();

    const descriptionList = screen.getByRole('list');
    const listItems = within(descriptionList).getAllByRole('listitem');

    expect(
      listItems.some((li) => li.textContent === 'Description: Jedi Master')
    ).toBe(true);
    expect(listItems.some((li) => li.textContent === 'Birth year: 57BBY')).toBe(
      true
    );
    expect(listItems.some((li) => li.textContent === 'Gender: male')).toBe(
      true
    );
    expect(
      listItems.some((li) => li.textContent === 'Homeworld: Stewjon')
    ).toBe(true);
  });

  it('handles missing fields with fallback values', () => {
    renderWithRedux(
      <CardCharacter character={partialCharacter} onClick={() => {}} />
    );

    expect(screen.getByText('Droid')).toBeInTheDocument();

    const descriptionList = screen.getByRole('list');
    const listItems = within(descriptionList).getAllByRole('listitem');

    expect(
      listItems.some((li) => li.textContent === 'Description: no description')
    ).toBe(true);
    expect(
      listItems.some((li) => li.textContent === 'Birth year: unknown')
    ).toBe(true);
    expect(listItems.some((li) => li.textContent === 'Gender: unknown')).toBe(
      true
    );
    expect(
      listItems.some((li) => li.textContent === 'Homeworld: unknown')
    ).toBe(true);
  });
});
