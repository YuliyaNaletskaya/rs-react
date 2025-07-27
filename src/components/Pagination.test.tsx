import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('disables "prev" when on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />
    );
    const prevBtn = screen.getByLabelText(/previous/i);
    expect(prevBtn).toBeDisabled();
  });

  it('disables "next" when on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />
    );
    const nextBtn = screen.getByLabelText(/next/i);
    expect(nextBtn).toBeDisabled();
  });

  it('calls onPageChange with previous page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    const prevBtn = screen.getByLabelText(/previous/i);
    fireEvent.click(prevBtn);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    const nextBtn = screen.getByLabelText(/next/i);
    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('displays correct pagination text', () => {
    render(
      <Pagination currentPage={2} totalPages={10} onPageChange={vi.fn()} />
    );
    expect(screen.getByText(/Page 2 from 10/)).toBeInTheDocument();
  });
});
