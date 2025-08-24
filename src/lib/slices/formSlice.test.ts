// src/lib/slices/formSlice.test.ts
import reducer, { setUncontrolledData, setRHFData } from './formSlice';
import type { FormOutput } from '../../validation/formSchema';
import type { RootState } from '../store';

describe('formSlice', () => {
  const initialState = {
    uncontrolledData: null,
    rhfData: null,
    countries: ['Belarus', 'Germany', 'Japan', 'USA', 'Brazil'],
  };

  const sampleData: FormOutput = {
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

  it('should return initialState by default', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('setUncontrolledData should write data', () => {
    const nextState = reducer(initialState, setUncontrolledData(sampleData));
    expect(nextState.uncontrolledData).toEqual(sampleData);
  });

  it('setRHFData should write data', () => {
    const nextState = reducer(initialState, setRHFData(sampleData));
    expect(nextState.rhfData).toEqual(sampleData);
  });

  it('selectors must return correct data', () => {
    const state: RootState = {
      form: {
        ...initialState,
        uncontrolledData: sampleData,
        rhfData: sampleData,
      },
    } as RootState;

    expect(state.form.uncontrolledData?.name).toBe('John');
    expect(state.form.rhfData?.email).toBe('john@example.com');
    expect(state.form.countries).toContain('Belarus');
  });
});
