import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('renders the spinner icon and text', () => {
    render(<Spinner />);
    expect(screen.getByText(/louding/i)).toBeInTheDocument();
    expect(screen.getByText(/louding/i).tagName).toBe('SPAN');
  });

  it('is visible in the DOM and positioned absolutely', () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector('div');
    expect(spinnerDiv).not.toBeNull();
    expect(getComputedStyle(spinnerDiv!).position).toBe('absolute');
  });

  it('uses appropriate visual classes (icon class)', () => {
    const { container } = render(<Spinner />);
    const icon = container.querySelector('.spinner');
    expect(icon).not.toBeNull();
  });
});
