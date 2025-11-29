import { type FC, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { useAuthStore } from 'features/auth';

export const TeacherLayout: FC = () => {
  const { user } = useAuthStore();
  const messageShown = useRef(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  useEffect(() => {
    if (user?.role !== 'TEACHER') {
      if (!messageShown.current) {
        message.info('Вы не являетесь преподавателем');
        messageShown.current = true;
      }
      navigate('/student');
    }
  }, [message, navigate, user]);

  if (user?.role === 'TEACHER') return <Outlet />;
};
