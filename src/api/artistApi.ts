import axiosClient from './axiosClient';
import { ArtistProfile } from '../types';

export const getAllArtists = async () => {
  const response = await axiosClient.get<ArtistProfile[]>('/artists');
  return response.data;
};

export const getArtistById = async (id: number) => {
  const response = await axiosClient.get<ArtistProfile>(`/artists/${id}`);
  return response.data;
};

export const getTopArtists = async () => {
  const response = await axiosClient.get<ArtistProfile[]>('/artists/top');
  return response.data;
};

export const searchArtists = async (keyword: string) => {
  const response = await axiosClient.get<ArtistProfile[]>(`/artists/search?keyword=${keyword}`);
  return response.data;
};

export const updateArtistProfile = async (id: number, profileData: any) => {
  const response = await axiosClient.put<ArtistProfile>(`/artists/${id}`, profileData);
  return response.data;
};