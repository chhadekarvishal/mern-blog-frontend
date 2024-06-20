import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "./toastSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to store token in Cookies
const storeToken = (token) => {
  Cookies.set("token", token, { expires: 1 }); // Store token with expiration time
};

// Function to remove token from Cookies
const removeToken = () => {
  Cookies.remove("token");
};

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    if (response.status === 200) {
      const { user } = response.data;
      storeToken(user?.token);
      return { user };
    } else {
      return;
    }
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    if (response.status === 201) {
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
    // Remove token from Cookies
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
        // Remove token from Cookies
        removeToken();
      });
  },
});

export default authSlice.reducer;
