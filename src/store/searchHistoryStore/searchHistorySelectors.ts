import { RootState } from '../index.ts';
import { createSelector } from '@reduxjs/toolkit';

export const getSearchHistoryState = (state: RootState) => state.searchHistory;

export const getSearchHistory = createSelector(getSearchHistoryState, (state) =>
  state.searchHistory ? state.searchHistory[state.activeUserEmail ?? ''] : [],
);

export const getSearchesCount = createSelector(getSearchHistoryState, (state) =>
  state.searchHistory ? state.searchHistory[state.activeUserEmail ?? '']?.length : 0,
);
