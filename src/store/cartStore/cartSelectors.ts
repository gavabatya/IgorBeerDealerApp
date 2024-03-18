import { RootState } from '../index.ts';
import { createSelector } from '@reduxjs/toolkit';
export const getCartState = (state: RootState) => state.cart;

export const getProductInCart = createSelector(getCartState, (state) => state.productsInCart);
export const getCartCount = createSelector(getCartState, (state) => state.productsInCart?.length);
