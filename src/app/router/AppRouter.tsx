import type { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from 'app/layout/AuthLayout';
import { LoginForm, RegisterForm } from 'features/auth';
import { MainLayout } from 'app/layout/MainLayout';
import { TeacherHomePage } from 'pages/teacher/TeacherHomePage';
import { StudentHomePage } from 'pages/student/StudentHomePage';
import { TeacherLayout } from 'app/layout/TeacherLayout';
import { StudentLayout } from 'app/layout/StudentLayout';
import { IndexPage } from 'pages/IndexPage';
import { CreateCoursePage } from 'pages/teacher/CreateCoursePage';

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
        path: '/teacher',
        element: <TeacherLayout />,
        children: [
          {
            index: true,
            element: <TeacherHomePage />,
          },
          {
            path: 'course/create',
            element: <CreateCoursePage />,
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
      {
        path: '/',
        element: <IndexPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
