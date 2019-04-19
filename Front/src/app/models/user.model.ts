export interface User {
  id: string,
  email?: string;
  emailVerified?: boolean,
  displayName?: string,
  disabled?: boolean,
  photoURL?: string;
  isPasswordChanged?: boolean;
}
