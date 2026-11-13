export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin';
}

export interface AuthResponseData {
  accessToken: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  hydrated: boolean;
  token: string | null;
}
