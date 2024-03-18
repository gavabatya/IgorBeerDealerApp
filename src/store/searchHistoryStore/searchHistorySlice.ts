import { createSlice } from '@reduxjs/toolkit';

interface SearchHistoryState {
  searchHistory: Record<string, string[]> | null;
  activeUserEmail: string | null;
}

const initialState: SearchHistoryState = {
  searchHistory: null,
  activeUserEmail: null,
};
const searchHistorySlice = createSlice({
  name: 'searchHistorySlice',
  initialState,
  reducers: {
    addToSearchHistory: (state, action) => {
      if (!state.activeUserEmail) return;

      if (state.searchHistory && state.searchHistory[state.activeUserEmail]) {
        state.searchHistory[state.activeUserEmail] = [
          ...state.searchHistory[state.activeUserEmail],
          action.payload,
        ];
      } else {
        state.searchHistory = { ...state.searchHistory, [state.activeUserEmail]: [action.payload] };
      }

      localStorage.setItem('search', JSON.stringify(state.searchHistory));
    },

    setSearchHistory: (state, action) => {
      state.searchHistory = action.payload;
    },

    setSearchHistoryUserEmail: (state, action) => {
      state.activeUserEmail = action.payload;
    },
  },
});
export const { addToSearchHistory, setSearchHistoryUserEmail, setSearchHistory } =
  searchHistorySlice.actions;
export const searchHistoryReducer = searchHistorySlice.reducer;
