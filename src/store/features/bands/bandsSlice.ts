import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bandsService } from '../../../services/bandsService';
import { Album, Band, Genre } from '../../../types/models';

interface BandsState {
  bands: Band[];
  selectedBand: Band | null;
  selectedBandAlbums: Album[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: BandsState = {
  bands: [],
  selectedBand: null,
  selectedBandAlbums: [],
  genres: [],
  loading: false,
  error: null,
};

export const fetchBands = createAsyncThunk(
  'bands/fetchBands',
  async (params: Parameters<typeof bandsService.getBands>[0]) => {
    return await bandsService.getBands(params);
  },
);

export const fetchBandById = createAsyncThunk('bands/fetchBandById', async (id: number) => {
  return await bandsService.getBandById(id);
});

export const fetchBandAlbums = createAsyncThunk('bands/fetchBandAlbums', async (bandId: number) => {
  return await bandsService.getBandAlbums(bandId);
});

export const fetchGenres = createAsyncThunk('bands/fetchGenres', async () => {
  return await bandsService.getGenres();
});

const bandsSlice = createSlice({
  name: 'bands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBands.fulfilled, (state, action) => {
        state.loading = false;
        state.bands = action.payload;
      })
      .addCase(fetchBands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bands';
      })
      .addCase(fetchBandById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedBand = null;
      })
      .addCase(fetchBandById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBand = action.payload;
      })
      .addCase(fetchBandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch band details';
      })
      .addCase(fetchBandAlbums.fulfilled, (state, action) => {
        state.selectedBandAlbums = action.payload;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export default bandsSlice.reducer;
