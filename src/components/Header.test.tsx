import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('displays the correct title', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Star Wars Charactersq');
    expect(heading).toBeInTheDocument();
  });

  it('renders gracefully even with extra props', () => {
    // @ts-expect-error: intentionally passing unexpected props
    render(<Header unexpected="value" />);
    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
  });
});
