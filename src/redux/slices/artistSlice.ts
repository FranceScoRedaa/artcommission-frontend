import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllArtists, getArtistById, getTopArtists, searchArtists, updateArtistProfile } from '../../api/artistApi';
import { ArtistProfile } from '../../types';
import { toast } from 'react-toastify';

interface ArtistState {
  artists: ArtistProfile[];
  topArtists: ArtistProfile[];
  selectedArtist: ArtistProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArtistState = {
  artists: [],
  topArtists: [],
  selectedArtist: null,
  loading: false,
  error: null,
};

export const fetchAllArtists = createAsyncThunk(
  'artists/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const artists = await getAllArtists();
      return artists;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch artists');
    }
  }
);

export const fetchTopArtists = createAsyncThunk(
  'artists/fetchTop',
  async (_, { rejectWithValue }) => {
    try {
      const artists = await getTopArtists();
      return artists;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch top artists');
    }
  }
);

export const fetchArtistById = createAsyncThunk(
  'artists/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const artist = await getArtistById(id);
      return artist;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch artist');
    }
  }
);

export const searchArtistsByKeyword = createAsyncThunk(
  'artists/search',
  async (keyword: string, { rejectWithValue }) => {
    try {
      const artists = await searchArtists(keyword);
      return artists;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search artists');
    }
  }
);

export const updateArtist = createAsyncThunk(
  'artists/update',
  async ({ id, profileData }: { id: number; profileData: any }, { rejectWithValue }) => {
    try {
      const artist = await updateArtistProfile(id, profileData);
      return artist;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update artist profile');
    }
  }
);

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    clearSelectedArtist: (state) => {
      state.selectedArtist = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Artists
      .addCase(fetchAllArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
      })
      .addCase(fetchAllArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Fetch Top Artists
      .addCase(fetchTopArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.topArtists = action.payload;
      })
      .addCase(fetchTopArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Artist By Id
      .addCase(fetchArtistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedArtist = action.payload;
      })
      .addCase(fetchArtistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      
      // Search Artists
      .addCase(searchArtistsByKeyword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchArtistsByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
      })
      .addCase(searchArtistsByKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Artist
      .addCase(updateArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedArtist = action.payload;
        toast.success('Profile updated successfully!');
      })
      .addCase(updateArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { clearSelectedArtist } = artistSlice.actions;
export default artistSlice.reducer;