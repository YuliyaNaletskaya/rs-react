import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { CardCharacter } from './CardCharacter';

const completeCharacter = {
  uid: '101',
  name: 'Obi-Wan Kenobi',
  description: 'Jedi Master',
  birth_year: '57BBY',
  gender: 'male',
  hair_color: 'auburn',
  homeworld: 'Stewjon',
};

const partialCharacter = {
  uid: '102',
  name: 'Droid',
  description: '',
  birth_year: '',
  gender: '',
  hair_color: '',
  homeworld: '',
};

describe('CardCharacter Component', () => {
  it('displays full character info correctly', () => {
    render(<CardCharacter character={completeCharacter} />);

    // Проверяем имя
    expect(screen.getByText('Obi-Wan Kenobi')).toBeInTheDocument();

    // Получаем список описания
    const descriptionList = screen.getByRole('list');
    const listItems = within(descriptionList).getAllByRole('listitem');

    // Проверяем каждую строку по тексту
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
      listItems.some((li) => li.textContent === 'Hair color: auburn')
    ).toBe(true);
    expect(
      listItems.some((li) => li.textContent === 'Homeworld: Stewjon')
    ).toBe(true);
  });

  it('handles missing fields with fallback values', () => {
    render(<CardCharacter character={partialCharacter} />);

    expect(screen.getByText('Droid')).toBeInTheDocument();

    const descriptionList = screen.getByRole('list');
    const listItems = within(descriptionList).getAllByRole('listitem');

    // Проверка значений по умолчанию
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
      listItems.some((li) => li.textContent === 'Hair color: unknown')
    ).toBe(true);
    expect(
      listItems.some((li) => li.textContent === 'Homeworld: unknown')
    ).toBe(true);
  });
});
