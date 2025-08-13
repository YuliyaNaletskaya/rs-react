import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import { beforeEach, vi } from 'vitest';
import { Details } from './Details';
import type { Character } from '../types/types';
import * as filmsApi from '../utils/filmsApi';

type FilmsApiModule = typeof filmsApi;

vi.mock('../utils/filmsApi', async (importOriginal) => {
  const actual = (await importOriginal()) as FilmsApiModule;
  return {
    ...actual,
    useGetFilmsQuery: vi.fn(),
  };
});

const mockCharacter: Character = {
  uid: '1',
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  homeworld: 'Tatooine',
  description: 'Jedi Knight',
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  eye_color: 'blue',
  mass: '77',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Details Component', () => {
  it('renders character details and correct films', async () => {
    (filmsApi.useGetFilmsQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      titles: ['A New Hope'],
      isLoading: false,
      error: null,
    });

    render(<Details character={mockCharacter} onClose={vi.fn()} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText(/birth year/i)).toBeInTheDocument();
    expect(screen.getByText(/homeworld/i)).toBeInTheDocument();
  });

  it('shows spinner while loading', () => {
    (filmsApi.useGetFilmsQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      titles: [],
      isLoading: true,
      error: null,
    });

    render(<Details character={mockCharacter} onClose={vi.fn()} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message on failure', () => {
    (filmsApi.useGetFilmsQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      titles: [],
      isLoading: false,
      error: new Error('Failed'),
    });

    render(<Details character={mockCharacter} onClose={vi.fn()} />);
    expect(screen.getByText(/error download/i)).toBeInTheDocument();
  });

  it('calls onClose when button is clicked', async () => {
    const onClose = vi.fn();

    (filmsApi.useGetFilmsQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      titles: ['A New Hope'],
      isLoading: false,
      error: null,
    });

    render(<Details character={mockCharacter} onClose={onClose} />);
    const closeButton = await screen.findByRole('button', { name: /close/i });
    closeButton.click();

    expect(onClose).toHaveBeenCalled();
  });
});
