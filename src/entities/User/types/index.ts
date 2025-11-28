export type UserRole = 'STUDENT' | 'TEACHER';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}
