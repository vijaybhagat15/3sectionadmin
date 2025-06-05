/* eslint-disable @typescript-eslint/no-explicit-any */
//client\src\Redux\Slice\subBrandSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { requestOptions } from '../../Utils/api';

const API = 'http://localhost:8000/api/v1/subbrand';

export interface SubBrand {
  _id?: string;
  name: string;
  description?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SubBrandState {
  subBrands: SubBrand[];
  subBrandDetails: SubBrand | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SubBrandState = {
  subBrands: [],
  subBrandDetails: null,
  loading: false,
  error: null,
  success: false,
};

// ✅ Thunks

export const fetchAllSubBrands = createAsyncThunk('subbrands/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/get-all-subbrand`);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching subbrands');
  }
});

export const fetchSubBrandById = createAsyncThunk('subbrands/fetchById', async (id: string, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/get-subbrand/${id}`);
    return res.data.subbrand;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching subbrand');
  }
});

export const addSubBrand = createAsyncThunk('subbrands/add', async (data: SubBrand, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/add-subbrand`, data, requestOptions);
    return res.data.subbrand;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error adding subbrand');
  }
});

export const updateSubBrand = createAsyncThunk(
  'subbrands/update',
  async ({ id, data }: { id: string; data: Partial<SubBrand> }, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/update-subbrand/${id}`, data, requestOptions);
      return res.data.subbrand;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error updating subbrand');
    }
  }
);

export const deleteSubBrand = createAsyncThunk('subbrands/delete', async (id: string, thunkAPI) => {
  try {
    await axios.delete(`${API}/delete-subbrand/${id}`, requestOptions);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error deleting subbrand');
  }
});

// ✅ Slice

const subBrandSlice = createSlice({
  name: 'subbrands',
  initialState,
  reducers: {
    clearSubBrandState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSubBrands.fulfilled, (state, action: PayloadAction<SubBrand[]>) => {
        state.loading = false;
        state.subBrands = action.payload;
      })
      .addCase(fetchAllSubBrands.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSubBrandById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubBrandById.fulfilled, (state, action: PayloadAction<SubBrand>) => {
        state.loading = false;
        state.subBrandDetails = action.payload;
      })
      .addCase(fetchSubBrandById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addSubBrand.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addSubBrand.fulfilled, (state, action: PayloadAction<SubBrand>) => {
        state.loading = false;
        state.success = true;
        state.subBrands.push(action.payload);
      })
      .addCase(addSubBrand.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSubBrand.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateSubBrand.fulfilled, (state, action: PayloadAction<SubBrand>) => {
        state.loading = false;
        state.success = true;
        state.subBrands = state.subBrands.map((sb) => (sb._id === action.payload._id ? action.payload : sb));
      })
      .addCase(updateSubBrand.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteSubBrand.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteSubBrand.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.subBrands = state.subBrands.filter((sb) => sb._id !== action.payload);
      })
      .addCase(deleteSubBrand.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubBrandState } = subBrandSlice.actions;

export default subBrandSlice.reducer;
