import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'features/auth';

export const IndexPage: FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'STUDENT') {
      navigate('/student');
    } else if (user?.role === 'TEACHER') {
      navigate('/teacher');
    }
  }, [navigate, user]);

  return null;
};
