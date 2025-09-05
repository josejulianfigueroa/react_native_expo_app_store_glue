import { productsApi } from '@/core/api/productsApi';
import { User } from '../interface/user';

export interface Client {
    id:            string;
    fullName:      string;
    rut:           string;
    email:         string;
    image:         string;
    phone:         string;
    isActive:      boolean;
    emailVerified: boolean;
    address:       string;
    web:           string;
    isOpen:        boolean;
    activity:      string;
    horario:       string;
    createdAt:     Date;
}
export interface AuthResponse {
  id: string;
  email: string;
  rut: string;
  isActive: boolean;
  image: string;
  emailVerified: boolean;
  fullName: string;
  createdAt: string;
  role: string;
  token: string;
  tokenPhone: string;
  client: Client;
}

const returnUserToken = (
  data: AuthResponse
): {
  user: User;
  token: string;
} => {
  // const { id, email, fullName, isActive, roles, token } = data;
  const { token, ...user } = data;

  // const user: User = {
  //   id,
  //   email,
  //   fullName,
  //   isActive,
  //   roles,
  // };

  return {
    user,
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>('/auth/login', {
      email,
      password,
      idClient: process.env.EXPO_PUBLIC_KEY_APP
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};

export const authRegister = async (email: string, password: string, fullName: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
      rut:'',
      idClient: process.env.EXPO_PUBLIC_KEY_APP
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>('/auth/check-status');

    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};

