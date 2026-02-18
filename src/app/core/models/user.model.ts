export interface User {
  username: string;
  role: UserRole;
}

export type UserRole = 'user' | 'admin';

export interface LoginCredentials {
  username: string;
  password: string;
}
