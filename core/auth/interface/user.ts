import { Client } from "../actions/auth-actions";

export interface User {
  id: string;
  email: string;
  image: string;
  fullName: string;
  emailVerified: boolean;
  role: string;
  token?: string;
  rut: string;
  isActive: boolean;
  createdAt: string;
  tokenPhone: string;
  client: Client;
}