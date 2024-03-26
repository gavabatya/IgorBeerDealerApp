import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './index.ts';

// @ts-ignore
export const reduxLoggerCustomMiddleWare: Middleware<unknown, RootState> =
  (storeApi) => (next) => (action) => {
    console.log('Redux triggered:', action);
    return next(action);
  };
