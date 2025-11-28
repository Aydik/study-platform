import type { UserRole } from 'entities/User';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  password: string;
}
