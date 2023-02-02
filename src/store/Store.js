import { configureStore } from "@reduxjs/toolkit";
import { detailReducer } from "./DetailSlice";
import { HomeReducer } from "./HomeSlice";

const store = configureStore({
  reducer: {
    home: HomeReducer,
    detail: detailReducer,
  },
});

export default store;
