import { ChangeEvent, useState } from 'react';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { registrationValidationSchema } from './formValidation/registrationValidationSchema.ts';
import './registrationPageContent.css';
import { FormControlLabel } from '@mui/material';
import { CustomButton } from '../../../components/button/CustomButton.tsx';
import { Input } from '../../../components/input/Input.tsx';
import { useAuth } from '../../../hooks/useAuth.ts';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const RegistrationPageContent = () => {
  const navigate = useNavigate();
  const [ageChecked, setAgeChecked] = useState(false);

  const { handleSubmit, formState, control } = useForm({
    mode: 'all',
    resolver: yupResolver(registrationValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { isValid } = formState;

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const confirmAge = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setAgeChecked(checked);
  };
  const { handleResetAuthError, isAuthError, onRegistrationSubmit } = useAuth();
  return (
    <form className="registrationContainer" onSubmit={handleSubmit(onRegistrationSubmit)}>
      <div className="registrationActions">
        <div className="registrationInputsBox">
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
            id="password"
            label="Create password"
            variant="outlined"
            inputType="password"
          />
          <Input
            controller={{
              control: control,
              name: 'confirmPassword',
            }}
            id="confirmPassword"
            label="Repeat password"
            variant="outlined"
            inputType="password"
          />
          <FormControlLabel
            control={<Checkbox checked={ageChecked} onChange={confirmAge} />}
            label="Confirm that I am over 18 years old"
          />
        </div>
        <div>
          <CustomButton
            title={'Sign Up and take your beer'}
            icon={<SportsBarIcon fontSize="small" />}
            type="submit"
            disabled={!isValid || !ageChecked}
          />
        </div>
      </div>
      <div className="signInInfoText">
        Do you have an account?{' '}
        <span className="signInInfoButton" onClick={handleGoToLogin}>
          Sign In!
        </span>
      </div>
      <Snackbar open={isAuthError} autoHideDuration={6000} onClose={handleResetAuthError}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          User with this email already exists
        </Alert>
      </Snackbar>
    </form>
  );
};
