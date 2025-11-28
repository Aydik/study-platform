import * as yup from 'yup';

const passwordErrorMessages = {
  required: 'Пароль обязателен',
  length: 'Пароль должен содержать минимум 8 символов',
  lowercase: 'Пароль должен содержать хотя бы одну строчную букву (a-z)',
  uppercase: 'Пароль должен содержать хотя бы одну заглавную букву (A-Z)',
  digit: 'Пароль должен содержать хотя бы одну цифру (0-9)',
  specialChar: 'Пароль должен содержать хотя бы один спецсимвол (@$!%*?&)',
  matches: 'Пароль содержит недопустимые символы',
};

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .email('Неверный формат email')
    .matches(/^[^\s@]+@[^\s@]+\.[A-Za-z]+$/, 'Неверный формат email')
    .required('Email обязателен'),
  password: yup.string().required(passwordErrorMessages.required),
});

export const registerUserSchema = loginUserSchema.shape({
  password: yup
    .string()
    .required(passwordErrorMessages.required)
    .min(8, passwordErrorMessages.length)
    .matches(/[a-z]/, passwordErrorMessages.lowercase)
    .matches(/[A-Z]/, passwordErrorMessages.uppercase)
    .matches(/\d/, passwordErrorMessages.digit)
    .matches(/[@$!%*?&]/, passwordErrorMessages.specialChar)
    .matches(/^[A-Za-z\d@$!%*?&]+$/, passwordErrorMessages.matches),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),
});
