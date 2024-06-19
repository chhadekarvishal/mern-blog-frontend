import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Function to store token in localStorage
const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to remove token from localStorage
const removeToken = () => {
  localStorage.removeItem("token");
};

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);

    if (response.request.status == 200) {
      alert("Login successful!", "success");
      const { user } = response.data;
      storeToken(user?.token);
      return { user };
    } else {
      alert("Login failed!", "Error");
    }
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    if (response.status == 201) {
      alert("Register successful!", "success");
      const { user } = response.data;
      storeToken(user?.token);
      return { user };
    } else {
    }
  } catch (error) {
    alert(error.response.data.message);
    throw Error(error.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
    // Remove token from localStorage
    removeToken();
  } catch (error) {
    console.error("Logout error:", error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        // Remove token from localStorage
        removeToken();
      });
  },
});

export default authSlice.reducer;
