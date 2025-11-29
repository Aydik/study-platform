import { type FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Button, Spin } from 'antd';
import type { Course } from 'entities/Course';
import { PlusOutlined } from '@ant-design/icons';
import { CourseCard } from 'entities/Course';
import { useNavigate } from 'react-router-dom';
import { getCourses } from 'entities/Course/services/course.teacher.service.ts';

export const TeacherHomePage: FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courses, serCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await getCourses();
        serCourses(res?.data?.data || []);
      } catch (error) {
        console.log(error);
        serCourses([]);
      }
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <div className={styles.caption}>
        <h1>Мои курсы</h1>
        <Button
          className={styles.addButton}
          icon={<PlusOutlined />}
          onClick={() => navigate('/teacher/course/create')}
        >
          Создать курс
        </Button>
      </div>
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <ul className={styles.courses}>
          {courses.map((course) => (
            <li key={course.id} className={styles.courseItem}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
