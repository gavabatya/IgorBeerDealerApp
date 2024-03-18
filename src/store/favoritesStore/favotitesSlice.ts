import { createSlice } from '@reduxjs/toolkit';

interface FavoritesSliceState {
  favoritesProducts: number[] | null;
}

const initialState: FavoritesSliceState = {
  favoritesProducts: null,
};
const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (state.favoritesProducts) {
        const productIndex = state.favoritesProducts.indexOf(action.payload);
        const favoritesProductsClone = [...state.favoritesProducts];
        if (productIndex !== -1) {
          favoritesProductsClone.splice(productIndex, 1);
          state.favoritesProducts = favoritesProductsClone;
        } else {
          state.favoritesProducts = [...state.favoritesProducts, action.payload];
        }
      } else {
        state.favoritesProducts = [action.payload];
      }

      localStorage.setItem('favorites', JSON.stringify(state.favoritesProducts));
    },

    setFavoritesProducts: (state, action) => {
      state.favoritesProducts = action.payload;
    },
  },
});
export const { addToFavorites, setFavoritesProducts } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
