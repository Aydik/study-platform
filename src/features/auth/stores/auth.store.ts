import { create } from 'zustand';
import { loginUser, logout, getProfile, registerUser } from 'features/auth';
import type { LoginDto, RegisterDto } from 'features/auth/types';
import type { User } from 'entities/User';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  init: boolean;
  doInit: () => void;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  init: true,

  doInit: () => {
    set({ init: false });
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await loginUser(data);
      const user: User = res?.data?.data;
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const res = await registerUser(data);
      const user: User = res?.data?.data;
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logout();
    } finally {
      set({ user: null });
    }
  },

  checkAuth: async () => {
    try {
      const res = await getProfile();
      const user: User = res?.data?.data;
      set({ user });
    } catch (error) {
      set({ user: null });
    }
    // const user: User = {
    //   id: 1,
    //   firstName: 'Кирилл',
    //   lastName: 'Айдаров',
    //   email: 'Aydik@gmail.com',
    //   role: 'TEACHER',
    // };
    // set({ isLoading: false, user: user });
  },
}));
