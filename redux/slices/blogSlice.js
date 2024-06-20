import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { getToken } from "@/utils/authToken";
import { showToast } from "./toastSlice";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get("/blogs");
  return response.data;
});

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post("/blogs", blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      showToast({
        message: `${error?.response?.status} ${error?.response?.statusText}, ${error?.response?.data?.message}`,
        type: "error",
      });
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.status === 200) {
        showToast({
          message: "Blog post deleted successfully",
          type: "error",
        });
        return id;
      }
    } catch (error) {
      showToast({
        message: `${error?.response?.status} ${error?.response?.statusText}, ${error?.response?.data?.message}`,
        type: "error",
      });
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editBlog = createAsyncThunk(
  "blogs/editBlog",
  async ({ id, updatedBlog }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.put(`/blogs/${id}`, updatedBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Failed to edit blog:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
