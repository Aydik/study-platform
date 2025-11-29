import { type FC, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { App, Layout, Spin } from 'antd';
import { useAuthStore } from 'features/auth';

export const AuthLayout: FC = () => {
  const { user, init } = useAuthStore();
  const messageShown = useRef(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  useEffect(() => {
    if (!init && user) {
      if (!messageShown.current) {
        message.info('Вы уже прошли аутентификацию');
        messageShown.current = true;
      }
      if (user?.role === 'TEACHER') navigate('/teacher');
      else navigate('/student');
    }
  }, [init, message, navigate, user]);

  if (init)
    return (
      <div className={styles.loaderWrapper}>
        <Spin />
      </div>
    );

  if (!user)
    return (
      <Layout className={styles.authLayout}>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    );
};
