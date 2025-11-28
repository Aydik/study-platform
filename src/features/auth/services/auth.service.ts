import { axiosInstance } from 'shared/api';
import type { LoginDto, RegisterDto } from 'features/auth/types';

export const loginUser = async (data: LoginDto) => {
  try {
    return axiosInstance.post('auth/login', data);
  } catch (err) {
    throw err;
  }
};

export const registerUser = async (data: RegisterDto) => {
  try {
    return axiosInstance.post('auth/registration', data);
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    return axiosInstance.get('auth/logout');
  } catch (err) {
    throw err;
  }
};

export const getProfile = async () => {
  try {
    return axiosInstance.get('auth/me');
  } catch (err) {
    throw err;
  }
};
