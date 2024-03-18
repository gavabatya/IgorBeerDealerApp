import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../store/authStore/authSlice.ts';
import { getIsAuth } from '../store/authStore/authSelectors.ts';
import { useLocalStorage } from './useLocalStorage.ts';

interface UserAuthState {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const useAuth = () => {
  const { localStorageSet, localStorageGet } = useLocalStorage();

  const [isAuthError, setIsAuthError] = useState(false);
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const activeUser = localStorageGet('activeUser');

  useEffect(() => {
    if (activeUser !== null) {
      dispatch(setIsAuth(true));
    }
  }, [activeUser, dispatch]);

  const handleShowError = () => {
    setIsAuthError(true);
  };

  const handleResetAuthError = () => {
    setIsAuthError(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem('activeUser');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
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
      navigate('/');
      return;
    }

    handleShowError();
  };

  const onRegistrationSubmit = (values: UserAuthState) => {
    const { email, password } = values;
    const registeredUsers = localStorageGet<UserAuthState[]>('registeredUsers');

    if (!registeredUsers) {
      localStorageSet('registeredUsers', [{ email, password }]);
    } else {
      const isUserAlreadyExist = registeredUsers.some((user) => user.email === email);

      if (isUserAlreadyExist) {
        handleShowError();
      } else {
        registeredUsers.push({ email, password });
        localStorageSet('registeredUsers', registeredUsers);
        localStorageSet('activeUser', { email, password });

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
