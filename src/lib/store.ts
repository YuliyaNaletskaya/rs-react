import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import { charactersApi } from '../utils/api';
import { filmsApi } from '../utils/filmsApi';

export const makeStore = () =>
  configureStore({
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
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
