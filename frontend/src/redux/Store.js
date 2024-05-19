import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme/themeSlice";
import horizontalSlice from "./horizontalscroll/horizontal";
import registerSlice from "./register/registerSlice";
import getdataSlice from "./getdata/getdataSlice";
const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    theme: themeSlice.reducer,
    horizontal: horizontalSlice.reducer,
    getdata:getdataSlice.reducer
  },
});

export default store;
