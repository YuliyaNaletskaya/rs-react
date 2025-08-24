import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../lib/store';
import { RHForm } from '../RHForm';

describe('RHForm', () => {
  it('renders all required fields', () => {
    render(
      <Provider store={store}>
        <RHForm />
      </Provider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

    const pwdInputs = screen.getAllByLabelText(/password/i);
    expect(pwdInputs).toHaveLength(2);

    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Picture/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Accept Terms and Conditions/i)
    ).toBeInTheDocument();
  });

  it('shows validation errors on invalid input', async () => {
    render(
      <Provider store={store}>
        <RHForm />
      </Provider>
    );

    const submitBtn = screen.getByRole('button', { name: /submit/i });
    const form = submitBtn.closest('form')!;
    fireEvent.submit(form);

    const nameField = screen.getByLabelText(/name/i);
    const nameFieldContainer = nameField.closest('div')!;
    await waitFor(() => {
      expect(
        within(nameFieldContainer).getByText(
          /name is required|must start with uppercase/i
        )
      ).toBeInTheDocument();
    });
  });

  it('submits valid form', async () => {
    render(
      <Provider store={store}>
        <RHForm />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/Name/i), 'John');
    await userEvent.type(screen.getByLabelText(/Age/i), '30');
    await userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com');

    const pwdInputs = screen.getAllByLabelText(
      /password/i
    ) as HTMLInputElement[];
    const passwordInput = pwdInputs.find((el) => el.id === 'password')!;
    const confirmPasswordInput = pwdInputs.find(
      (el) => el.id === 'confirmPassword'
    )!;
    await userEvent.type(passwordInput, 'Abc123!@#');
    await userEvent.type(confirmPasswordInput, 'Abc123!@#');

    await userEvent.selectOptions(screen.getByLabelText(/Gender/i), 'male');
    await userEvent.type(screen.getByLabelText(/Country/i), 'Belarus');
    await userEvent.click(
      screen.getByLabelText(/Accept Terms and Conditions/i)
    );

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
  });
});
