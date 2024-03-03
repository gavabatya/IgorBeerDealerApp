import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage';
import React from 'react';
import { WelcomeLayout } from '../../components/welcomeLayout/WelcomeLayout';

export const WelcomeNavigationRouter = () => {
  return (
    <>
      <WelcomeLayout>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </WelcomeLayout>
    </>
  );
};
