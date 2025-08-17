import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import { charactersApi } from '../utils/api';
import { filmsApi } from '../utils/filmsApi';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    selectedItems: selectedItemsReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      charactersApi.middleware,
      filmsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
