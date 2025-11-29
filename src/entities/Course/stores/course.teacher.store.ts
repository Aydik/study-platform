import { create } from 'zustand';
import type { Course, EditCourseFormValues } from 'entities/Course';
import { editCourse, getCourse } from 'entities/Course/services/course.teacher.service.ts';

interface State {
  init: boolean;
  isLoading: boolean;
  course: Course | null;
  fetchCourse: (id: string) => Promise<void>;
  editCourse: (id: string, data: EditCourseFormValues) => Promise<void>;
}

export const useCourseTeacherStore = create<State>((set) => ({
  init: true,
  isLoading: true,
  course: null,

  fetchCourse: async (id: string) => {
    set({ isLoading: true });
    try {
      const res = await getCourse(id);
      const course: Course = res?.data?.data;
      set({ course });
    } catch (error) {
      set({ course: null });
    }
    set({ isLoading: false, init: false });
  },

  editCourse: async (id: string, data: EditCourseFormValues) => {
    set({ isLoading: true });
    try {
      const res = await editCourse(id, data);
      const course: Course = res?.data?.data;
      set({ course });
    } catch (error) {}
    set({ isLoading: false });
  },
}));
