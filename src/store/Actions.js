import {
  booksLoading,
  changePage,
  displayBooksPerPage,
  errorMessage,
  updateTotalPage,
} from "./HomeSlice";
import { updateBook, updateReadingList } from "./DetailSlice";
import { toast } from "react-toastify";
import api from "../apiService";

const limit = 10;
// &q=${query}
export const bookFetcher =
  (page, query = "") =>
  async (dispatch) => {
    let url = `/books?_page=${page}&_limit=${limit}&q=${query}`;

    dispatch(changePage(page));
    dispatch(booksLoading());
    try {
      const response = await api.get(url);
      const data = response.data;
      console.log(data);
      dispatch(displayBooksPerPage(data));
    } catch (error) {
      dispatch(errorMessage(error.message));
    }

    dispatch(booksLoading());
  };

export const bookDetailFetcher = (bookId) => async (dispatch) => {
  dispatch(booksLoading());
  try {
    const res = await api.get(`/books/${bookId}`);
    console.log(res.data);
    dispatch(updateBook(res.data));
  } catch (error) {
    toast.error(error.message);
  }
  dispatch(booksLoading());
};

export const addToReadingList = (bookId, addingBook) => async (dispatch) => {
  dispatch(booksLoading());
  try {
    await api.post(`/favorites`, addingBook);
    toast.success("The book has been added to the reading list!");
  } catch (error) {
    toast.error(error.message);
  }
  dispatch(booksLoading());
};

export const readingListFetchers = () => async (dispatch) => {
  dispatch(booksLoading());
  try {
    const res = await api.get(`/favorites`);
  } catch (error) {
    toast(error.message);
  }
  dispatch(booksLoading());
};

export const bookRemover = (bookId) => async (dispatch) => {
  dispatch(booksLoading());
  try {
    await api.delete(`/favorites/${bookId}`);
    toast.success("The book has been removed");
  } catch (error) {
    toast(error.message);
  }
  dispatch(booksLoading());
  dispatch(readingListFetcher());
};

export const readingListFetcher = () => async (dispatch) => {
  dispatch(booksLoading());
  try {
    const res = await api.get(`/favorites`);
    dispatch(updateReadingList(res.data));
  } catch (error) {
    toast(error.message);
  }
  dispatch(booksLoading());
};
