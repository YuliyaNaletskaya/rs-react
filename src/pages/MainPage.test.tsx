import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MyErrorBoundary } from '../components/MyErrorBoundary';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { useGetCharactersQuery } from '../utils/api';

vi.mock('../utils/api', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('../utils/api');
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
    useInvalidateCharactersMutation: vi.fn(),
    charactersApi: actual.charactersApi,
  };
});

const mockCharacters = {
  characters: [
    {
      uid: '1',
      name: 'Luke',
      description: 'Jedi Knight',
      birth_year: '19BBY',
      gender: 'male',
      hair_color: 'blond',
      height: '172',
      eye_color: 'blue',
      mass: '77',
      homeworld: 'Tatooine',
    },
    {
      uid: '2',
      name: 'Leia',
      description: 'Rebel Leader',
      birth_year: '19BBY',
      gender: 'female',
      hair_color: 'brown',
      height: '150',
      eye_color: 'brown',
      mass: '49',
      homeworld: 'Alderaan',
    },
  ],
  totalPages: 1,
};

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('MainPage integration with RTK Query', () => {
  it('renders characters from RTK Query', async () => {
    (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockCharacters,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Luke')).toBeInTheDocument();
    expect(screen.getByText('Leia')).toBeInTheDocument();
  });

  it('shows loading spinner', () => {
    (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows fallback UI on error', () => {
    (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { status: 500, data: 'Server error' },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/error loading/i)).toBeInTheDocument();
  });

  // it('calls invalidateCharacters on button click', async () => {
  //   const invalidateMock = vi.fn();
  //   (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
  //     data: mockCharacters,
  //     isLoading: false,
  //     isFetching: false,
  //     error: null,
  //   });
  //   (
  //     useInvalidateCharactersMutation as ReturnType<typeof vi.fn>
  //   ).mockReturnValue([invalidateMock]);

  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <MainPage />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   fireEvent.click(screen.getByText(/Update/i));
  //   expect(invalidateMock).toHaveBeenCalled();
  // });

  it('shows Details when "details" param is set', async () => {
    (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockCharacters,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Jedi Knight/i)).toBeInTheDocument();
      expect(screen.getByText(/close/i)).toBeInTheDocument();
    });
  });

  it('removes details param on close', async () => {
    (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockCharacters,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    const closeButton = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(window.location.search).not.toContain('details=');
    });
  });

  it('triggers error boundary when App crashes internally', async () => {
    (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockCharacters,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyErrorBoundary>
            <MainPage />
          </MyErrorBoundary>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /broke/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('shows "No results" when characters array is empty', async () => {
    (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { characters: [], totalPages: 1 },
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument();
    });
  });
});
