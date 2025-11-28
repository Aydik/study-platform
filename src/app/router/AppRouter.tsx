import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { IndexPage } from 'pages/IndexPage';
import { AuthLayout } from 'app/layout/AuthLayout';
import { LoginForm, RegisterForm } from 'features/auth';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'register',
        element: <RegisterForm />,
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
