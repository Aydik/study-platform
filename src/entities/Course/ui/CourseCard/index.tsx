import type { FC } from 'react';
import styles from './index.module.scss';
import type { Course } from 'entities/Course';
import clsx from 'clsx';

interface Props {
  course: Course;
}

export const CourseCard: FC<Props> = ({ course }) => {
  return (
    <button
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
