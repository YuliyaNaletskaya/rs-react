import { configureStore } from '@reduxjs/toolkit';
import formReducer, {
  setUncontrolledData,
  setRHFData,
} from './slices/formSlice';
import type { FormOutput } from '../validation/formSchema';

describe('Redux store integration', () => {
  const makeStore = () =>
    configureStore({
      reducer: {
        form: formReducer,
      },
    });

  const sample: FormOutput = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
    password: 'Abc123!@#',
    confirmPassword: 'Abc123!@#',
    gender: 'male',
    termsAccepted: true,
    pictureBase64: '',
    country: 'Belarus',
  };

  it('has the expected initial state', () => {
    const store = makeStore();
    const state = store.getState();
    expect(state.form.uncontrolledData).toBeNull();
    expect(state.form.rhfData).toBeNull();
    expect(state.form.countries).toEqual([
      'Belarus',
      'Germany',
      'Japan',
      'USA',
      'Brazil',
    ]);
  });

  it('updates uncontrolledData after dispatch setUncontrolledData', () => {
    const store = makeStore();
    store.dispatch(setUncontrolledData(sample));
    const state = store.getState();
    expect(state.form.uncontrolledData).toEqual(sample);
    expect(state.form.rhfData).toBeNull();
  });

  it('updates rhfData after dispatch setRHFData', () => {
    const store = makeStore();
    store.dispatch(setRHFData(sample));
    const state = store.getState();
    expect(state.form.rhfData).toEqual(sample);
    expect(state.form.uncontrolledData).toBeNull();
  });

  it('supports independent updates for both data branches', () => {
    const store = makeStore();
    store.dispatch(setUncontrolledData(sample));
    const sample2: FormOutput = {
      ...sample,
      name: 'Kate',
      email: 'kate@example.com',
    };
    store.dispatch(setRHFData(sample2));
    const state = store.getState();

    expect(state.form.uncontrolledData?.name).toBe('John');
    expect(state.form.uncontrolledData?.email).toBe('john@example.com');

    expect(state.form.rhfData?.name).toBe('Kate');
    expect(state.form.rhfData?.email).toBe('kate@example.com');
  });

  it('countries remain available and unchanged when forms are updated', () => {
    const store = makeStore();
    store.dispatch(setUncontrolledData(sample));
    store.dispatch(setRHFData(sample));
    const state = store.getState();

    expect(state.form.countries).toContain('Belarus');
    expect(state.form.countries.length).toBe(5);
  });
});
