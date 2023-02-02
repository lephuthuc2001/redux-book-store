import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bookFetcher } from "../store/Actions";

const PaginationBar = () => {
  const homeData = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(bookFetcher(value, homeData.query));
  };

  useEffect(() => {
    dispatch(bookFetcher(homeData.page, ""));
  }, []);

  return (
    <Stack spacing={2}>
      <Pagination
        variant="outlined"
        count={homeData.totalPage}
        page={homeData.page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
