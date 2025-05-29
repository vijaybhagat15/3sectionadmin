import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogType, InitialBlogState } from "../../Types/blog";

const initialState: InitialBlogState = {
  allBlogs: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setAllBlogs: (state, action: PayloadAction<BlogType[]>) => {
      state.allBlogs = action.payload;
    },
    addBlog: (state, action: PayloadAction<BlogType>) => {
      const existingBlogIndex = state.allBlogs.findIndex(
        blog => blog._id === action.payload._id
      );

      if (existingBlogIndex === -1) {
        state.allBlogs.push(action.payload);
      }
    },
    updateBlog: (state, action: PayloadAction<BlogType>) => {
      const index = state.allBlogs.findIndex(
        blog => blog._id === action.payload._id
      );

      if (index !== -1) {
        state.allBlogs[index] = { ...action.payload };
      }
    },
    deleteBlog: (state, action: PayloadAction<string>) => {
      state.allBlogs = state.allBlogs.filter(
        blog => blog._id !== action.payload
      );
    },
  },
});

export const { setAllBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
