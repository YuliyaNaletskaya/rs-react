// src/components/__tests__/UncontrolledForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../lib/store';
import { UncontrolledForm } from '../UncontrolledForm';

describe('UncontrolledForm', () => {
  it('renders all required fields', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm />
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

  it('shows error when submitting empty form', async () => {
    render(
      <Provider store={store}>
        <UncontrolledForm />
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(
      await screen.findByText(/name is required|must start with uppercase/i)
    ).toBeInTheDocument();
  });

  it('submits valid form', async () => {
    render(
      <Provider store={store}>
        <UncontrolledForm />
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

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
  });
});
