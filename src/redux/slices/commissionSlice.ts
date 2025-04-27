import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Commission, CommissionCreateRequest, CommissionUpdateRequest, CommissionStatus } from '../../types';
import { toast } from 'react-toastify';
import * as commissionApi from '../../api/commissionApi';

interface CommissionState {
  commissions: Commission[];
  artistCommissions: Commission[];
  clientCommissions: Commission[];
  selectedCommission: Commission | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommissionState = {
  commissions: [],
  artistCommissions: [],
  clientCommissions: [],
  selectedCommission: null,
  loading: false,
  error: null,
};

export const fetchCommissionById = createAsyncThunk(
  'commissions/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await commissionApi.getCommissionById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch commission');
    }
  }
);

export const fetchClientCommissions = createAsyncThunk(
  'commissions/fetchClientCommissions',
  async (_, { rejectWithValue }) => {
    try {
      return await commissionApi.getMyCommissions();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch client commissions');
    }
  }
);

export const fetchArtistCommissions = createAsyncThunk(
  'commissions/fetchArtistCommissions',
  async (_, { rejectWithValue }) => {
    try {
      return await commissionApi.getArtistCommissions();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch artist commissions');
    }
  }
);

export const createCommission = createAsyncThunk(
  'commissions/create',
  async (commissionData: CommissionCreateRequest, { rejectWithValue }) => {
    try {
      return await commissionApi.createCommission(commissionData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create commission');
    }
  }
);

export const updateCommission = createAsyncThunk(
  'commissions/update',
  async ({ id, commissionData }: { id: number; commissionData: CommissionUpdateRequest }, { rejectWithValue }) => {
    try {
      return await commissionApi.updateCommission(id, commissionData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update commission');
    }
  }
);

export const updateCommissionStatus = createAsyncThunk(
  'commissions/updateStatus',
  async ({ id, status }: { id: number; status: CommissionStatus }, { rejectWithValue }) => {
    try {
      return await commissionApi.updateCommissionStatus(id, status);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update commission status');
    }
  }
);

export const deleteCommission = createAsyncThunk(
  'commissions/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await commissionApi.deleteCommission(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete commission');
    }
  }
);

const commissionSlice = createSlice({
  name: 'commissions',
  initialState,
  reducers: {
    clearSelectedCommission: (state) => {
      state.selectedCommission = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch By Id
      .addCase(fetchCommissionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCommission = action.payload;
      })
      .addCase(fetchCommissionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Client Commissions
      .addCase(fetchClientCommissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientCommissions.fulfilled, (state, action) => {
        state.loading = false;
        state.clientCommissions = action.payload;
      })
      .addCase(fetchClientCommissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Artist Commissions
      .addCase(fetchArtistCommissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtistCommissions.fulfilled, (state, action) => {
        state.loading = false;
        state.artistCommissions = action.payload;
      })
      .addCase(fetchArtistCommissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create
      .addCase(createCommission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommission.fulfilled, (state, action) => {
        state.loading = false;
        state.clientCommissions.push(action.payload);
        toast.success('Commission request submitted successfully!');
      })
      .addCase(createCommission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Update
      .addCase(updateCommission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCommission.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCommission = action.payload;
        
        // Update in client commissions if it exists there
        state.clientCommissions = state.clientCommissions.map(c => 
          c.id === updatedCommission.id ? updatedCommission : c
        );
        
        // Update in artist commissions if it exists there
        state.artistCommissions = state.artistCommissions.map(c => 
          c.id === updatedCommission.id ? updatedCommission : c
        );
        
        state.selectedCommission = updatedCommission;
        toast.success('Commission updated successfully!');
      })
      .addCase(updateCommission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Update Status
      .addCase(updateCommissionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCommissionStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCommission = action.payload;
        
        // Update in client commissions if it exists there
        state.clientCommissions = state.clientCommissions.map(c => 
          c.id === updatedCommission.id ? updatedCommission : c
        );
        
        // Update in artist commissions if it exists there
        state.artistCommissions = state.artistCommissions.map(c => 
          c.id === updatedCommission.id ? updatedCommission : c
        );
        
        state.selectedCommission = updatedCommission;
        toast.success(`Commission status updated to ${updatedCommission.status}!`);
      })
      .addCase(updateCommissionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Delete
      .addCase(deleteCommission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommission.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload as number;
        state.clientCommissions = state.clientCommissions.filter(c => c.id !== deletedId);
        state.artistCommissions = state.artistCommissions.filter(c => c.id !== deletedId);
        toast.success('Commission deleted successfully!');
      })
      .addCase(deleteCommission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { clearSelectedCommission } = commissionSlice.actions;
export default commissionSlice.reducer;