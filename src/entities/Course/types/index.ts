export interface Course {
  id: string;
  title: string;
  description?: string;
  teacherName?: string;
}

export interface CreateCourseFormValues {
  title: string;
  description?: string;
  isPrivateCourse: boolean;
  keyword?: string;
}
