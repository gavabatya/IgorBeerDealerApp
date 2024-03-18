import React, { FC, Fragment, PropsWithChildren, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { LoginPage } from '../pages/LoginPage.tsx';
import { RegistrationPage } from '../pages/RegistrationPage.tsx';
import { WelcomeLayout } from '../components/welcomeLayout/WelcomeLayout.tsx';
import { ShopPage } from '../pages/ShopPage.tsx';
import { RecipePage } from '../pages/RecipePage.tsx';
import { MainLayout } from '../components/mainLayout/MainLayout.tsx';
import { FavoritesPage } from '../pages/FavoritesPage.tsx';
import { CartPage } from '../pages/CartPage.tsx';
import {
  setFavoritesProducts,
  setFavoritesUserEmail,
} from '../store/favoritesStore/favotitesSlice.ts';
import { setCartUserEmail, setProductsInCart } from '../store/cartStore/cartSlice.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../store/authStore/authSlice.ts';
import { SearchPage } from '../pages/SearchPage.tsx';
import {
  setSearchHistory,
  setSearchHistoryUserEmail,
} from '../store/searchHistoryStore/searchHistorySlice.ts';
import { SearchHistoryPage } from '../pages/SearchHistoryPage.tsx';

const Router = ({ children }: PropsWithChildren) => (
  /* @ts-ignore */
  <Routes primary={false} component={Fragment}>
    {children}
  </Routes>
);

export const Navigation: FC = () => (
  <BrowserRouter>
    <NavigationRouting />
  </BrowserRouter>
);

export const NavigationRouting: FC = () => {
  const { isAuth } = useAuth();
  const { localStorageGet } = useLocalStorage();
  const favoritesProductsFromStorage = localStorageGet('favorites');
  const productsInCartFromStorage = localStorageGet('cart');
  const searchHistoryFromStorage = localStorageGet('search');
  const activeUser: { email: string } | null = localStorageGet('activeUser');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFavoritesProducts(favoritesProductsFromStorage));
    dispatch(setProductsInCart(productsInCartFromStorage));
    dispatch(setSearchHistory(searchHistoryFromStorage));
    dispatch(setIsAuth(activeUser !== null));
    dispatch(setCartUserEmail(activeUser?.email ?? null));
    dispatch(setFavoritesUserEmail(activeUser?.email ?? null));
    dispatch(setSearchHistoryUserEmail(activeUser?.email ?? null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuth) {
    return (
      <WelcomeLayout>
        <Router>
          <Route path={'/'} element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path={'*'} element={<LoginPage />} />
        </Router>
      </WelcomeLayout>
    );
  }

  return (
    <MainLayout>
      <Router>
        <Route path={'/'} element={<ShopPage />} />
        <Route path={'recipe/:recipeId'} element={<RecipePage />} />
        <Route path={'search/:searchQuery'} element={<SearchPage />} />
        <Route path={'/favorites'} element={<FavoritesPage />} />
        <Route path={'/cart'} element={<CartPage />} />
        <Route path={'/searchHistory'} element={<SearchHistoryPage />} />
        <Route path={'*'} element={<ShopPage />} />
      </Router>
    </MainLayout>
  );
};
