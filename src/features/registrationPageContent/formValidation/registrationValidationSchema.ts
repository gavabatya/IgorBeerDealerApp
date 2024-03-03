import { object, ref, string } from 'yup';

export const registrationValidationSchema = object().shape({
  email: string()
    .required(() => 'Email is required')
    .email(() => 'Email has an error'),
  password: string()
    .required(() => 'Password is required')
    .min(5, 'Must be exactly 6 digits'),
  confirmPassword: string()
    // @ts-ignore
    .oneOf([ref('password'), null], () => 'Passwords do not match')
    .required(() => 'Password is required')
    .min(5, 'Must be exactly 6 digits'),
});
