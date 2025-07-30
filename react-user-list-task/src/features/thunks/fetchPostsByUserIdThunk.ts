import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { AxiosError, HttpStatusCode } from "axios";
import { PostData } from "../../types/PostsData";

export const fetchPostsByUserIdThunk = createAsyncThunk<
  PostData[],
  string,
  { rejectValue: string }
>("posts/fetchPostsByUserId", async (userId, { rejectWithValue }) => {
  try {
    const posts = await jsonPlaceholderApi.get(`/posts?userId=${userId}`);

    return posts.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
      return rejectWithValue("Failed to fetch user");
    }
    return rejectWithValue("Unknown error");
  }
});
