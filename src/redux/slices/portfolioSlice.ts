import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Portfolio, PortfolioCreateRequest, PortfolioUpdateRequest } from '../../types';
import { toast } from 'react-toastify';
import * as portfolioApi from '../../api/portfolioApi';

interface PortfolioState {
  portfolios: Portfolio[];
  artistPortfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  portfolios: [],
  artistPortfolios: [],
  selectedPortfolio: null,
  loading: false,
  error: null,
};

export const fetchAllPortfolios = createAsyncThunk(
  'portfolios/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await portfolioApi.getAllPortfolios();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch portfolios');
    }
  }
);

export const fetchPortfolioById = createAsyncThunk(
  'portfolios/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await portfolioApi.getPortfolioById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch portfolio');
    }
  }
);

export const fetchPortfoliosByArtist = createAsyncThunk(
  'portfolios/fetchByArtist',
  async (artistId: number, { rejectWithValue }) => {
    try {
      return await portfolioApi.getPortfoliosByArtist(artistId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch artist portfolios');
    }
  }
);

export const createPortfolio = createAsyncThunk(
  'portfolios/create',
  async (portfolioData: PortfolioCreateRequest, { rejectWithValue }) => {
    try {
      return await portfolioApi.createPortfolio(portfolioData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create portfolio');
    }
  }
);

export const updatePortfolio = createAsyncThunk(
  'portfolios/update',
  async ({ id, portfolioData }: { id: number; portfolioData: PortfolioUpdateRequest }, { rejectWithValue }) => {
    try {
      return await portfolioApi.updatePortfolio(id, portfolioData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update portfolio');
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  'portfolios/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await portfolioApi.deletePortfolio(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete portfolio');
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    clearSelectedPortfolio: (state) => {
      state.selectedPortfolio = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllPortfolios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = action.payload;
      })
      .addCase(fetchAllPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch By Id
      .addCase(fetchPortfolioById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPortfolio = action.payload;
      })
      .addCase(fetchPortfolioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch By Artist
      .addCase(fetchPortfoliosByArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfoliosByArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.artistPortfolios = action.payload;
      })
      .addCase(fetchPortfoliosByArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create
      .addCase(createPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios.push(action.payload);
        state.artistPortfolios.push(action.payload);
        toast.success('Portfolio item created successfully!');
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Update
      .addCase(updatePortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPortfolio = action.payload;
        state.portfolios = state.portfolios.map(p => 
          p.id === updatedPortfolio.id ? updatedPortfolio : p
        );
        state.artistPortfolios = state.artistPortfolios.map(p => 
          p.id === updatedPortfolio.id ? updatedPortfolio : p
        );
        state.selectedPortfolio = updatedPortfolio;
        toast.success('Portfolio item updated successfully!');
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Delete
      .addCase(deletePortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload as number;
        state.portfolios = state.portfolios.filter(p => p.id !== deletedId);
        state.artistPortfolios = state.artistPortfolios.filter(p => p.id !== deletedId);
        toast.success('Portfolio item deleted successfully!');
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { clearSelectedPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;