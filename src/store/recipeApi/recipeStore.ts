import { configureStore } from '@reduxjs/toolkit';
import { recipesApi } from './recipesApi.ts';

export const store = configureStore({
  reducer: {
    recipesApi: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipesApi.middleware),
});
