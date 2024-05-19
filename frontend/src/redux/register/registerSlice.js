import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || null, //the above json.parse methode is used to parse the data stored on the browser on string format into javascript object frormat.
    loading: false,
    error: null,
  },

  reducers: {
    signinStart(state) {
      state.loading = true;
      state.error = null;
    },
    signinSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess(state) {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    signoutSuccess(state) {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const registerSliceAction = registerSlice.actions;

export default registerSlice;
