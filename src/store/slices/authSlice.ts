'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/auth.types';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/utils/constants';

interface AuthState {
  user: User | null;
  token: string | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.hydrated = true;

      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_TOKEN_KEY, action.payload.accessToken);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(action.payload.user));
        document.cookie = `${AUTH_TOKEN_KEY}=${action.payload.accessToken}; path=/; max-age=604800; SameSite=Lax`;
      }
    },
    hydrateAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        if (token && userStr) {
          try {
            state.token = token;
            state.user = JSON.parse(userStr) as User;
          } catch {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(AUTH_USER_KEY);
          }
        }
      }
      state.hydrated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.hydrated = true;

      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
      }
    },
  },
});

export const { setCredentials, hydrateAuth, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

