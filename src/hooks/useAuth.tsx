import { useLocalStorage } from './useLocalStorage.ts';
import { useMemo, useState } from 'react';

interface UserAuthState {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const useAuth = () => {
  const { localStorageSet, localStorageGet } = useLocalStorage();

  const [isAuthError, setIsAuthError] = useState(false);

  const activeUser = localStorageGet('activeUser');

  const isAuth = useMemo(() => {
    return activeUser !== null;
  }, [activeUser]);

  const handleShowError = () => {
    setIsAuthError(true);
  };

  const handleResetAuthError = () => {
    setIsAuthError(false);
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

    isUserRegistered ? localStorageSet('activeUser', { email, password }) : handleShowError();
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
      }
    }
  };

  return { onLoginSubmit, onRegistrationSubmit, handleResetAuthError, isAuth, isAuthError };
};
