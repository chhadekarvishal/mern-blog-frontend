import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "", // "success" or "error"
  isVisible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      console.log("showToast: ", action, state)
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    hideToast: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
