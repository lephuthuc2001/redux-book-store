import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booksOnDisplay: [],
  loading: "idle",
  error: null,
  page: 1,
  totalPage: 10,
  query: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    displayBooksPerPage(state, action) {
      state.booksOnDisplay = action.payload;
    },
    booksLoading(state) {
      if (state.loading === "idle") {
        state.loading = "loading";
      } else {
        state.loading = "idle";
      }
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
    changePage(state, action) {
      state.page = action.payload;
    },
    updateQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export const { actions, reducer } = homeSlice;

export const {
  displayBooksPerPage,
  booksLoading,
  errorMessage,
  changePage,
  updateQuery,
  updateTotalPage,
} = actions;

export { reducer as HomeReducer };
