import { render, screen, waitFor } from '@testing-library/react';
import { it, expect } from 'vitest';
import { beforeEach, vi } from 'vitest';
import { Details } from './Details';
import type { Character } from '../types/types';

const mockCharacter: Character = {
  uid: '1',
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  homeworld: 'Tatooine',
  description: 'Jedi Knight',
  gender: 'male',
};

const mockFilmApiResponse = {
  result: [
    {
      properties: {
        title: 'A New Hope',
        characters: ['https://www.swapi.tech/api/people/1'],
      },
    },
    {
      properties: {
        title: 'The Empire Strikes Back',
        characters: ['https://www.swapi.tech/api/people/2'],
      },
    },
  ],
};

beforeEach(() => {
  vi.resetAllMocks();
  globalThis.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(mockFilmApiResponse),
  });
});

it('renders character details and correct films', async () => {
  render(<Details character={mockCharacter} onClose={vi.fn()} />);
  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(
      screen.queryByText('The Empire Strikes Back')
    ).not.toBeInTheDocument();
  });
});

it('calls onClose when button is clicked', async () => {
  const onClose = vi.fn();
  render(<Details character={mockCharacter} onClose={onClose} />);
  await waitFor(() =>
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  );

  screen.getByRole('button', { name: /close/i }).click();
  expect(onClose).toHaveBeenCalled();
});
