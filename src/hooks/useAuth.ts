import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../store/authStore/authSlice.ts';
import { useLocalStorage } from './useLocalStorage.ts';
import { setCartUserEmail } from '../store/cartStore/cartSlice.ts';
import { setFavoritesUserEmail } from '../store/favoritesStore/favotitesSlice.ts';
import { setSearchHistoryUserEmail } from '../store/searchHistoryStore/searchHistorySlice.ts';
import { useAuthContext } from '../context/AuthContext.tsx';

interface UserAuthState {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const useAuth = () => {
  const { localStorageSet, localStorageGet } = useLocalStorage();

  const [isAuthError, setIsAuthError] = useState(false);
  const { isAuth } = useAuthContext();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleShowError = () => {
    setIsAuthError(true);
  };

  const handleResetAuthError = () => {
    setIsAuthError(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem('activeUser');
    dispatch(setIsAuth(false));
    navigate('/login');
  };

  const onLoginSubmit = (values: UserAuthState) => {
    const { email, password } = values;
    const registeredUsers = localStorageGet<UserAuthState[]>('registeredUsers');

    if (!registeredUsers) {
      handleShowError();
      return;
    }

    const isUserRegistered = registeredUsers.some(
      (user) => user.email === email && user.password === password,
    );

    if (isUserRegistered) {
      localStorageSet('activeUser', { email, password });
      dispatch(setIsAuth(true));
      dispatch(setCartUserEmail(email));
      dispatch(setFavoritesUserEmail(email));
      dispatch(setSearchHistoryUserEmail(email));
      navigate('/');
      return;
    }

    handleShowError();
  };

  const onRegistrationSubmit = (values: UserAuthState) => {
    const { email, password } = values;
    const registeredUsers = localStorageGet<UserAuthState[]>('registeredUsers');
    console.log('Registered users', registeredUsers);
    if (!registeredUsers) {
      localStorageSet('registeredUsers', [{ email, password }]);
      localStorageSet('activeUser', { email, password });
      dispatch(setCartUserEmail(email));
      dispatch(setFavoritesUserEmail(email));
      dispatch(setSearchHistoryUserEmail(email));
      dispatch(setIsAuth(true));
      navigate('/');
    } else {
      const isUserAlreadyExist = registeredUsers.some((user) => user.email === email);

      if (isUserAlreadyExist) {
        console.log('1');
        handleShowError();
      } else {
        console.log('2');
        registeredUsers.push({ email, password });
        localStorageSet('registeredUsers', registeredUsers);
        localStorageSet('activeUser', { email, password });
        dispatch(setCartUserEmail(email));
        dispatch(setFavoritesUserEmail(email));
        dispatch(setSearchHistoryUserEmail(email));
        dispatch(setIsAuth(true));
        navigate('/');
      }
    }
  };

  return {
    onLoginSubmit,
    onRegistrationSubmit,
    handleResetAuthError,
    handleLogOut,
    isAuth,
    isAuthError,
  };
};
