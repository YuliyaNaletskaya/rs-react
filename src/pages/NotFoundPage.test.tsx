import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import NotFound from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

it('renders 404 message', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText(/Page not Found/i)).toBeInTheDocument();
});

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

it('calls navigate with /404', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(mockNavigate).toHaveBeenCalledWith('/404', { replace: true });
});
