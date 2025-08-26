import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import App from './App';
import * as fetchUtils from '../utils/fetchHomeworld';
import { MyErrorBoundary } from '../components/MyErrorBoundary';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { store } from '../app/store';

vi.stubGlobal('fetch', vi.fn());
vi.spyOn(fetchUtils, 'fetchHomeworld').mockResolvedValue('Tatooine');

const mockResponse = {
  results: [
    {
      uid: '1',
      name: 'Luke',
      description: 'Jedi Knight',
      properties: {
        name: 'Luke',
        birth_year: '19BBY',
        gender: 'male',
        hair_color: 'blond',
        homeworld: 'https://swapi.tech/api/planets/1',
      },
    },
    {
      uid: '2',
      name: 'Leia',
      description: 'Rebel Leader',
      properties: {
        name: 'Leia',
        birth_year: '19BBY',
        gender: 'female',
        hair_color: 'brown',
        homeworld: 'https://swapi.tech/api/planets/2',
      },
    },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('App integration', () => {
  it('makes initial API call on mount', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/people/')
      );
    });
  });

  it('loads query from localStorage and sends it in request', async () => {
    localStorage.setItem('searchQuery', JSON.stringify('Leia'));

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Leia'));
    });
  });

  it('sends new query when user searches', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: async () => mockResponse,
    } as Response);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Vader' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Vader'));
    });
  });

  it('handles API rejection with fallback UI', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

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

  it('triggers error boundary when App crashes internally', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

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

  it('shows Details when "details" param is set', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: async () => mockResponse,
    } as Response);

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
    vi.mocked(fetch).mockResolvedValue({
      json: async () => mockResponse,
    } as Response);

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

  it('shows "No results" when results array is empty', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ results: [] }),
    } as Response);

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
