import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import blogReducer from "./slices/blogSlice";
import authReducer from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";

const rootReducer = combineReducers({
  blog: blogReducer,
  auth: authReducer,
  toast: toastReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
