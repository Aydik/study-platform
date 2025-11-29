import type { FC } from 'react';
import styles from './index.module.scss';
import type { Course } from 'entities/Course';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'features/auth';

interface Props {
  course: Course;
}

export const CourseCard: FC<Props> = ({ course }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const handleClick = () => navigate(`/${user?.role.toLocaleLowerCase()}/course/${course.id}`);
  return (
    <button
      onClick={handleClick}
      className={clsx(
        styles.courseCard,
        course.teacherName !== undefined && styles.courseCard_student,
      )}
    >
      <p className={styles.title}>{course.title}</p>
      <p className={styles.description}>{course.description}</p>
      {course.teacherName && <p className={styles.teacherName}>{course.teacherName}</p>}
    </button>
  );
};
