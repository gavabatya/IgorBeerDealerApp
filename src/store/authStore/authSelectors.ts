import { RootState } from '../index.ts';
import { createSelector } from '@reduxjs/toolkit';

export const getCartState = (state: RootState) => state.auth;

export const getIsAuth = createSelector(getCartState, (state) => state.isAuth);
