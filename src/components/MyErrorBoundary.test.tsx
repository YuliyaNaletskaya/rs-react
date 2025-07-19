import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyErrorBoundary } from './MyErrorBoundary';

const BrokenComponent = () => {
  throw new Error('Test crash!');
};

const WorkingComponent = () => <div>Everything is fine</div>;

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('MyErrorBoundary Component', () => {
  it('renders child if no error occurs', () => {
    render(
      <MyErrorBoundary>
        <WorkingComponent />
      </MyErrorBoundary>
    );
    expect(screen.getByText(/everything is fine/i)).toBeInTheDocument();
  });

  it('catches and handles error from child', () => {
    render(
      <MyErrorBoundary>
        <BrokenComponent />
      </MyErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/please reload/i)).toBeInTheDocument();
  });

  it('logs error to console when caught', () => {
    render(
      <MyErrorBoundary>
        <BrokenComponent />
      </MyErrorBoundary>
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Error caught:'),
      expect.any(Error)
    );
  });
});
