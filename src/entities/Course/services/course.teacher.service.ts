import { axiosInstance } from 'shared/api';
import type { CreateCourseFormValues, EditCourseFormValues } from 'entities/Course';

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

export const getCourse = async (id: string) => {
  try {
    return axiosInstance.get(`course/${id}`);
  } catch (err) {
    throw err;
  }
};

export const deleteCourse = async (id: string) => {
  try {
    return axiosInstance.delete(`course/delete/${id}`);
  } catch (err) {
    throw err;
  }
};

export const editCourse = async (id: string, data: EditCourseFormValues) => {
  try {
    return axiosInstance.patch(`course/update/${id}`, data);
  } catch (err) {
    throw err;
  }
};
