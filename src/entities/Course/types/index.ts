export interface Course {
  id: string;
  title: string;
  description?: string;
  isPrivateCourse: boolean;
  keyword?: string;
  teacherName?: string;
  courseMembers?: [];
}

export interface CreateCourseFormValues {
  title: string;
  description?: string;
  isPrivateCourse: boolean;
  keyword?: string;
}

export type EditCourseFormValues = CreateCourseFormValues;
