// src/slices/formSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FormData = {
  name: string;
  email: string;
};

type FormState = {
  uncontrolledData: FormData | null;
  rhfData: FormData | null;
};

const initialState: FormState = {
  uncontrolledData: null,
  rhfData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledData(state, action: PayloadAction<FormData>) {
      state.uncontrolledData = action.payload;
    },
    setRHFData(state, action: PayloadAction<FormData>) {
      state.rhfData = action.payload;
    },
  },
});

export const { setUncontrolledData, setRHFData } = formSlice.actions;
export default formSlice.reducer;
