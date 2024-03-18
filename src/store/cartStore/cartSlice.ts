import { createSlice } from '@reduxjs/toolkit';

interface cartSliceState {
  productsInCart: Record<string, number[]> | null;
  activeUserEmail: string | null;
}

const initialState: cartSliceState = {
  productsInCart: null,
  activeUserEmail: null,
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!state.activeUserEmail) return;

      if (state.productsInCart && state.productsInCart[state.activeUserEmail]) {
        const productIndex = state.productsInCart[state.activeUserEmail].indexOf(action.payload);
        const favoritesProductsClone = [...state.productsInCart[state.activeUserEmail]];
        if (productIndex !== -1) {
          favoritesProductsClone.splice(productIndex, 1);
          state.productsInCart[state.activeUserEmail] = favoritesProductsClone;
        } else {
          state.productsInCart[state.activeUserEmail] = [
            ...state.productsInCart[state.activeUserEmail],
            action.payload,
          ];
        }
      } else {
        state.productsInCart = {
          ...state.productsInCart,
          [state.activeUserEmail]: [action.payload],
        };
      }

      localStorage.setItem('cart', JSON.stringify(state.productsInCart));
    },

    setProductsInCart: (state, action) => {
      state.productsInCart = action.payload;
    },

    setCartUserEmail: (state, action) => {
      state.activeUserEmail = action.payload;
    },
  },
});
export const { addToCart, setProductsInCart, setCartUserEmail } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
