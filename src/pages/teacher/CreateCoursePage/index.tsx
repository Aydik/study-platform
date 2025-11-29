import type { FC } from 'react';
import styles from './index.module.scss';
import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CreateCourseForm } from 'widgets/CreateCourseForm';

export const CreateCoursePage: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        className={styles.backButton}
        icon={<RollbackOutlined />}
        onClick={() => navigate('/teacher')}
      >
        Назад
      </Button>
      <CreateCourseForm />
    </div>
  );
};
