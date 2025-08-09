import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../../types/types';

interface SelectedCharacter extends Character {
  detailsUrl: string;
}

interface SelectedState {
  selectedMap: Record<string, Character>;
}

const initialState: SelectedState = {
  selectedMap: {},
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<SelectedCharacter>) => {
      const { uid } = action.payload;
      if (state.selectedMap[uid]) {
        delete state.selectedMap[uid];
      } else {
        state.selectedMap[uid] = action.payload;
      }
    },
    clearAllSelected: (state) => {
      state.selectedMap = {};
    },
    removeSelected: (state, action: PayloadAction<string>) => {
      delete state.selectedMap[action.payload];
    },
  },
});

export const { toggleSelected, clearAllSelected, removeSelected } =
  selectedItemsSlice.actions;

export const selectSelectedMap = (state: { selectedItems: SelectedState }) =>
  state.selectedItems.selectedMap;

export default selectedItemsSlice.reducer;
