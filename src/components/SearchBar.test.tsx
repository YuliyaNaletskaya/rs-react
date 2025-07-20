import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

const mockOnSearch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('SearchBar Component', () => {
  it('renders input and search button', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
    expect(screen.getByPlaceholderText(/star wars/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('loads initial search value from props', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="Yoda" />);
    expect(screen.getByDisplayValue('Yoda')).toBeInTheDocument();
  });

  it('shows empty input when no initial value provided', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('updates input value on user typing', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Leia' } });
    expect(screen.getByDisplayValue('Leia')).toBeInTheDocument();
  });

  it('trims input, saves to localStorage, and triggers search on click', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  Luke  ' } });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    const saved = localStorage.getItem('searchQuery');
    expect(saved).toBe('Luke');
    expect(mockOnSearch).toHaveBeenCalledWith('Luke');
  });

  it('overwrites searchQuery in localStorage when re-searching', () => {
    localStorage.setItem('searchQuery', 'Anakin');
    render(<SearchBar onSearch={mockOnSearch} initialValue="Anakin" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Padmé' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('searchQuery')).toBe('Padmé');
    expect(mockOnSearch).toHaveBeenCalledWith('Padmé');
  });
});
