import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { AxiosError, HttpStatusCode } from "axios";

export const fetchPostsByUserIdThunk = createAsyncThunk(
  "posts/fetchPostsByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const posts = await jsonPlaceholderApi.get(`/posts?userId=${userId}`);

      return posts.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
        return rejectWithValue("Handle errors"); //TODO make the errors when request failed
      }
    }
    return rejectWithValue("Handle errors");
  },
);
