import React, { FC, Fragment, PropsWithChildren } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { LoginPage } from '../pages/LoginPage.tsx';
import { RegistrationPage } from '../pages/RegistrationPage.tsx';
import { WelcomeLayout } from '../components/welcomeLayout/WelcomeLayout.tsx';
import { ShopPage } from '../pages/ShopPage.tsx';
import { RecipePage } from '../pages/RecipePage.tsx';
import { MainLayout } from '../components/mainLayout/MainLayout.tsx';

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
        <Route path={'*'} element={<ShopPage />} />
      </Router>
    </MainLayout>
  );
};
