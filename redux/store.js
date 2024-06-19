import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import blogReducer from "./slices/blogSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  blog: blogReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
