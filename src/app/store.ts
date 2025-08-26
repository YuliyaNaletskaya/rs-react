import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    selectedItems: selectedItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
