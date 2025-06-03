// redux/slices/jobSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API = '/api/v1/job';

export interface Job {
  _id?: string;
  jobTitle: string;
  jobDescription: string;
  company_logo?: string;
  company_name: string;
  payAmount?: string;
  timing?: string;
  experienceRequired?: string;
  role?: string;
  location: string;
  department?: string;
  employment_type?: string;
  education?: string;
  skills?: string[];
  open_positions?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface JobState {
  jobs: Job[];
  jobDetails: Job | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: JobState = {
  jobs: [],
  jobDetails: null,
  loading: false,
  error: null,
  success: false,
};

// ✅ Thunks

export const fetchAllJobs = createAsyncThunk('jobs/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/get-all-job`);
    return res.data.jobs; // <-- FIXED
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const fetchJobById = createAsyncThunk('jobs/fetchById', async (id: string, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/get-job/${id}`);
    return res.data.job;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const addJob = createAsyncThunk('jobs/add', async (jobData: Job, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/add-job`, jobData);
    return res.data.job;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateJob = createAsyncThunk(
  'jobs/update',
  async ({ id, jobData }: { id: string; jobData: Partial<Job> }, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/update-job/${id}`, jobData);
      return res.data.job;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteJob = createAsyncThunk('jobs/delete', async (id: string, thunkAPI) => {
  try {
    await axios.delete(`${API}/delete-job/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// ✅ Slice

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.loading = false;
        state.jobDetails = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.loading = false;
        state.success = true;
        state.jobs.push(action.payload);
      })
      .addCase(addJob.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.loading = false;
        state.success = true;
        state.jobs = state.jobs.map((job) => (job._id === action.payload._id ? action.payload : job));
      })
      .addCase(updateJob.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJobState } = jobSlice.actions;

export default jobSlice.reducer;
