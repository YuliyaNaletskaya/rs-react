import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as fetchUtils from './utils/fetchHomeworld';
import { MyErrorBoundary } from './components/MyErrorBoundary';

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
  vi.spyOn(console, 'error').mockImplementation(() => {}); // подавляем консольные ошибки
});

describe('App integration', () => {
  it('makes initial API call on mount', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    render(<App />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/people/')
      );
    });
  });

  it('loads query from localStorage and sends it in request', async () => {
    localStorage.setItem('searchQuery', 'Leia');

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockResponse,
    } as Response);

    render(<App />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Leia'));
    });
  });

  it('sends new query when user searches', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: async () => mockResponse,
    } as Response);

    render(<App />);
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

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument();
    });
  });

  it('triggers error boundary when App crashes internally', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {}); // подавляем консоль

    render(
      <MyErrorBoundary>
        <App />
      </MyErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /broke/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
