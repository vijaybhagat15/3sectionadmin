import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewsPost } from "../../Types/post";
import { requestOptions } from "../../Utils/api";

const API_URL = "http://localhost:8000/api/v1/news";

// Fetch all news
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get-all-news`, requestOptions);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Fetch news error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch news");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Fetch news by ID
export const fetchNewsById = createAsyncThunk(
  "news/fetchNewsById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get-news/${id}`, requestOptions);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Fetch news by ID error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch news by ID");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Add news - Fixed with proper error handling and logging
export const addNews = createAsyncThunk(
  "news/addNews",
  async (newPost: Omit<NewsPost, "_id">, { rejectWithValue }) => {
    try {
      console.log("Making API request to add news:", `${API_URL}/add-news`);

      // Clone requestOptions to avoid modifying the original
      const options = {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(`${API_URL}/add-news`, newPost, options);
      console.log("Add news response:", response.data);

      if (!response.data) {
        return rejectWithValue("Server returned empty response");
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Add news error details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        return rejectWithValue(error.response?.data?.message || error.message || "Failed to add news");
      }
      console.error("Unknown error adding news:", error);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Update news - Fixed with proper error handling
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ updatedPost }: { updatedPost: NewsPost }, { rejectWithValue }) => {
    try {
      // Make sure to include requestOptions
      const response = await axios.put(`${API_URL}/update-news/${updatedPost._id}`, updatedPost, requestOptions);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Update news error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || error.message || "Failed to update news");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete news - Fixed with proper error handling and requestOptions
export const deletePost = createAsyncThunk(
  "news/deletePost",
  async (id: string, { rejectWithValue }) => {
    try {
      // Include requestOptions for authentication
      await axios.delete(`${API_URL}/delete-news/${id}`, requestOptions);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Delete news error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || error.message || "Failed to delete news");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    posts: [] as NewsPost[],
    currentPost: null as NewsPost | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    // Add a reducer to clear errors
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all news
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch news by ID
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add news
      .addCase(addNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.loading = false;
        // Make sure we're adding a valid post to the state
        if (action.payload && action.payload._id) {
          state.posts.push(action.payload);
        }
      })
      .addCase(addNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update news
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        // Also update currentPost if it's the one being edited
        if (state.currentPost && state.currentPost._id === action.payload._id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete news
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        // Clear currentPost if it's the one being deleted
        if (state.currentPost && state.currentPost._id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearErrors } = newsSlice.actions;
export default newsSlice.reducer;