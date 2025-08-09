import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';

export function renderWithRedux(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}
