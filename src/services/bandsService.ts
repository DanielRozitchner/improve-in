import { Album, Band, Genre } from '../types/models';
import { api } from './api';

interface GetBandsParams {
  genreCode?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';
}

export const bandsService = {
  async getBands(params: GetBandsParams = {}) {
    const response = await api.get<Band[]>('/bands', { params });
    return response.data;
  },

  async getBandById(id: number) {
    const response = await api.get<Band>(`/bands/${id}`);
    return response.data;
  },

  async getBandAlbums(bandId: number) {
    const response = await api.get<Album[]>(`/albums?bandId=${bandId}`);
    return response.data;
  },

  async getGenres() {
    const response = await api.get<Genre[]>('/genre');
    return response.data;
  },
};
