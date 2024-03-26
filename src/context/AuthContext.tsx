import React, { FC, PropsWithChildren, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../store/authStore/authSelectors.ts';

export const AuthContext = React.createContext(null as unknown as AuthContextProps);

export type AuthContextProps = {
  isAuth: boolean;
};

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const isAuth = useSelector(getIsAuth);

  const value = useMemo(
    () => ({
      isAuth,
    }),
    [isAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }

  return context;
};
