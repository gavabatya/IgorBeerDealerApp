import { object, string } from 'yup';

export const loginValidationSchema = object().shape({
  email: string()
    .required(() => 'Email is required')
    .email(() => 'Email has an error'),
  password: string()
    .required(() => 'Password is required')
    .min(5, 'Must be exactly 6 digits'),
});
