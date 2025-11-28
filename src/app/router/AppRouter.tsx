import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { IndexPage } from 'pages/IndexPage';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />,
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
