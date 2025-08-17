import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../../types/types';

interface CharactersState {
  selectedId: string | null;
  selectedCharacter: Character | null;
}

const initialState: CharactersState = {
  selectedId: null,
  selectedCharacter: null,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    selectCharacter: (
      state,
      action: PayloadAction<{ id: string; character: Character }>
    ) => {
      state.selectedId = action.payload.id;
      state.selectedCharacter = action.payload.character;
    },
    clearSelection: (state) => {
      state.selectedId = null;
      state.selectedCharacter = null;
    },
  },
});

export const { selectCharacter, clearSelection } = charactersSlice.actions;
export default charactersSlice.reducer;
