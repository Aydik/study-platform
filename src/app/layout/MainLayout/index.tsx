import { type FC, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { App, Layout, Spin } from 'antd';
import { LogoutButton, useAuthStore } from 'features/auth';

export const MainLayout: FC = () => {
  const { user, init } = useAuthStore();
  const messageShown = useRef(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  useEffect(() => {
    if (!init && !user) {
      if (!messageShown.current) {
        message.info('Пройдите аутентификацию');
        messageShown.current = true;
      }
      navigate('/auth/login');
    }
  }, [init, message, navigate, user]);

  if (init)
    return (
      <div className={styles.loaderWrapper}>
        <Spin />
      </div>
    );

  if (user)
    return (
      <Layout>
        <Layout.Header className={styles.header}>
          <div className={styles.headerWrapper}>
            <span className={styles.greeting}>{`Привет, ${user.firstName} ${user.lastName}`}</span>
            <LogoutButton />
          </div>
        </Layout.Header>
        <Layout.Content className={styles.main}>
          <div className={styles.mainWrapper}>
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    );
};
