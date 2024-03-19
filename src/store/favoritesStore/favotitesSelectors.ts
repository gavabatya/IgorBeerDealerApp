import { RootState } from '../index.ts';
import { createSelector } from '@reduxjs/toolkit';
export const getFavoritesState = (state: RootState) => state.favorites;
export const getFavorites = createSelector(getFavoritesState, (state) =>
  state.favoritesProducts ? state.favoritesProducts[state.activeUserEmail ?? ''] : [],
);
export const getFavoritesCount = createSelector(getFavoritesState, (state) =>
  state.favoritesProducts ? state.favoritesProducts[state.activeUserEmail ?? '']?.length : 0,
);
