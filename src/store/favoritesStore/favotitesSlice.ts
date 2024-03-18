import { createSlice } from '@reduxjs/toolkit';

interface FavoritesSliceState {
  favoritesProducts: Record<string, number[]> | null;
  activeUserEmail: string | null;
}

const initialState: FavoritesSliceState = {
  favoritesProducts: null,
  activeUserEmail: null,
};
const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.activeUserEmail) return;

      if (state.favoritesProducts && state.favoritesProducts[state.activeUserEmail]) {
        const productIndex = state.favoritesProducts[state.activeUserEmail].indexOf(action.payload);
        const favoritesProductsClone = [...state.favoritesProducts[state.activeUserEmail]];
        if (productIndex !== -1) {
          favoritesProductsClone.splice(productIndex, 1);
          state.favoritesProducts[state.activeUserEmail] = favoritesProductsClone;
        } else {
          state.favoritesProducts[state.activeUserEmail] = [
            ...state.favoritesProducts[state.activeUserEmail],
            action.payload,
          ];
        }
      } else {
        state.favoritesProducts = {
          ...state.favoritesProducts,
          [state.activeUserEmail]: [action.payload],
        };
      }

      localStorage.setItem('favorites', JSON.stringify(state.favoritesProducts));
    },

    setFavoritesProducts: (state, action) => {
      state.favoritesProducts = action.payload;
    },

    setFavoritesUserEmail: (state, action) => {
      state.activeUserEmail = action.payload;
    },
  },
});
export const { addToFavorites, setFavoritesProducts, setFavoritesUserEmail } =
  favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
