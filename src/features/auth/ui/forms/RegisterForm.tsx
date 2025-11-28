import { type FC } from 'react';
import styles from 'features/auth/styles/index.module.scss';
import * as yup from 'yup';
import { registerUserSchema } from 'features/auth/schemas';
import { App, Button, Input, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'features/auth';
import type { ApiMapResponse } from 'shared/api';
import type { AxiosError } from 'axios';
import { getYupSchemaFields } from 'shared/utils/yup.ts';

type RegisterFormState = yup.InferType<typeof registerUserSchema>;
const formFields = getYupSchemaFields(registerUserSchema);

export const RegisterForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormState>({
    resolver: yupResolver(registerUserSchema),
    mode: 'onBlur',
  });

  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onSubmit = async (data: RegisterFormState) => {
    try {
      const validated = await registerUserSchema.validate(data, { abortEarly: false });
      await register({
        email: validated.email,
        password: validated.password,
      });
      navigate('/storage');
      message.destroy();
      message.info('Вы успешно зарегистрировались');
    } catch (error) {
      const axiosError = error as AxiosError<ApiMapResponse>;
      const errorData = axiosError?.response?.data?.data;

      if (errorData && typeof errorData === 'object' && !Array.isArray(errorData)) {
        for (const [key, value] of Object.entries(errorData)) {
          if (formFields.includes(key as keyof RegisterFormState)) {
            setError(key as keyof RegisterFormState, {
              type: 'manual',
              message: value,
            });
          }
        }
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography.Title className={styles.title}>Регистрация</Typography.Title>
      <div className={styles.fields}>
        <div className={styles.inputWrapper}>
          <Typography className={styles.fieldLabel}>Email</Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите email"
                status={errors.email ? 'error' : ''}
                size="large"
                autoComplete="email"
              />
            )}
          />
          {errors.email && (
            <Typography.Text type="danger" className={styles.errorText}>
              {errors.email.message}
            </Typography.Text>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <Typography className={styles.fieldLabel}>Пароль</Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Введите пароль"
                status={errors.password ? 'error' : ''}
                size="large"
                autoComplete="new-password"
              />
            )}
          />
          {errors.password && (
            <Typography.Text type="danger" className={styles.errorText}>
              {errors.password.message}
            </Typography.Text>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <Typography className={styles.fieldLabel}>Подтвердите пароль</Typography>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Повторите пароль"
                status={errors.confirmPassword ? 'error' : ''}
                size="large"
                autoComplete="new-password"
              />
            )}
          />
          {errors.confirmPassword && (
            <Typography.Text type="danger" className={styles.errorText}>
              {errors.confirmPassword.message}
            </Typography.Text>
          )}
        </div>
      </div>
      <Button
        type="primary"
        className={styles.submitButton}
        size="large"
        htmlType="submit"
        loading={isLoading}
      >
        Зарегистрироваться
      </Button>
      <Link to="/auth/login" className={styles.link}>
        Уже есть аккаунт? Войти
      </Link>
    </form>
  );
};
