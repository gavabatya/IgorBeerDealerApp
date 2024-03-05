import SportsBarIcon from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { loginValidationSchema } from './formValidation/loginValidationSchema';
import './loginPageContent.css';
import { CustomButton } from '../../components/button/CustomButton';
import { Input } from '../../components/input/Input';

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

  const onSubmit = (values: { email: string; password: string }) => {
    // alert(`GAVA TOP! ${values.email}, ${values.password}`);
    const { email, password } = values;
    const registeredUsersString = localStorage.getItem('registeredUsers');
    if (!registeredUsersString) {
      alert('говно');
      return;
    }
    const registeredUsers: [{ email: string; password: string }] =
      JSON.parse(registeredUsersString);
    const isUserRegistered = registeredUsers.some(
      (user) => user.email === email && user.password === password,
    );
    if (isUserRegistered) {
      localStorage.setItem('activeUser', JSON.stringify({ email, password }));
    } else {
      alert('ты калл');
    }
  };

  return (
    <form className="loginContainer" onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
};
