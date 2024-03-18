import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authStore/authSlice.ts';
import { recipesApi } from './recipeApi/recipesApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { favoritesReducer } from './favoritesStore/favotitesSlice.ts';
import { cartReducer } from './cartStore/cartSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipesApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
