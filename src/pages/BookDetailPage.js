import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToReadingList, bookDetailFetcher } from "../store/Actions";
import { toast } from "react-toastify";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const bookDetails = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home);
  const params = useParams();
  const bookId = params.id;

  useEffect(() => {
    dispatch(bookDetailFetcher(bookId));
  }, [dispatch, bookId]);

  const addToReadingListHandler = () => {
    if (!bookDetails.readingList.find((book) => book.id === bookId)) {
      dispatch(addToReadingList(bookId, bookDetails.book));
    } else {
      toast.info("This book has already been added to the reading list.");
    }
  };

  return (
    <Container>
      {home.loading === "loading" ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {bookDetails.book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${bookDetails.book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {bookDetails.book && (
              <Stack>
                <h2>{bookDetails.book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {bookDetails.book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {bookDetails.book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {bookDetails.book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {bookDetails.book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {bookDetails.book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={addToReadingListHandler}
                  // onClick={() => addToReadingList(bookDetails.book)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
