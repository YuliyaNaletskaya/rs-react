import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormOutput } from '../../validation/formSchema';

// type FormData = {
//   name: string;
//   age: number;
//   email: string;
//   password: string;
//   gender: string;
//   termsAccepted: boolean;
//   pictureBase64: string;
//   country: string;
// };

type FormState = {
  uncontrolledData: FormOutput | null;
  rhfData: FormOutput | null;
  countries: string[];
};

const initialState: FormState = {
  uncontrolledData: null,
  rhfData: null,
  countries: ['Belarus', 'Germany', 'Japan', 'USA', 'Brazil'],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledData(state, action: PayloadAction<FormOutput>) {
      state.uncontrolledData = action.payload;
    },
    setRHFData(state, action: PayloadAction<FormOutput>) {
      state.rhfData = action.payload;
    },
  },
});

export const { setUncontrolledData, setRHFData } = formSlice.actions;
export default formSlice.reducer;
