import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from 'app/layout/AuthLayout';
import { LoginForm, RegisterForm } from 'features/auth';
import { MainLayout } from 'app/layout/MainLayout';
import { TeacherHomePage } from 'pages/teacher/TeacherHomePage';
import { StudentHomePage } from 'pages/student/StudentHomePage';
import { TeacherLayout } from 'app/layout/TeacherLayout';
import { StudentLayout } from 'app/layout/StudentLayout';

const routeConfig: RouteObject[] = [
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
  {
    element: <MainLayout />,
    children: [
      {
        element: <TeacherLayout />,
        children: [
          {
            path: '/teacher',
            element: <TeacherHomePage />,
          },
        ],
      },
      {
        element: <StudentLayout />,
        children: [
          {
            path: '/student',
            element: <StudentHomePage />,
          },
        ],
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
