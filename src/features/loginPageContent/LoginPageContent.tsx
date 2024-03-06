import SportsBarIcon from '@mui/icons-material/SportsBar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { loginValidationSchema } from './formValidation/loginValidationSchema';
import './loginPageContent.css';
import { CustomButton } from '../../components/button/CustomButton';
import { Input } from '../../components/input/Input';
import { useAuth } from '../../hooks/useAuth.tsx';

export const LoginPageContent = () => {
  const navigate = useNavigate();

  const { handleSubmit, formState, control } = useForm({
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isValid } = formState;

  const handleGoToRegistration = () => {
    navigate('/registration');
  };

  const { handleResetAuthError, isAuthError, onLoginSubmit } = useAuth();
  return (
    <form className="loginContainer" onSubmit={handleSubmit(onLoginSubmit)}>
      <div className="loginActions">
        <div className="loginInputsBox">
          <Input
            controller={{
              control: control,
              name: 'email',
            }}
            id="email"
            label="Email"
            variant="outlined"
          />
          <Input
            controller={{
              control: control,
              name: 'password',
            }}
            id="filled-basic"
            label="password"
            variant="outlined"
            inputType="password"
          />
        </div>
        <div className="loginButton">
          <CustomButton
            title={'TAKE SOME BEER'}
            icon={<SportsBarIcon fontSize="small" />}
            type="submit"
            disabled={!isValid}
          />
        </div>
      </div>
      <div className="signUpInfoText">
        {"Don't have an account yet?"}{' '}
        <span className="signUpInfoButton" onClick={handleGoToRegistration}>
          Sign Up!
        </span>
      </div>
      <Snackbar open={isAuthError} autoHideDuration={6000} onClose={handleResetAuthError}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          Invalid login or password
        </Alert>
      </Snackbar>
    </form>
  );
};
