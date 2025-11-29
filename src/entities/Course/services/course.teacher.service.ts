import { axiosInstance } from 'shared/api';
import type { CreateCourseFormValues } from 'entities/Course';

export const createCourse = async (data: CreateCourseFormValues) => {
  try {
    return axiosInstance.post('course/create', data);
  } catch (err) {
    throw err;
  }
};

export const getCourses = async () => {
  try {
    return axiosInstance.get('course/teacher/courses');
  } catch (err) {
    throw err;
  }
};
