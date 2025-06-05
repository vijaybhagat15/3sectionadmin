/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { requestOptions } from '../../Utils/api';

const API = 'http://localhost:8000/api/v1/partner';

export interface Partner {
  _id?: string;
  companyName: string;
  logo: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PartnerState {
  partners: Partner[];
  partnerDetails: Partner | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PartnerState = {
  partners: [],
  partnerDetails: null,
  loading: false,
  error: null,
  success: false,
};

// ✅ Thunks

export const fetchAllPartners = createAsyncThunk('partners/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/get-all-partners`);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching partners');
  }
});

export const fetchPartnerById = createAsyncThunk('partners/fetchById', async (id: string, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/get-partner/${id}`);
    return res.data.partner;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching partner');
  }
});

export const addPartner = createAsyncThunk('partners/add', async (data: Partner, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/add-partner`, data, requestOptions);
    return res.data.partner;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error adding partner');
  }
});

export const updatePartner = createAsyncThunk(
  'partners/update',
  async ({ id, data }: { id: string; data: Partial<Partner> }, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/update-partner/${id}`, data, requestOptions);
      return res.data.partner;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error updating partner');
    }
  }
);

export const deletePartner = createAsyncThunk('partners/delete', async (id: string, thunkAPI) => {
  try {
    await axios.delete(`${API}/delete-partner/${id}`, requestOptions);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error deleting partner');
  }
});

// ✅ Slice

const partnerSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    clearPartnerState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPartners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPartners.fulfilled, (state, action: PayloadAction<Partner[]>) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(fetchAllPartners.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPartnerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartnerById.fulfilled, (state, action: PayloadAction<Partner>) => {
        state.loading = false;
        state.partnerDetails = action.payload;
      })
      .addCase(fetchPartnerById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addPartner.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addPartner.fulfilled, (state, action: PayloadAction<Partner>) => {
        state.loading = false;
        state.success = true;
        state.partners.push(action.payload);
      })
      .addCase(addPartner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePartner.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updatePartner.fulfilled, (state, action: PayloadAction<Partner>) => {
        state.loading = false;
        state.success = true;
        state.partners = state.partners.map((p) => (p._id === action.payload._id ? action.payload : p));
      })
      .addCase(updatePartner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePartner.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deletePartner.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.partners = state.partners.filter((p) => p._id !== action.payload);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(deletePartner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPartnerState } = partnerSlice.actions;

export default partnerSlice.reducer;
