import React, { PropsWithChildren, FC } from 'react';
import { Logo } from '../logo/Logo';
import './welcomeLayout.css';

export const WelcomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      <Logo />
      {children}
    </div>
  );
};
