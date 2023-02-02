import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: null,
  readingList: [],
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    updateReadingList(state, action) {
      state.readingList = [...action.payload];
    },
    updateBook(state, action) {
      state.book = action.payload;
    },
  },
});

export const { actions, reducer } = detailSlice;

export const { updateReadingList, updateBook, updateIsAdded } = actions;

export { reducer as detailReducer };
