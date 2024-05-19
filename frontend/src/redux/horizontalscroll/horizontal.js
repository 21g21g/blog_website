import { createSlice } from "@reduxjs/toolkit";

const horizontalSlice = createSlice({
  name: "horizontal",
  initialState: {
    horizontal: "",
  },
  reducers: {
    setHorizontal(state, action) {
      state.horizontal = action.payload;
    },
  },
});

export const horizontalsliceAction = horizontalSlice.actions;
export default horizontalSlice;
