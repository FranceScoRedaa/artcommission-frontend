import axiosClient from './axiosClient';
import { Commission, CommissionCreateRequest, CommissionUpdateRequest, CommissionStatus } from '../types';

export const getCommissionById = async (id: number) => {
  const response = await axiosClient.get<Commission>(`/commissions/${id}`);
  return response.data;
};

export const getMyCommissions = async () => {
  const response = await axiosClient.get<Commission[]>('/commissions/my-requests');
  return response.data;
};

export const getArtistCommissions = async () => {
  const response = await axiosClient.get<Commission[]>('/commissions/my-commissions');
  return response.data;
};

export const createCommission = async (commissionData: CommissionCreateRequest) => {
  const response = await axiosClient.post<Commission>('/commissions', commissionData);
  return response.data;
};

export const updateCommission = async (id: number, commissionData: CommissionUpdateRequest) => {
  const response = await axiosClient.put<Commission>(`/commissions/${id}`, commissionData);
  return response.data;
};

export const updateCommissionStatus = async (id: number, status: CommissionStatus) => {
  const response = await axiosClient.put<Commission>(`/commissions/${id}/status?status=${status}`, {});
  return response.data;
};

export const deleteCommission = async (id: number) => {
  const response = await axiosClient.delete(`/commissions/${id}`);
  return response.data;
};