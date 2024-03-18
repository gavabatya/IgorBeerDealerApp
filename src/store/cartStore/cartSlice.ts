import { createSlice } from '@reduxjs/toolkit';

interface cartSliceState {
  productsInCart: number[] | null;
}

const initialState: cartSliceState = {
  productsInCart: null,
};
const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.productsInCart) {
        const productIndex = state.productsInCart.indexOf(action.payload);
        const favoritesProductsClone = [...state.productsInCart];
        if (productIndex !== -1) {
          favoritesProductsClone.splice(productIndex, 1);
          state.productsInCart = favoritesProductsClone;
        } else {
          state.productsInCart = [...state.productsInCart, action.payload];
        }
      } else {
        state.productsInCart = [action.payload];
      }

      localStorage.setItem('cart', JSON.stringify(state.productsInCart));
    },

    setProductsInCart: (state, action) => {
      state.productsInCart = action.payload;
    },
  },
});
export const { addToCart, setProductsInCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
