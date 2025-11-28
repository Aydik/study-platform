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

export const baseEmailSchema = yup.object({
  email: yup
    .string()
    .email('Неверный формат email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Неверный формат email')
    .required('Email обязателен'),
});

export const loginUserSchema = baseEmailSchema.shape({
  password: yup.string().required(passwordErrorMessages.required),
});

export const registerUserSchema = baseEmailSchema.shape({
  firstName: yup
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя должно содержать максимум 50 символов')
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, 'Имя может содержать только буквы, пробелы и дефисы')
    .required('Имя обязательно'),

  lastName: yup
    .string()
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия должна содержать максимум 50 символов')
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, 'Фамилия может содержать только буквы, пробелы и дефисы')
    .required('Фамилия обязательна'),

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
