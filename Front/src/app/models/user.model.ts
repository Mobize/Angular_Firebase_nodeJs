export interface User {
  displayName: string;
  email: string;
  isAdmin?: boolean;
  isPasswordChanged?: boolean;
  id: string;
  photoURL?: string;
}
