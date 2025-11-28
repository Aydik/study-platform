import type { FC } from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import type { Course } from 'entities/Course';
import { PlusOutlined } from '@ant-design/icons';
import { CourseCard } from 'entities/Course';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Основы JavaScript',
    description:
      'Изучите базовые концепции JavaScript, включая переменные, функции, циклы и объекты.',
    teacherName: 'Иванов Алексей',
  },
  {
    id: '2',
    title: 'React для начинающих',
    description: 'Погрузитесь в мир React: компоненты, хуки, состояние и работа с пропсами.',
    teacherName: 'Петрова Мария',
  },
  {
    id: '3',
    title: 'TypeScript продвинутый уровень',
    description:
      'Освойте продвинутые возможности TypeScript: дженерики, утилиты типов и декораторы.',
    teacherName: 'Сидоров Дмитрий',
  },
  {
    id: '4',
    title: 'Веб-разработка с HTML и CSS',
    description:
      'Создавайте современные веб-страницы с помощью HTML5 и CSS3, включая Flexbox и Grid.',
    teacherName: 'Кузнецова Анна',
  },
  {
    id: '5',
    title: 'Node.js и Express',
    description:
      'Научитесь создавать серверные приложения с использованием Node.js и фреймворка Express. Научитесь создавать серверные приложения с использованием Node.js и фреймворка Express.',
    teacherName: 'Васильев Игорь',
  },
  {
    id: '6',
    title: 'Базы данных SQL',
    description: 'Изучите основы реляционных баз данных, SQL запросы и проектирование схем данных.',
    teacherName: 'Николаева Елена',
  },
  {
    id: '7',
    title: 'Алгоритмы и структуры данных',
    description:
      'Освойте основные алгоритмы и структуры данных для успешного прохождения собеседований.',
    teacherName: 'Федоров Сергей',
  },
  {
    id: '8',
    title: 'DevOps основы',
    description: 'Познакомьтесь с практиками DevOps: CI/CD, контейнеризация и облачные технологии.',
    teacherName: 'Морозова Ольга',
  },
];

export const TeacherHomePage: FC = () => {
  return (
    <div className={styles.teacherHomePage}>
      <div className={styles.caption}>
        <h1>Мои курсы</h1>
        <Button className={styles.addButton} icon={<PlusOutlined />}>
          Создать курс
        </Button>
      </div>
      <ul className={styles.courses}>
        {mockCourses.map((course) => (
          <li key={course.id} className={styles.courseItem}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </div>
  );
};
