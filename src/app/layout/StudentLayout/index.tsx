import { type FC, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { useAuthStore } from 'features/auth';

export const StudentLayout: FC = () => {
  const { user } = useAuthStore();
  const messageShown = useRef(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  useEffect(() => {
    if (user?.role !== 'STUDENT') {
      if (!messageShown.current) {
        message.info('Вы не являетесь учеником');
        messageShown.current = true;
      }
      navigate('/teacher');
    }
  }, [message, navigate, user]);

  if (user?.role === 'STUDENT') return <Outlet />;
};
