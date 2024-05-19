import { createSlice } from "@reduxjs/toolkit";

const getdataSlice = createSlice({
  name: "get",
  initialState: {
    loading: false,
    error: null,
    getdata: [],
  },

  reducers: {
    getdataStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    getdataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getdataSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.getdata = action.payload;
      localStorage.setItem("get", JSON.stringify(action.payload));
    },
  },
});

export const getdataSliceAction = getdataSlice.actions;

export default getdataSlice;
