import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../lib/store';
import { Home } from '../../pages/Home';

describe('Modal component in Home', () => {
  it('opens and closes with buttons', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    expect(screen.getByText(/name:/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /rhf form/i }));
    expect(screen.getByText(/name:/i)).toBeInTheDocument();

    const overlay = document.querySelector('.fixed.inset-0')!;
    fireEvent.click(overlay);
    expect(screen.queryByText(/name:/i)).not.toBeInTheDocument();
  });

  it('focus control on open', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    const modalContent = document.querySelector('.bg-white') as HTMLElement;
    expect(document.activeElement).toBe(modalContent);
  });

  it('closes with Escape key', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );
    expect(screen.getByText(/name:/i)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByText(/name:/i)).not.toBeInTheDocument();
  });

  it('closes when clicked from outside', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );
    expect(screen.getByText(/name:/i)).toBeInTheDocument();

    const overlay = document.querySelector('.fixed.inset-0')!;
    fireEvent.click(overlay);
    expect(screen.queryByText(/name:/i)).not.toBeInTheDocument();
  });

  it('rendered via portal in document.body', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );
    const modalElement = document.querySelector('.fixed.inset-0');
    expect(modalElement?.parentElement).toBe(document.body);
  });
});
