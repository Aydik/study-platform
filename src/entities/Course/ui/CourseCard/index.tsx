import type { FC } from 'react';
import styles from './index.module.scss';
import type { Course } from 'entities/Course';

interface Props {
  course: Course;
}

export const CourseCard: FC<Props> = ({ course }) => {
  return (
    <button className={styles.courseCard}>
      <p className={styles.title}>{course.title}</p>
      <p className={styles.description}>{course.description}</p>
      <p className={styles.teacherName}>{course.teacherName}</p>
    </button>
  );
};
