import { type FC, useEffect } from 'react';
import styles from './index.module.scss';
import { RollbackOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { EditCourseForm } from 'widgets/EditCourseForm';
import { useCourseTeacherStore } from 'entities/Course/stores/course.teacher.store.ts';

export const EditCoursePage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { fetchCourse, init } = useCourseTeacherStore();

  useEffect(() => {
    if (id) fetchCourse(id);
  }, [fetchCourse, id]);

  if (init) return <Spin fullscreen />;

  return (
    <div className={styles.editCoursePage}>
      <Button
        className={styles.backButton}
        icon={<RollbackOutlined />}
        onClick={() => navigate('/teacher')}
      >
        Назад
      </Button>
      <EditCourseForm />
    </div>
  );
};
