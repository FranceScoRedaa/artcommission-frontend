import axiosClient from './axiosClient';
import { Portfolio, PortfolioCreateRequest, PortfolioUpdateRequest } from '../types';

export const getAllPortfolios = async () => {
  const response = await axiosClient.get<Portfolio[]>('/portfolios');
  return response.data;
};

export const getPortfolioById = async (id: number) => {
  const response = await axiosClient.get<Portfolio>(`/portfolios/${id}`);
  return response.data;
};

export const getPortfoliosByArtist = async (artistId: number) => {
  const response = await axiosClient.get<Portfolio[]>(`/portfolios/artist/${artistId}`);
  return response.data;
};

export const createPortfolio = async (portfolioData: PortfolioCreateRequest) => {
  const response = await axiosClient.post<Portfolio>('/portfolios', portfolioData);
  return response.data;
};

export const updatePortfolio = async (id: number, portfolioData: PortfolioUpdateRequest) => {
  const response = await axiosClient.put<Portfolio>(`/portfolios/${id}`, portfolioData);
  return response.data;
};

export const deletePortfolio = async (id: number) => {
  const response = await axiosClient.delete(`/portfolios/${id}`);
  return response.data;
};