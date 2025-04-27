import axiosClient from './axiosClient';
import { LoginRequest, SignupRequest, AuthResponse } from '../types';

export const login = async (credentials: LoginRequest) => {
  const response = await axiosClient.post<AuthResponse>('/auth/signin', credentials);
  return response.data;
};

export const signup = async (signupData: SignupRequest) => {
  const response = await axiosClient.post('/auth/signup', signupData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosClient.get('/users/me');
  return response.data;
};