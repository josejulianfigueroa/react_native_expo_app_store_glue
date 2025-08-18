export interface User {
  id: string;
  email: string;
  image: string;
  password?: string;
  fullName: string;
  isActive?: string;
  emailVerified?: string;
  role: string;
  token?: string;
}
