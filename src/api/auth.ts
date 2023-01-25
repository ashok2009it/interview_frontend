/* eslint-disable @typescript-eslint/no-explicit-any */

import { _request } from './request';

export type SignInResponse = {
  success: boolean;
  message: string;
  token: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export interface UserRole {
  user_id: number;
  role_id: number;
}

export interface Role {
  id: number;
  name: string;
  User_Role: UserRole;
}

export type User = {
  id: number;
  full_name: string;
  email: string;
  uuid?: string;
  active: boolean;
  is_email_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  roles: Role[];
};

export type MeResponse = {
  success: boolean;
  message: string;
  user: User;
};

export const signIn = async (body: SignInBody) => {
  const responseBody = await _request<SignInResponse>({
    url: 'auth/signin',
    method: 'POST',
    body,
  });
  return responseBody;
};

export const getMe = async () => {
  const responseBody = await _request<MeResponse>({
    url: 'users/me',
    method: 'GET',
  });
  return responseBody;
};
